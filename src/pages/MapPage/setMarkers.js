import mapboxgl from "mapbox-gl";

export default (map, country) => {

    if (country) {
    let size = Math.max(15, Math.min(parseInt(country.active) / 10, 60));
    let popup = new mapboxgl.Popup({ offset: 25, className: "popups" }).setHTML(
        `<div class="caribbeanName">${country.country}</div> <strong>${country.active}</strong> active, <strong>${country.critical}</strong> in critical condition,
<strong>${country.cases}</strong> confirmed, <strong>${country.deaths}</strong> death(s), <strong>${country.recovered}</strong> recovered`
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
        .setLngLat({ lng: country.countryInfo.long, lat: country.countryInfo.lat })
        .setPopup(popup)
        .addTo(map);
    }
}