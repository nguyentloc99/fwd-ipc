/**
 * @module Authenticate
 * @description config authenticate with facebook
 * @version 1.0.0
 */

import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as request from 'request-promise';

import {ConfigLib} from '../../config.lib';
import {FacebookAppFriends, FacebookModel} from '../../common/models';

const graphUri = 'https://graph.facebook.com/v2.12';

export class FacebookLib {
  public facebookToken: string;

  constructor(_facebookToken: string) {
    this.facebookToken = _facebookToken;
  }

  /**
   * @method getUserInfo
   * @description get user facebook information
   {
     facebook body data
     id: string;
     name: string;
     email?: string;
     about?: string;
     picture?: {
        data: {
          url: string;
        }
     };
   }
   * @param callback
   */
  public getUserInfo(callback?: (err: any, data: any)
    => void): Promise<FacebookModel> {
    return new Promise<FacebookModel>((resolve, reject) => {
      const options = {
        method: 'GET',
        url: `${graphUri}/me?access_token=${this.facebookToken}&`
          + `fields=id,first_name,last_name,address,email,about,picture.width(480).height(480){url},cover`,
        json: true // Automatically parses the JSON string in the response
      };
      request(options)
        .then(data => {
          return resolve(data);
        })
        .catch(err => {
          return reject(_.has(err, 'error.error') ? err.error.error : (_.has(err, 'error') ? err.error : err));
        });
    }).nodeify(callback);
  }

  /**
   * @method getFriendUsingApp
   * @description get list friend in application
   * @deprecated facebook is confirm permission friend list
   * @param {string} after
   * @param {number} limit
   * @param {(err?: any, data?: FacebookAppFriends) => void} callback
   * @return {Bluebird<FacebookAppFriends>}
   */
  public getFriendsUsingApp(after?: string, limit = 3, callback?: (err?: any, data?: FacebookAppFriends)
    => void): Promise<FacebookAppFriends> {
    return new Promise<FacebookAppFriends>((resolve, reject) => {
      request
        .get(`${graphUri}/${ConfigLib.SOCIAL.FACEBOOK.CLIENT_ID}?access_token=${this.facebookToken}&`
          + `fields=context{friends_using_app.limit(${limit})${after ? '.after(' + after + ')' : ''}{data{id}}}`,
          (err, response, body) => {
            if (err) return reject(err);
            body = JSON.parse(body);
            if (response.statusCode >= 400) return reject(body.error);
            resolve(body);
          });
    }).nodeify(callback);
  }
}
