export interface FedexModel {
  minimumValid: true;
  parsedAddress: {
    city: string;
    countryCode: string;
    postalCode: string;
    stateOrProvinceCode: string;
    streetLines: string;
    urbanizationCode: string;
  };
  rawResponse: {
    addressResults: {
      addressAttributes: {
        name: string;
        value: boolean;
      }[];
      classification: string;
      effectiveAddress: {
        city: string;
        countryCode: string;
        postalCode: string;
        stateOrProvinceCode: string;
        streetLines: string;
        urbanizationCode: string;
      };
      parsedAddressPartsDetail: {
        parsedPostalCode: {
          addOn: string;
          base: string;
          deliveryPoint: string;
        };
        parsedStreetLine: {
          houseNumber: string;
          streetName: string;
          streetSuffix: string;
        };
      };
      state: string;
    };
    highestSeverity: string;
    notifications: {
      code: string;
      localizedMessage: string;
      message: string;
      severity: string;
      source: string;
    }[];
  }
}

export interface FedexParamModel {
  addressLine?: string,
  city?: string,
  countryCode?: string,
  stateCode?: string,
  zipCode?: string
}
