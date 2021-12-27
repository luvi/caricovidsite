import React, { Component } from "react";
import { withTranslation } from 'react-i18next'
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../../MAPBOX_ACCESS_TOKEN.js";
import axios from 'axios'
import { countryCodes } from '../../functions/ISOCaribbeanCountries'
import setMarkers from './setMarkers2'
import ListCard from './ListCard'


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
            lowestActiveCases: [],
            highestActiveCases: [],
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

                const cariData = res.data.filter(countryData => countryCodes.includes(countryData.countryInfo.iso2?.toString()))

                this.setState({ countryInfo: cariData })
                const totalConfirmed = cariData.reduce(casesReducer, { cases: 0 })
                this.setState({ total: totalConfirmed.cases })
                const totalActive = cariData.reduce(activeReducer, { active: 0 })
                this.setState({ totalActiveCases: totalActive.active })
                const totalDeaths = cariData.reduce(deathsReducer, { deaths: 0 })
                this.setState({ totalDeaths: totalDeaths.deaths })
                const totalCritical = cariData.reduce(criticalReducer, { critical: 0 })
                this.setState({ totalCritical: totalCritical.critical })
               
                cariData.sort((a, b) => b.active - a.active)
                this.setState({ highestActiveCases: cariData.slice(0, 5) })

                cariData.sort((a,b) => a.active - b.active)
                this.setState({ lowestActiveCases: cariData.slice(0, 5) })
            
                cariData.sort((a, b) => a.deathsPerOneMillion - b.deathsPerOneMillion)
                this.setState({ lowestCovidDeaths: cariData.slice(0, 5) })
           


            }).then(() => {

                this.state.countryInfo.map((country) => { setMarkers(map, country) })

            });

    }



    render() {


        return (
            <div>
                <div className="statsContainer">
                    <UpdatedCard date={"every 10 minutes"} />
                    <StatsCard totalActiveCases={new Intl.NumberFormat().format(this.state.totalActiveCases)} total={new Intl.NumberFormat().format(this.state.total)} totalDeaths={new Intl.NumberFormat().format(this.state.totalDeaths)} totalCritical={new Intl.NumberFormat().format(this.state.totalCritical)} />
                    <ListCard title={'Highest Active Cases'} cases={this.state.highestActiveCases} param={'active'}/>
                    <ListCard title={'Lowest Active Cases'} cases={this.state.lowestActiveCases} param={'active'}/>
                    <ListCard title={'Lowest Deaths per 1000'} cases={this.state.lowestCovidDeaths} param={'deaths'}/>
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