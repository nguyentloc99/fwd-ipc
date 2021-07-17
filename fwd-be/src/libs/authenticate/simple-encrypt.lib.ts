import {BaseError} from '../standard/error/http-method';

const crypto = require('crypto');
const scmp = require('scmp');

export class SimpleEncryptLib {
  public cryptoKey: any;
  public verifyHmac: boolean;
  public debug: boolean;
  public reviver: any;

  constructor(opts: any) {
    const MIN_KEY_LENGTH = 16;
    if (typeof (opts) == 'string') {
      opts = {
        key: opts,
        hmac: true,
        debug: false
      };
    }
    const key = opts.key;
    this.verifyHmac = opts.hmac;
    this.debug = opts.debug;
    this.reviver = opts.reviver;
    if (!key || typeof (key) != 'string') {
      throw new BaseError({message: 'A string key must be specified'});
    }
    if (key.length < MIN_KEY_LENGTH) {
      throw new BaseError({message: `Key must be at least ${MIN_KEY_LENGTH} characters long`});
    }
    if (this.reviver !== undefined && this.reviver !== null && typeof (this.reviver) != 'function') {
      throw new BaseError({message: 'Reviver must be a function'});
    }
    this.cryptoKey = crypto.createHash('sha256').update(key).digest();
  }

  public hmac(text: string, format: any = 'hex') {
    format = format || 'hex';
    return crypto.createHmac('sha256', this.cryptoKey).update(text).digest(format);
  }

  // Encrypts an arbitrary object using the derived cryptoKey and retursn the result as text.
  // The object is first serialized to JSON (via JSON.stringify) and the result is encrypted.
  //
  // The format of the output is:
  // [<hmac>]<iv><encryptedJson>
  //
  // <hmac>             : Optional HMAC
  // <iv>               : Randomly generated initailization vector
  // <encryptedJson>    : The encrypted object
  public encrypt(obj: any) {
    const json = JSON.stringify(obj);
    // First generate a random IV.
    // AES-256 IV size is sixteen bytes:
    const iv = crypto.randomBytes(16);
    // Make sure to use the 'iv' constiant when creating the cipher object:
    const cipher = crypto.createCipheriv('aes256', this.cryptoKey, iv);

    // Generate the encrypted json:
    const encryptedJson = cipher.update(json, 'utf8', 'base64')
      + cipher.final('base64');

    // Include the hex-encoded IV + the encrypted base64 data
    // NOTE: We're using hex for encoding the IV to ensure that it's of constant length.
    let result = iv.toString('hex') + encryptedJson;

    if (this.verifyHmac) {
      // Prepend an HMAC to the result to verify it's integrity prior to decrypting.
      // NOTE: We're using hex for encoding the hmac to ensure that it's of constant length
      result = this.hmac(result, 'hex') + result;
    }
    return result;
  }

  public decrypt(cipherText: any) {
    if (!cipherText) {
      return;
    }
    try {
      if (this.verifyHmac) {
        // Extract the HMAC from the start of the message:
        const expectedHmac = cipherText.substring(0, 64);
        // The remaining message is the IV + encrypted message:
        cipherText = cipherText.substring(64);
        // Calculate the actual HMAC of the message:
        const actualHmac = this.hmac(cipherText);
        if (!scmp(actualHmac, expectedHmac)) {
          throw new BaseError({message: 'HMAC does not match'});
        }
      }

      // Extract the IV from the beginning of the message:
      const iv = new Buffer(cipherText.substring(0, 32), 'hex');
      // The remaining text is the encrypted JSON:
      const encryptedJson = cipherText.substring(32);

      // Make sure to use the 'iv' constiant when creating the decipher object:
      const decipher = crypto.createDecipheriv('aes256', this.cryptoKey, iv);
      // Decrypt the JSON:
      const json = decipher.update(encryptedJson, 'base64', 'utf8')
        + decipher.final('utf8');

      // Return the parsed object:
      return JSON.parse(json, this.reviver);
    } catch (e) {
      // If we get an error log it and ignore it. Decrypting should never fail.
      if (this.debug) {
        console.error('Exception in decrypt (ignored): %s', e);
      }
      return;
    }
  }
}
