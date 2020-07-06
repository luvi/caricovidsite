import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../../MAPBOX_ACCESS_TOKEN.js";
import { Card } from "react-bootstrap";
import getCOVIDInfo from "../../functions/fetchFromURL";
import parse from "csv-parse";
import isCaribbeanCountry from "../../functions/isCaribbeanCountry";
import {url,deathsSource,myOverrideURL,recoveredSourceURL,unitedStatesCaseSource} from "../../constants"
import setMarkers from './setMarkers'
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;


let quickAddDeaths = [
  ["", "Trinidad and Tobago", "10.6918", "-61.2225", "2"],
  ["", "Puerto Rico", "18.2208", "-66.5901", "155"],
  ["", "Belize", "17.195465", "-88.268587", "2"],
];

export default class Map extends Component {
  constructor(props) {
    super(props);
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
    };
  }

  sum(total, array) {
    return total + parseInt(array[array.length - 1]);
  }



  componentDidMount() {
    console.log(
      "developer: @JaniquekaJohn, Open Source https://github.com/luvi/caricovidsite"
    );

    let johnsHopkinsData;
    let johnsHopkinsCountries;
    let myCSVData;
    let caribbeanDataDeaths;
    let recoveredArr;

    getCOVIDInfo(url)
      .then((body) => {
        parse(body, (err, output) => {
          const arr = output;
          let size = arr[0].length; //latest entry
          this.setState({ date: arr[0][size - 1] }); //date of latest entry

          johnsHopkinsData = arr.filter(isCaribbeanCountry);
          johnsHopkinsCountries = new Set();
        });

        return getCOVIDInfo(deathsSource);
      })
      .then((body) => {
        //Read JohnsDeathCSV
        parse(body, (err, output) => {
          caribbeanDataDeaths = output.filter(isCaribbeanCountry);
          caribbeanDataDeaths = caribbeanDataDeaths.concat(quickAddDeaths);
        });

        return getCOVIDInfo(myOverrideURL);
      })
      .then((myOverrideData) => {
        //Read my CSV
        parse(myOverrideData, (err, output) => {
          myCSVData = output;

          //pick the higher case count out of my override data, and Johns Hopkins Data (Confirmed cases)
          johnsHopkinsData.forEach((jhDataElement) => {
            let caribbeanName =
              jhDataElement[0] === "" ? jhDataElement[1] : jhDataElement[0];
            johnsHopkinsCountries.add(caribbeanName); //create set of all countries johns has
            let numCases = jhDataElement[jhDataElement.length - 1];
            let matchingDEntry = myCSVData.filter(
              (entry) =>
                entry[0] === caribbeanName || entry[1] === caribbeanName
            );

            if (caribbeanName === 'Belize') { //Johns Hopkins coordinates are incorrect

              jhDataElement[2] = '17.195465';
              jhDataElement[3] = '-88.268587';

            }

            if (typeof matchingDEntry[0] !== "undefined") {
              matchingDEntry = matchingDEntry[0];
              let myCaseCount = matchingDEntry[matchingDEntry.length - 1];
              jhDataElement[jhDataElement.length - 1] = Math.max(
                numCases,
                myCaseCount
              );
            }
            //add the data that I have that Johns Hopkins does not.

            myCSVData = myCSVData.filter((arr) => {
              return !(
                johnsHopkinsCountries.has(arr[0]) ||
                johnsHopkinsCountries.has(arr[1])
              );
            });
          });
        });

        return getCOVIDInfo(myOverrideURL);
      })
      .then(() => {
        return getCOVIDInfo(recoveredSourceURL);
      })
      .then((body) => {
        parse(body, (err, output) => {
          recoveredArr = output.filter(isCaribbeanCountry);
        });

        return getCOVIDInfo(unitedStatesCaseSource);
      })
      .then((body) => {

        //TODO: Make Puerto Rico Data read from US JohnsHopkins file
        // let puertoRicoData;

        // parse(body, (output) => {
        //   puertoRicoData = output[0].filter((data) => {
        //     return data[7] === "Puerto Rico";
        //   });
        // });
        // johnsHopkinsData.concat(puertoRicoData);

        this.setState({ caribbeanDataRecovered: recoveredArr });
        johnsHopkinsData = johnsHopkinsData.concat(myCSVData);

         let totalRecovered = this.state.caribbeanDataRecovered.reduce(this.sum, 0)
    
        this.setState({ caribbeanDataDeaths: caribbeanDataDeaths });
        this.setState({ totalDeaths: caribbeanDataDeaths.reduce(this.sum, 0) });
        this.setState({ caribbeanData: johnsHopkinsData });
        setMarkers(map, mapboxgl, this.state.caribbeanData, this.state.caribbeanDataDeaths, this.state.caribbeanDataRecovered);
        this.setState({ total: johnsHopkinsData.reduce(this.sum, 0) });
        this.setState({totalActiveCases: this.state.total - totalRecovered })
      });

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/luvisaccharine/ck84wx1570bzg1iqfbqelhs3o",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    return (
      <div>
        <div className="statsContainer">
          <div className="statsCard">
            <Card
              type="rounded-0"
              style={{
                width: "18rem",
                backgroundColor: "#1A2637",
                borderRadius: "0",
              }}
            >
              <Card.Body>
                <Card.Text style={{ color: "white" }}>
                  <div>Updated: {this.state.date}</div>
                  <div>Total Active Cases: {this.state.totalActiveCases}</div>
                  <div>Total Confirmed Cases: {this.state.total}</div>
                  <div>Total Deaths: {this.state.totalDeaths}</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
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
