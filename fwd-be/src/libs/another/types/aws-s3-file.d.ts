/// <reference types="multer" />
import {S3} from 'aws-sdk';

/**
 * @interface AwsS3File
 * @description define attach key after upload file success in aws s3
 */
interface AwsS3File {
  bucket: S3.BucketName;
  key: S3.ObjectKey;
  acl: S3.ObjectCannedACL;
  contentType: S3.ContentType;
  contentDisposition: S3.ContentDisposition;
  storageClass: S3.StorageClass;
  serverSideEncryption: S3.ServerSideEncryption;
  metadata: S3.Metadata;
  location: S3.Location;
  etag: S3.ETag;
}

declare global {
  namespace Express {
    namespace Multer {
      interface File extends AwsS3File {
      }
    }
  }
}
