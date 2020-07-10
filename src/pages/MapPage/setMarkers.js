   export default (map, mapboxgl, cleanedUpArray) => {

    cleanedUpArray.forEach((element) => {

        let caribbeanName = element.caribbeanName
        let numCases = element.confirmedCases
        let numRecovered = element.recoveredCases
        let numDeaths = element.numDeaths
   
   //shows a different size based on the number of cases, but minimum size is 20
    let size = Math.max(15, Math.min(parseInt(numCases) / 5, 60));

    let popup = new mapboxgl.Popup({ offset: 25, className: 'popups' }).setHTML(
      `<h6>${caribbeanName}</h6> <strong>${element.activeCases}</strong> active cases, <strong>${numCases}</strong> confirmed, <strong>${numDeaths}</strong> death(s), <strong>${numRecovered}</strong> recovered`
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
      .setLngLat({ lng: element.longitude, lat: element.latitude })
      .setPopup(popup)
      .addTo(map);
    })

    }