export interface GoogleModel {
  kind: string;
  etag: string;
  gender: string;
  emails: [{
    value: string;
    type: string;
  }];
  objectType: string;
  id: string;
  displayName: string;
  name: {
    familyName: string;
    giveName: string;
  };
  url: string;
  image: {
    url: string;
  };
}

export interface GeoLocation {
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
    formatted_address: string;
    geometry: {
      bounds: {
        northeast: {
          lat: number,
          lng: number
        };
        southwest: {
          lat: number;
          lng: number;
        }
      };
      location: {
        lat: number;
        lng: number;
      };
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    place_id: string;
    types: string[]
  }[];
  status: string
}

export interface InfoLocationModel {
  lat?: number;
  lng?: number;
  formattedAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}
