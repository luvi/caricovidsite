let countryCodeDictionary = {
    "Anguilla" : "AI",
    "Antigua and Barbuda": "AG",
    "Aruba": "AW",
    "Bahamas": "BS",
    "Barbados": "BB",
    "Bermuda": "BM",
    "Belize": "BZ",
    "British Virgin Islands": "VI",
    "Cayman Islands": "KY",
    "Cuba": "CU",
    "Curacao": "CW",
    "Dominica": "DM",
    "Dominican Republic": "DO",
    "Grenada": "GD",
    "Guadeloupe": "GP",
    "Haiti": "HT",
    "Jamaica": "JM",
    "Martinique": "MQ",
    "Montserrat": "MS",
    "Netherlands Antilles": "NL",
    "Puerto Rico": "PR",
    "Saint Barthelemy": "BL",
    "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC",
    "St Martin": "MF",
    "Saint Vincent and the Grenadines": "VC",
    "Trinidad and Tobago": "TT",
    "Turks and Caicos Islands": "TC",
    "Guyana": "GY",
    "French Guiana": "GF",
    "Suriname": "SR"
}


export default (countryName) => {

    return countryCodeDictionary[countryName]

}