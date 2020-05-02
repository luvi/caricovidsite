import { caricomCountries } from "./caricomCountries.js";

export default (countryName) => {
  return caricomCountries.includes(countryName) || caricomCountries.includes(countryName);
};
