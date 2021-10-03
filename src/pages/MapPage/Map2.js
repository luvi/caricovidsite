import React, { Component } from "react";
import { withTranslation } from 'react-i18next'
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../../MAPBOX_ACCESS_TOKEN.js";
import axios from 'axios'

import getCOVIDInfo from "../../functions/fetchFromURL";
import parse from "csv-parse";
import { covidData, vaccines } from "../../functions/isCaribbeanCountry";
import {
    url,
    deathsSource,
    myOverrideURL,
    recoveredSourceURL,
    unitedStatesCaseSource,
    vaccinationNumbersURL,
} from "../../constants";
import createCaribbeanDataArray from "./createCaribbeanDataArray";
import TinyQueue from "tinyqueue";
import setMarkers from "./setMarkers";
import _ from "lodash";
import moment from "moment";
import ListCard from './ListCard';

import UpdatedCard from "./UpdatedCard.js";
import StatsCard from "./StatsCard.js";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

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

        axios.get('https://disease.sh/v3/covid-19/countries/VC?strict=true').then(res => { console.warn(res.data); this.setState({ countryInfo: res.data }) }).then(() => {
            let size = Math.max(15, Math.min(parseInt(this.state.countryInfo.active) / 8, 60));

            let popup = new mapboxgl.Popup({ offset: 25, className: "popups" }).setHTML(
                `<div class="caribbeanName">${this.state.countryInfo.country}</div> <strong>${this.state.countryInfo.active}</strong> active, <strong>${this.state.countryInfo.critical}</strong> in critical condition,
      <strong>${this.state.countryInfo.cases}</strong> confirmed, <strong>${this.state.countryInfo.deaths}</strong> death(s), <strong>${this.state.countryInfo.recovered}</strong> recovered`
            );

            // add marker to map
            var el = document.createElement("div");
            el.className = "marker";
            el.style.backgroundColor = "red";
            el.style.width = size + "px";
            el.style.height = size + "px";
            el.style.borderRadius = "50%";
            el.style.opacity = "50%";

            { console.log(this.state.countryInfo.countryInfo.long) }
            new mapboxgl.Marker(el)
                .setLngLat({ lng: this.state.countryInfo.countryInfo.long, lat: this.state.countryInfo.countryInfo.lat })
                .setPopup(popup)
                .addTo(map);
        });

    }



    render() {


        return (
            <div>
                <div className="statsContainer">
                    <UpdatedCard date={"every 10 minutes"} />
                    <StatsCard totalActiveCases={new Intl.NumberFormat().format(this.state.totalActiveCases)} total={new Intl.NumberFormat().format(this.state.total)} totalDeaths={new Intl.NumberFormat().format(this.state.totalDeaths)} />

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