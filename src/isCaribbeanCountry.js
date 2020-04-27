import { countryList } from "./countryList.js";

export default (arr) => {
  return countryList.includes(arr[1]) || countryList.includes(arr[0]);
};
