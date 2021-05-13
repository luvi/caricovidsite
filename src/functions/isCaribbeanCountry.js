import { countryList } from "../data/countryList.js";

export const covidData = (arr) => {
  return countryList.includes(arr[1]) || countryList.includes(arr[0]);
};

export const vaccines =  (arr) => {
  return countryList.includes(arr.country)
}
