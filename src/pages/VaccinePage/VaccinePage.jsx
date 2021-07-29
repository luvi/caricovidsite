import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { Bar, defaults } from "react-chartjs-2";
import { vaccines } from "../../functions/isCaribbeanCountry";
import getCOVIDInfo from "../../functions/fetchFromURL";
import _ from "lodash";
import { vaccinationNumbersURL } from "../../constants";
import { withTranslation} from "react-i18next";
import "./VaccinePage.css";
import { Table , Button} from "antd";
defaults.color = "white";
defaults.backgroundColor = "rgb(230, 243, 255)";
defaults.borderColor = "rgb(88,88,88)";

function VaccinePage(props) {

  const [vaccineData, setVaccineData] = useState(null);
  const [vaccineCountries, setVaccineCountries] = useState(null);
  const [peopleVaccinated, setPeopleVaccinated] = useState(null);
  const [peopleFullyVaccinated, setPeopleFullyVaccinated] = useState(null);
  const [peopleVaccinatedRaw, setPeopleVaccinatedRaw] = useState(null);
  const [peopleFullyVaccinatedRaw, setPeopleFullyVaccinatedRaw] =
    useState(null);
  const [showRaw, setShowRaw] = useState(null);

  const options = {
    indexAxis: "y",
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    title: {
      display: true,
      text: "People vaccinated per 100",
      fontSize: 20,
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    maintainAspectRation: false,
  };

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
        console.warn(vaccineData);
        setPeopleVaccinated(
          Object.values(vaccineData).map(
            (obj) => obj.people_vaccinated_per_hundred - obj.people_fully_vaccinated_per_hundred
          )
        );
        setPeopleFullyVaccinated(
          Object.values(vaccineData).map(
            (obj) => obj.people_fully_vaccinated_per_hundred
          )
        );
        setPeopleVaccinatedRaw(
          Object.values(vaccineData).map((obj) => obj.people_vaccinated)
        );
        setPeopleFullyVaccinatedRaw(
          Object.values(vaccineData).map((obj) => obj.people_fully_vaccinated)
        );
      })
      .then();
  }, [null]);

  const dataPercent = {
    labels: vaccineCountries,
    datasets: [
      {
        label: "% partially vaccinated",
        backgroundColor: "rgba(244,211,94)",
        data: peopleVaccinated,
      },
      {
        label: "% fully vaccinated",
        backgroundColor: "rgba(249, 87, 56)",
        data: peopleFullyVaccinated,
      },
    ],
  };

  const vals = vaccineData ? Object.entries(vaccineData): null
 
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
      sortDirections: ['descend','ascend']
    },{
      title: "People vaccinated",
      dataIndex: "people_vaccinated",
      key: "people_vaccinated",
      sorter: (a, b) => a.people_vaccinated - b.people_vaccinated,
      sortDirections: ['descend','ascend']
    },
    {
      title: "Date updated",
      dataIndex: "date",
      key: "date",
    }
  ];



  return (
    <>
      <div style={{ padding: "100px 20px 100px 20px" }}>
      <Button
          onClick={() => {
            setShowRaw(!showRaw);
          }}
        >
          Toggle data view
        </Button>
        <div className="div-only-mobile">
          Please turn device landscape for best viewing experience
        </div>
       {showRaw ? <Table dataSource={dataForTable} columns={columns} /> : <Bar data={dataPercent} options={options} />}
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
            Source: Our World in Data, there may be update delays. Segregated
            data not available for Haiti.
          </Alert>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(VaccinePage);
