export default async (map, mapboxgl, cleanedUpArray, vaccinationData) => {
  cleanedUpArray.forEach((element) => {
    let caribbeanName = element.caribbeanName;
    let numCases = new Intl.NumberFormat().format(element.confirmedCases);
    let numRecovered = new Intl.NumberFormat().format(element.recoveredCases);
    let activeCases = new Intl.NumberFormat().format(element.activeCases);
    let numDeaths = new Intl.NumberFormat().format(element.numDeaths);
    let totalVaccinations = vaccinationData[caribbeanName]?.total_vaccinations;

    //shows a different size based on the number of cases, but minimum size is 20
    let size = Math.max(15, Math.min(parseInt(element.activeCases) / 5, 60));

    let popup = new mapboxgl.Popup({ offset: 25, className: "popups" }).setHTML(
      `<div class="caribbeanName">${caribbeanName}</div> <strong>${activeCases}</strong> active cases, 
      <strong>${numCases}</strong> confirmed, <strong>${numDeaths}</strong> death(s), 
      <strong>${numRecovered}</strong> recovered${
        totalVaccinations
          ? `, <strong>${new Intl.NumberFormat().format(
              parseInt(totalVaccinations)
            )}</strong> vaccine doses administered`
          : ""
      }`
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
  });
};
