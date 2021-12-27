import React, { useEffect, useState } from "react";
import { Bar } from '@ant-design/charts';
import { Alert } from "react-bootstrap";
import { vaccines } from "../../functions/isCaribbeanCountry";
import getCOVIDInfo from "../../functions/fetchFromURL";
import _ from "lodash";
import { vaccinationNumbersURL } from "../../constants";
import { useTranslation } from 'react-i18next';
import "./VaccinePage.css";
import { Table } from "antd";
import { CSVLink } from "react-csv"
import { columns } from './columns'



function VaccinePage(props) {

  const [vaccineData, setVaccineData] = useState(null);
  const [vaccineDataA, setVaccineDataAnt] = useState(null);
  const { t } = useTranslation();


  useEffect(() => {

    document.body.style.backgroundColor = "#1A2637";
    getCOVIDInfo(vaccinationNumbersURL)
      .then((body) => {
        let obj = JSON.parse(body);
        obj = obj.filter(vaccines);

        let vaccineData = [];
        obj.map((countryElement) => {
          vaccineData[countryElement.country] = _.last(countryElement.data);
        });

        setVaccineData(vaccineData);

        const vaccineDataAnt1 = obj.map((countryElement) => {

          const dat = _.last(countryElement.data);

          return {
            country: countryElement.country,
            status: '% people fully vaccinated',
            count: dat.people_fully_vaccinated_per_hundred
          }
        });

        const vaccineDataAnt2 = obj.map((countryElement) => {

          const dat = _.last(countryElement.data);
          const partiallyvaccinated = dat.people_vaccinated_per_hundred - dat.people_fully_vaccinated_per_hundred
          return {
            country: countryElement.country,
            status: '% people partially vaccinated',
            count: partiallyvaccinated ? parseFloat(partiallyvaccinated.toFixed(2)) : 'n/a'
          }
        });

        const finale = [...vaccineDataAnt1, ...vaccineDataAnt2]
        setVaccineDataAnt(finale)

      })
      .then();
  }, []);



  var config = {
    data: vaccineDataA || [],
    xField: 'count',
    yField: 'country',
    seriesField: 'status',
    isPercent: false,
    isStack: true,
    height: 600,
    colorField: 'status', // or seriesField in some cases
    color: ['rgba(244,211,94)', 'rgba(249, 87, 56)'],
  };



  const vals = vaccineData ? Object.entries(vaccineData) : null

  const dataForTable = vals?.map((el) => {
    const key = el[1];
    return {
      country: el[0], date: key.date, people_fully_vaccinated: key.people_fully_vaccinated,
      people_vaccinated: key.people_vaccinated,
      people_fully_vaccinated_per_hundred: key.people_fully_vaccinated_per_hundred,
      people_vaccinated_per_hundred: key.people_vaccinated_per_hundred
    };
  });


  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', padding: "100px 20px 100px 20px" }}>

        <div className="div-only-mobile">
          Please turn device landscape for best viewing experience
        </div>
        <div style={{ alignSelf: 'flex-start' }}> <h4 className='title'> {t('vaccination_region')}</h4></div>
        <br />
        <h5 className='subtitle'> Bar Chart </h5>
        <Bar {...config} />
        <br />
        <h5 className='subtitle'> Table </h5>
        <br />

        <Table dataSource={dataForTable} columns={columns} />
        <div className='export-button'><CSVLink
          filename={`${new Date()}_vaccine_data_caricovidmap.csv`}
          data={dataForTable ?? []}
          className="export-button"
        >
          Export to Vaccine Data to CSV
        </CSVLink></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Alert
            dismissable={"true"}
            key={1}
            variant={"secondary"}
            style={{
              color: "gray",
              fontSize: "0.75rem",
              backgroundColor: "#273852",
              borderColor: "#273852",
              padding: "0.45rem",
              width: "20rem",
              marginTop: "1rem",
            }}
          >
            Source: Our World in Data, there may be update delays.
          </Alert>
        </div>
      </div>
    </>
  );
}

export default VaccinePage;
