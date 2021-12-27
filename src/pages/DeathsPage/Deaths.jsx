import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { countryCodes } from '../../functions/ISOCaribbeanCountries'
import { Table } from "antd";
import { columns } from './columns'
import { CSVLink } from "react-csv"

const DeathsPage = () => {

    const [deathsData, setDeathsData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        document.body.style.backgroundColor = "#1A2637";
        setIsLoading(true)
        axios.get('https://disease.sh/v3/covid-19/countries/')
            .then(res => {
                const cariData = res.data.filter(countryData => countryCodes.includes(countryData.countryInfo.iso2?.toString()))
                cariData.map(countryData => {
                    countryData.deathsPerThousand = countryData.deaths / countryData.population * 1000
                    countryData.updated = new Date(countryData.updated).toLocaleDateString()
                })
                setDeathsData(cariData)
                setIsLoading(false)
            })
    }, []);


    return (
        <div
            style={{
                marginTop: "100px",
            }}
        >
            <h1 className='subtitle'>
                Deaths
            </h1>
            <div className='export-button-container'><CSVLink
                filename={`${new Date()}_deaths_data_caricovidmap.csv`}
                data={deathsData ?? []}
                className="export-button"
            >
                Export Deaths Data to CSV
            </CSVLink></div>
            <div>
                <br />
                <Table loading={isLoading} dataSource={deathsData} columns={columns} />
            </div>
        </div>
    );
}

export default DeathsPage