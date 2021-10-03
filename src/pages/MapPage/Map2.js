import React, { Component } from "react";
import { withTranslation } from 'react-i18next'
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../../MAPBOX_ACCESS_TOKEN.js";
import axios from 'axios'
import { countryCodes } from '../../functions/ISOCaribbeanCountries'
import _ from "lodash";


import UpdatedCard from "./UpdatedCard.js";
import StatsCard from "./StatsCard.js";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const casesReducer = (previousValue, currentValue) => {

    return { cases: previousValue.cases + currentValue.cases };
}

const activeReducer = (previousValue, currentValue) => {

    return { active: previousValue.active + currentValue.active };
}

const deathsReducer = (previousValue, currentValue) => {

    return { deaths: previousValue.deaths + currentValue.deaths };
}

const criticalReducer = (previousValue, currentValue) => {

    return { critical: previousValue.critical + currentValue.critical };
}

class Map2 extends Component {

    constructor(props) {
        super(props);
        this.t = props.t
        this.state = {
            total: 0,
            totalDeaths: 0,
            totalActiveCases: 0,
            lng: -61,
            lat: 15,
            zoom: 4,
            caribbeanData: [],
            caribbeanDataDeaths: [],
            caribbeanDataRecovered: [],
            caribbeanDataActiveCases: [],
            johnsHopkinsData: [],
            date: "",
            lowestActiveCases: [],
            highestActiveCases: [],
            puertoRicoConfirmedCases: 0,
            vaccinationData: [],
            countryInfo: []
        }
    }


    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: "mapbox://styles/luvisaccharine/ck84wx1570bzg1iqfbqelhs3o",
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        });

        axios.get('https://disease.sh/v3/covid-19/countries/')
            .then(res => {

                const cariData = res.data.filter(countryData =>

                    countryCodes.includes(countryData.countryInfo.iso2?.toString())
                )
                console.warn(cariData);
                this.setState({ countryInfo: cariData })
                const totalConfirmed = cariData.reduce(casesReducer, { cases: 0 })
                this.setState({ total: totalConfirmed.cases })
                const totalActive = cariData.reduce(activeReducer, { active: 0 })
                this.setState({ totalActiveCases: totalActive.active })
                const totalDeaths = cariData.reduce(deathsReducer, { deaths: 0 })
                this.setState({ totalDeaths: totalDeaths.deaths })
                const totalCritical = cariData.reduce(criticalReducer, { critical: 0 })
                this.setState({ totalCritical: totalCritical.critical })


            }).then(() => {

                this.state.countryInfo.map((country) => {


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

                })

            });

    }



    render() {


        return (
            <div>
                <div className="statsContainer">
                    <UpdatedCard date={"every 10 minutes"} />
                    <StatsCard totalActiveCases={new Intl.NumberFormat().format(this.state.totalActiveCases)} total={new Intl.NumberFormat().format(this.state.total)} totalDeaths={new Intl.NumberFormat().format(this.state.totalDeaths)} totalCritical={new Intl.NumberFormat().format(this.state.totalCritical)} />

                </div>
                <div
                    ref={(el) => {
                        this.mapContainer = el;
                    }}
                    className="mapContainer"
                />
            </div>
        );


    }
}

export default withTranslation()(Map2)