export default (map, mapboxgl, caribbeanData, caribbeanDataDeaths, caribbeanRecoveryData) => {
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

      //shows a different size based on the number of cases, but minimum size is 20
      let size = Math.max(15, Math.min(parseInt(numCases) / 5, 60));

      let popup = new mapboxgl.Popup({ offset: 25, className: 'popups' }).setHTML(
        `<h6>${caribbeanName}</h6> <strong>${numCases - numRecovered}</strong> active cases, <strong>${numCases}</strong> confirmed, <strong>${numDeaths}</strong> death(s), <strong>${numRecovered}</strong> recovered`
        
      );
      // add marker to map

      var el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = "red";
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.borderRadius = "50%";
      el.style.opacity = "50%";

      new mapboxgl.Marker(el)
        .setLngLat({ lng: element[3], lat: element[2] })
        .setPopup(popup)
        .addTo(map);
    });
  }