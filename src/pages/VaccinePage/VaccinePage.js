import React, { useEffect, useState } from "react";
import {Alert} from "react-bootstrap"
import { Bar,defaults } from "react-chartjs-2";
import { vaccines } from "../../functions/isCaribbeanCountry";
import getCOVIDInfo from "../../functions/fetchFromURL";
import _ from "lodash";
import { vaccinationNumbersURL } from "../../constants";
import { withTranslation,useTranslation } from "react-i18next";
import "./VaccinePage.css";
import { CSVLink} from "react-csv";
defaults.color = 'white'
defaults.backgroundColor = 'rgb(230, 243, 255)'
defaults.borderColor = 'rgb(88,88,88)'
//defaults.legend.position = 'bottom'
function VaccinePage(props) {
  const { t } = useTranslation();
  const [vaccineData, setVaccineData] = useState(null);
  const [vaccineCountries, setVaccineCountries] = useState(null);
  const [peopleVaccinated, setPeopleVaccinated] = useState(null);
  const [peopleFullyVaccinated, setPeopleFullyVaccinated] = useState(null);
  

  const options = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    },
    title: {
      display: true,
      text: "People vaccinated per 100",
      fontSize: 20,
    },
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
    maintainAspectRation:false
  }
  let data = [];

  useEffect(() => {
   // console.log(defaults)
 
    document.body.style.backgroundColor = "#1A2637";
    getCOVIDInfo(vaccinationNumbersURL)
      .then((body) => {
        let obj = JSON.parse(body);
        obj = obj.filter(vaccines);

        let vaccineData = [];
        obj.map((countryElement) => {
          vaccineData[countryElement.country] = _.last(countryElement.data);
        });
        setVaccineCountries(Object.keys(vaccineData));
        setVaccineData(vaccineData);
        //console.log(vaccineData)
        setPeopleVaccinated(
          Object.values(vaccineData).map(
            (obj) => obj.people_vaccinated_per_hundred
          )
        );
        setPeopleFullyVaccinated(
          Object.values(vaccineData).map(
            (obj) => obj.people_fully_vaccinated_per_hundred
          )
        );
      })
      .then();
  }, [null]);

  data = {
    labels: vaccineCountries,
    datasets: [
      {
        label: "People vaccinated per 100",
        backgroundColor: "rgba(244,211,94)",
        data: peopleVaccinated,
      },
      {
        label: "People fully vaccinated per 100",
        backgroundColor: "rgba(249, 87, 56)",
        data: peopleFullyVaccinated,
      },
    ],
  };

  return (
    <>
   
    <div style={{ padding: "100px 20px 100px 20px" }}>
      <div className="div-only-mobile">Please turn device landscape for best viewing experience</div>
      <Bar
        data={data}
        options={options}
      />
      <div style={{display:'flex',justifyContent: "center"}}>
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
            width:"20rem",
            marginTop: "1rem"
          }}
        >
          Source: Our World in Data, there may be update delays.
          Segregated data not available for SVG.
        </Alert>
        {/* <CSVLink data={vaccineData}>Download me</CSVLink>; */}
        </div>
    </div>
    
    </>

  );
}

export default withTranslation()(VaccinePage);
