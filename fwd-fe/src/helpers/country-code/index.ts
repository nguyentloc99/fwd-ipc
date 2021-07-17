import COUNTRY_CODE from './country_flag.json';

interface CountryCodeModel {
  fullName: string;
  name: string;
  sortName: string;
  flag: string;
  value: string;
}

const countryCode: CountryCodeModel[] = COUNTRY_CODE.map((item) => ({
  fullName: item.Name,
  name: item.Iso3,
  sortName: item.Iso2,
  flag: item.Unicode,
  value: item.Dial,
}));

export default countryCode;
