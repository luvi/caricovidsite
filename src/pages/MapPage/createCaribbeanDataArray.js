let arr = []

export default (caribbeanData, caribbeanDataDeaths, caribbeanRecoveryData) => {
    let cariData = caribbeanData;
    let cariDataDeaths = caribbeanDataDeaths;
    let caribbeanDataRecovered = caribbeanRecoveryData;

    cariData.forEach((element) => {
      let numDeaths = 0;
      let numRecovered = 0;
      let caribbeanName = element[0] === "" ? element[1] : element[0];
      
      let numCases = element[element.length - 1];
      let matchingDEntry = cariDataDeaths.filter(
        (entry) => entry[0] === caribbeanName || entry[1] === caribbeanName
      )[0];
      if (typeof matchingDEntry !== "undefined") {
        numDeaths = matchingDEntry[matchingDEntry.length - 1];
      }

      //filter and find array element with info on relevant country recovery data.
      let matchingRecoveredEntry = caribbeanDataRecovered.filter(
        (entry) => entry[0] === caribbeanName || entry[1] === caribbeanName
      )[0];
      if (typeof matchingRecoveredEntry !== "undefined") {
        numRecovered =
          matchingRecoveredEntry[matchingRecoveredEntry.length - 1];
      }

      
      if (caribbeanName !== "") {
        arr.push({caribbeanName: caribbeanName, longitude:element[3], latitude: element[2], confirmedCases: parseInt(numCases), recoveredCases:parseInt(numRecovered), activeCases:(numCases - numRecovered), numDeaths:parseInt(numDeaths) })
      }


    });

    return arr;
  }