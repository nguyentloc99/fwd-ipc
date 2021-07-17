/**
 * @module GoogleLibrary
 * @description Config google library
 * @version 1.0.0
 */

import * as _ from 'lodash';
import * as request from 'request-promise';

import {ConfigLib} from '../../config.lib';
import {ConstLib} from '../../common/consts';
import {GeoLocation, GoogleModel, InfoLocationModel} from '../../common/models';
import {BaseError} from '../error/http-method';

export class GoogleLib {
  public _googleToken: string;

  constructor(_googleToken: string = undefined) {
    this._googleToken = _googleToken;
  }

  set googleToken(_googleToken: string) {
    this._googleToken = _googleToken;
  }

  get googleToken() {
    return this._googleToken;
  }

  /**
   * @method getUserInfo
   * @description g+ information
   * @param {(err: any, data?: any) => void} callback
   * @return {Bluebird<GoogleModel>}
   */
  public async getUserInfo(callback?: (err: any, data?: any) => void) {
    if (!this._googleToken) {
      throw new BaseError({message: ConstLib.MISSING_CONFIG_GOOGLE_TOKEN});
    }
    const options = {
      method: 'GET',
      url: 'https://content.googleapis.com/plus/v1/people/me',
      headers: {
        Authorization: `Bearer ${this._googleToken}`
      },
      json: true // Automatically parses the JSON string in the response
    };
    return await request(options)
      .then(data => {
        return data;
      })
      .catch(err => {
        throw _.has(err, 'error.error') ? err.error.error
          : (_.has(err, 'error') ? err.error : err);
      }) as GoogleModel;
  }

  /**
   * @method infoByZipCode
   * @description get city by google geo-location
   * @param {string} addressInfo address is zipcode,city,county,state
   * @return {Bluebird<string>}
   */
  public async infoByLocation(addressInfo: string) {
    const options = {
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      qs: {
        key: ConfigLib.SOCIAL.GOOGLE.GOOGLE_GEO_KEY,
        address: addressInfo
      },
      headers: {
        'Content-Type': 'application/json'
      },
      json: true
    };
    return await request(options)
      .then((data: GeoLocation) => {
        if (data.status === 'OK') {
          return data;
        }
        throw new BaseError({message: (data as any).error_message || 'Postal code invalid'});
      })
      .catch((err: any) => {
        throw err.error ? err.error : err;
      }) as GeoLocation;
  }

  /**
   * @method getInfoLocation
   * @description get info location
   * @param {string} param
   * @return {Bluebird<object>}
   */
  public async getInfoLocation(param: string) {
    if (param === undefined || param === null || param.trim() === '') {
      throw new Error(`Postal code is required.`);
    }
    const options = {
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      qs: {
        key: ConfigLib.SOCIAL.GOOGLE.GOOGLE_GEO_KEY,
        address: param
      },
      headers: {
        'Content-Type': 'application/json'
      },
      json: true
    };
    return await request(options)
      .then(data => {
        let result: InfoLocationModel = {};
        if (data.status === 'OK') {
          // console.log('=====================================');
          // console.log(JSON.stringify(data.results[0]));
          // console.log('=====================================');
          let locationAddress = data.results[0];
          let deCodeAddress = decodeAddressComponent(locationAddress.address_components);
          result.lat = locationAddress.geometry.location.lat;
          result.lng = locationAddress.geometry.location.lng;
          result.formattedAddress = locationAddress.formatted_address;
          result.city = deCodeAddress.city || '';
          result.state = deCodeAddress.state || '';
          result.postalCode = deCodeAddress.postal_code || '';
          return result;
        } else {
          throw data.error_message || 'Postal code invalid.';
        }
      })
      .catch((err: any) => {
        throw err.error ? err.error : err;
      }) as InfoLocationModel;

    /**
     * @method decodeAddressComponent
     * @description get value in address component
     * @param {array} addressComponents
     * @return {Bluebird<Object>}
     */
    function decodeAddressComponent(addressComponents: any) {
      let result: any = {};
      if (addressComponents.length == 0)
        return result;
      for (let i = 0; i < addressComponents.length; i++) {
        if (addressComponents[i].types.indexOf('administrative_area_level_1') !== -1
          && addressComponents[i].types.indexOf('political') !== -1) {
          result.state = addressComponents[i].short_name;
        }
        if (addressComponents[i].types.indexOf('locality') !== -1
          && addressComponents[i].types.indexOf('political') !== -1) {
          result.city = addressComponents[i].short_name;
        }
        if (addressComponents[i].types.indexOf('postal_code') !== -1) {
          result.postal_code = addressComponents[i].short_name;
        }
      }
      return result;
    }
  }

  /**
   * @method mapInfoData
   * @description map info data
   * @param location
   * @return {state: string, country: string, city: string,citiesNeighborhood: string[], lat: number, lng: number, format_address: string}
   */
  public static mapInfoData(location: GeoLocation) {
    const state = location.results[0].address_components
      .find(address_component => {
        return address_component.types.indexOf('administrative_area_level_1') > -1;
      }).short_name;
    const tempCounty = location.results[0].address_components
      .find(address_component => {
        return address_component.types.indexOf('administrative_area_level_2') > -1;
      });
    const tempCountyVerify = tempCounty ? tempCounty.short_name : '';
    const county = (tempCountyVerify).indexOf('County') > -1
      ? tempCountyVerify.replace(/County/, '').trim() : tempCountyVerify;
    const city = location.results[0].address_components
      .find(address_component => {
        return address_component.types.indexOf('locality') > -1;
      }).short_name;
    const citiesNeighborhoodTemp = location.results[0].address_components
      .filter(address_component => {
        return address_component.types.indexOf('neighborhood') > -1;
      })
      .map(address_component => address_component.short_name);
    const citiesNeighborhood = [...citiesNeighborhoodTemp, city]
      .map(city => {
        return {
          current: city,
          lowercase: city.toLowerCase()
        };
      });
    const lat = location.results[0].geometry.location.lat;
    const lng = location.results[0].geometry.location.lng;
    const formatAddress = location.results[0].formatted_address;
    return {state, county, city, citiesNeighborhood, lat, lng, format_address: formatAddress};
  }

  /**
   * @method generateAddress
   * @description generate param address => execute info location by google
   * @param zipCode
   * @param city
   * @param address
   */
  public static generateAddress(zipCode: number | string, city?: string, address?: string) {
    return [zipCode, city, address]
      .filter(item => !_.isNil(item))
      .join(',');
  }

  /**
   * @method getDistance
   * @description get distance by two address
   * @param {object} p1 {lat, lng}
   * @param {object} p2 {lat, lng}
   * @return {string}
   */
  public getDistance(p1: any, p2: any) {
    let rad = function (x: any) {
      return x * Math.PI / 180;
    };
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = rad(p2.lat - p1.lat);
    let dLong = rad(p2.lng - p1.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // returns the distance in meter
  }

  public async verifyAddress(params: { address?: string, city?: string, state?: string, zipCode?: string }): Promise<{ isValid: boolean, message: string, data?: any }> {
    try {
      let dataSearch = '';
      if (!params) {
        throw new BaseError({message: 'Params address is invalid.'});
      }
      if (params.address && params.address.trim() === '') {
        dataSearch = dataSearch + params.address + ', ';
      }
      if (!params.city || params.city.trim() === '') {
        throw new BaseError({message: 'city not found or invalid.'});
      } else {
        dataSearch = dataSearch + params.city + ', ';
      }
      if (!params.state || params.state.trim() === '') {
        throw new BaseError({message: 'state not found or invalid.'});
      } else {
        dataSearch = dataSearch + params.state + ', ';
      }
      if (!params.zipCode || params.zipCode.trim() === '') {
        throw new BaseError({message: 'zip code not found or invalid.'});
      } else {
        dataSearch = dataSearch + params.zipCode;
      }
      let googleMaps: any = await this.getInfoLocation(dataSearch);
      if (params.city !== undefined && googleMaps.city.toLowerCase() !== params.city.trim().toLowerCase()) {
        throw new BaseError({message: 'city not map with zip code.'});
      }
      if (params.state !== undefined && googleMaps.state.toLowerCase() !== params.state.trim().toLowerCase()) {
        throw new BaseError({message: 'state not map with zip code.'});
      }
      if (params.zipCode !== undefined && googleMaps.postalCode.toLowerCase() !== params.zipCode.trim().toLowerCase()) {
        throw new BaseError({message: 'postal code not map with zip code.'});
      }
      return {
        isValid: true,
        message: 'address is valid',
        data: googleMaps
      };
    } catch (err) {
      return {
        isValid: false,
        message: err,
        data: params
      };
    }
  }
}
