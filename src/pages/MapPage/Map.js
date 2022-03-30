import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next'
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../../MAPBOX_ACCESS_TOKEN.js";
import axios from 'axios'
import { countryCodes } from '../../functions/ISOCaribbeanCountries'
import setMarkers from './setMarkers'

import UpdatedCard from './UpdatedCard'
import StatsCard from './StatsCard'
import ListCard from './ListCard'


import {casesReducer, activeReducer, criticalReducer, deathsReducer} from './calculationReducers'

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// {
//     total: 0,
//     totalDeaths: 0,
//     totalActiveCases: 0,
//     lng: -61,
//     lat: 15,
//     zoom: 4,
//     lowestActiveCases: [],
//     highestActiveCases: [],
//     vaccinationData: [],
//     countryInfo: []
// }
const Map2 = () => {
    const {t} = useTranslation();
    const [countryInfo, setCountryInfo] = useState([])
    const [total, setTotal] = useState(0)
    const [totalDeaths, setTotalDeaths] = useState(0)
    const [totalActiveCases, setTotalActiveCases] = useState(0)
    const [totalCritical, setTotalCritical] = useState(0)
    const [lowestActiveCases, setLowestActiveCases] = useState([])
    const [highestActiveCases, setHighestActiveCases] = useState([])
    const [lowestDeaths, setLowestDeaths] = useState([])
    const [lng, setLng] = useState(-61)
    const [lat, setLat] = useState(15)
    const [zoom, setZoom] = useState(4)
    const mapContainer = useRef(null);

    const map = useRef(null)

useEffect(() => {

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/luvisaccharine/ck84wx1570bzg1iqfbqelhs3o',
    center: [lng, lat],
    zoom: zoom
    });
    });



    useEffect(()=>{


        axios.get('https://disease.sh/v3/covid-19/countries/')
            .then(res => {

                const cariData = res.data.filter(countryData => countryCodes.includes(countryData.countryInfo.iso2?.toString()))

                setCountryInfo(cariData)
                const totalConfirmed = cariData.reduce(casesReducer, { cases: 0 })
                setTotal(totalConfirmed.cases)

                const totalActive = cariData.reduce(activeReducer, { active: 0 })
                setTotalActiveCases(totalActive.active)

                const totalDeaths = cariData.reduce(deathsReducer, { deaths: 0 })
                setTotalDeaths(totalDeaths.deaths)

                const totalCritical = cariData.reduce(criticalReducer, { critical: 0 })
                setTotalCritical(totalCritical.critical)
               
                cariData.sort((a, b) => b.active - a.active)
                setHighestActiveCases(cariData.slice(0, 5) )

                cariData.sort((a,b) => a.active - b.active)
                setLowestActiveCases(cariData.slice(0, 5))
            
                cariData.sort((a, b) => a.deathsPerOneMillion - b.deathsPerOneMillion)
                setLowestDeaths(cariData.slice(0, 5))
           
            }).then(() => {
                countryInfo.forEach((country) => { setMarkers(map, country) })
            });
    }, [countryInfo]) 

    
        return (
            <div>
                <div className="statsContainer">
                    <UpdatedCard date={"every 10 minutes"} />
                    <StatsCard totalActiveCases={new Intl.NumberFormat().format(totalActiveCases)} total={new Intl.NumberFormat().format(total)} totalDeaths={new Intl.NumberFormat().format(totalDeaths)} totalCritical={new Intl.NumberFormat().format(totalCritical)} />
                    <ListCard title={'Highest Active Cases'} cases={highestActiveCases} param={'active'}/>
                    <ListCard title={'Lowest Active Cases'} cases={lowestActiveCases} param={'active'}/>
                    <ListCard title={'Lowest Deaths per 1000'} cases={lowestDeaths} param={'deaths'}/>
                </div>
                <div
                    ref={mapContainer}
                    className="mapContainer"
                />
            </div>
        );
}

export default Map2