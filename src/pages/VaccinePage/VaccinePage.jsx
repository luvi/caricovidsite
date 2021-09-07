import React, { useEffect, useState } from "react";
import { Bar } from '@ant-design/charts';
import { Alert } from "react-bootstrap";
import { defaults } from "react-chartjs-2";
import { vaccines } from "../../functions/isCaribbeanCountry";
import getCOVIDInfo from "../../functions/fetchFromURL";
import _ from "lodash";
import { vaccinationNumbersURL } from "../../constants";
import { withTranslation } from "react-i18next";
import "./VaccinePage.css";
import { Table, Button } from "antd";
defaults.color = "white";
defaults.backgroundColor = "rgb(230, 243, 255)";
defaults.borderColor = "rgb(88,88,88)";


function VaccinePage(props) {

  const [vaccineData, setVaccineData] = useState(null);
  const [vaccineDataA, setVaccineDataAnt] = useState(null);
  const [showRaw, setShowRaw] = useState(null);

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

          return {
            country: countryElement.country,
            status: '% people partially vaccinated',
            count: dat.people_vaccinated_per_hundred - dat.people_fully_vaccinated_per_hundred
          }
        });

        const finale = [...vaccineDataAnt1, ...vaccineDataAnt2]

        setVaccineDataAnt(finale)
        console.warn(finale)


      })
      .then();
  }, [null]);



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
    return { country: el[0], date: key.date, people_fully_vaccinated: key.people_fully_vaccinated, people_vaccinated: key.people_vaccinated };
  });


  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country"
    },
    {
      title: "People fully vaccinated",
      dataIndex: "people_fully_vaccinated",
      key: "people_fully_vaccinated",
      sorter: (a, b) => a.people_fully_vaccinated - b.people_fully_vaccinated,
      sortDirections: ['descend', 'ascend']
    }, {
      title: "People vaccinated",
      dataIndex: "people_vaccinated",
      key: "people_vaccinated",
      sorter: (a, b) => a.people_vaccinated - b.people_vaccinated,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: "Date updated",
      dataIndex: "date",
      key: "date",
    }
  ];



  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', padding: "100px 20px 100px 20px" }}>
        <Button style={{ width: '300px', alignSelf: 'center' }}
          onClick={() => {
            setShowRaw(!showRaw);
          }}
        >
          Toggle data view
        </Button>
        <div className="div-only-mobile">
          Please turn device landscape for best viewing experience
        </div>
        {showRaw ? <Table dataSource={dataForTable} columns={columns} /> : <Bar {...config} />}
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

export default withTranslation()(VaccinePage);
