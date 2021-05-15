import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2';
import {countryList} from '../../data/fullCountryList.js'
import {vaccines} from "../../functions/isCaribbeanCountry";
import getCOVIDInfo from "../../functions/fetchFromURL";
import _ from "lodash";
import {
    vaccinationNumbersURL,
  } from "../../constants";



export default function VaccinePage() {

    const [vaccineData, setVaccineData] = useState(null);
    const [vaccineCountries, setVaccineCountries] = useState(null);
    const [peopleVaccinated, setPeopleVaccinated] = useState(null);
    const [peopleFullyVaccinated, setPeopleFullyVaccinated] = useState(null);
    let data = []
    
    useEffect(() => {
        document.body.style.backgroundColor = "#1A2637";
        getCOVIDInfo(vaccinationNumbersURL).then((body) => {
          let obj = JSON.parse(body)
          obj = obj.filter(vaccines)
          
          let vaccineData = []
          obj.map((countryElement) => {
            vaccineData[countryElement.country] = _.last(countryElement.data);
          })
          setVaccineCountries(Object.keys(vaccineData))
          setVaccineData(vaccineData)
          //console.log(vaccineData)
          setPeopleVaccinated(Object.values(vaccineData).map(obj => obj.people_vaccinated_per_hundred))
          setPeopleFullyVaccinated(Object.values(vaccineData).map(obj => obj.people_fully_vaccinated_per_hundred))

        }).then(
           
        )

    }, [null])

    data = {
      labels: vaccineCountries,
      datasets: [
        {
          label: 'People vaccinated per 100',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: peopleVaccinated
        },
        {
          label: 'People fully vaccinated per 100',
          backgroundColor: 'rgba(0, 212, 255, 1)',
          borderColor: 'rgba(0, 212, 255, 1)',
          borderWidth: 2,
          data: peopleFullyVaccinated
        }
      ]
    }

    return (
        <div style={{padding: '200px 20px 100px 20px'}}>
            <Bar
          data={data}
          options={{
            title:{
              display:true,
              text:'People vaccinated per 100',
              fontSize:20
            },
            legend:{
              display:true,
              position:'bottom'
            }
          }}
        />
        </div>
    )
}
