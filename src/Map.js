import React, { Component } from "react";

import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "./MAPBOX_ACCESS_TOKEN.js";
import { Card } from "react-bootstrap";
import getCOVIDInfo from './fetchFromURL';
import parse from 'csv-parse';
import isCaribbeanCountry from './isCaribbeanCountry'
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;


const url =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const deathsSource =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
const myOverrideURL =
  "https://raw.githubusercontent.com/luvi/caricoviddata/master/casesOverride.csv";
const recoveredSourceURL =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

let quickAddDeaths = [["", "Trinidad and Tobago", "10.6918", "-61.2225", "2"],["","Puerto Rico","18.2208","-66.5901","84"],["","Belize","17.195465","-88.268587","2"] ];

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      totalDeaths: 0,
      lng: -61,
      lat: 15,
      zoom: 4,
      caribbeanData: [],
      caribbeanDataDeaths: [],
      caribbeanDataRecovered: [],
      johnsHopkinsData: [],
      date: "",
    };
  }

 

  sum(total, array) {
    return total + parseInt(array[array.length - 1]);
  }

  setMarkers(map) {
    let cariData = this.state.caribbeanData;
    let cariDataDeaths = this.state.caribbeanDataDeaths;
    let caribbeanDataRecovered = this.state.caribbeanDataRecovered;

    cariData.forEach((element) => {
      let numDeaths = 0;
      let numRecovered = 0;
      let caribbeanName = element[0] === "" ? element[1] : element[0];
      let numCases = element[element.length - 1];
      let matchingDEntry = cariDataDeaths.filter(
        (entry) => entry[0] === caribbeanName || entry[1] === caribbeanName
      )[0];
      if (typeof matchingDEntry !== "undefined") {
        numDeaths = matchingDEntry[matchingDEntry.length - 1];
      }

      //filter and find array element with info on relevant country recovery data.
      let matchingRecoveredEntry = caribbeanDataRecovered.filter(
        (entry) => entry[0] === caribbeanName || entry[1] === caribbeanName
      )[0];
      if (typeof matchingRecoveredEntry !== "undefined") {
        numRecovered =
          matchingRecoveredEntry[matchingRecoveredEntry.length - 1];
      }

      //shows a different size based on the number of cases, but minimum size is 20
      let size = Math.max(15, Math.min(parseInt(numCases) / 5, 60));

      let popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `${caribbeanName}: ${numCases} confirmed, ${numDeaths} death(s), ${numRecovered} recovered`
      );
      // add marker to map

      var el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = "red";
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.borderRadius = "50%";
      el.style.opacity = "50%";

      new mapboxgl.Marker(el)
        .setLngLat({ lng: element[3], lat: element[2] })
        .setPopup(popup)
        .addTo(map);
    });
  }

  componentDidMount() {

    console.log("developer: @JaniquekaJohn, data: Johns Hopkins");
    
    getCOVIDInfo(url, (body) => {
      //readJohnsCSV
      

      parse(body, (err, output) => {
        const arr = output;
        let size = arr[0].length; //latest entry
        this.setState({ date: arr[0][size - 1] }); //date of latest entry

        let johnsHopkinsData = arr.filter(isCaribbeanCountry);
        let johnsHopkinsCountries = new Set();

        getCOVIDInfo(deathsSource, (body) => {
          //Read JohnsDeathCSV
          parse(body, (err, output) => {
            let caribbeanDataDeaths = output.filter(isCaribbeanCountry);
            caribbeanDataDeaths = caribbeanDataDeaths.concat(quickAddDeaths);

            getCOVIDInfo(myOverrideURL, (body) => {
              //Read my CSV
              parse(body, (err, output) => {
                let myCSVData = output;

                //pick the higher case count out of my override data, and Johns Hopkins Data (Confirmed cases)
                johnsHopkinsData.forEach((jhDataElement) => {
                  let caribbeanName =
                    jhDataElement[0] === ""
                      ? jhDataElement[1]
                      : jhDataElement[0];
                  johnsHopkinsCountries.add(caribbeanName); //create set of all countries johns has
                  let numCases = jhDataElement[jhDataElement.length - 1];
                  let matchingDEntry = myCSVData.filter(
                    (entry) =>
                      entry[0] === caribbeanName || entry[1] === caribbeanName
                  );

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
                getCOVIDInfo(recoveredSourceURL, (body) => {
                  parse(body, (err, output) => {
                    let recoveredArr = output.filter(isCaribbeanCountry);
                    this.setState({ caribbeanDataRecovered: recoveredArr });

                    johnsHopkinsData = johnsHopkinsData.concat(myCSVData);

                    this.setState({ caribbeanDataDeaths: caribbeanDataDeaths });
                    this.setState({
                      totalDeaths: caribbeanDataDeaths.reduce(this.sum, 0),
                    });
                    this.setState({ caribbeanData: johnsHopkinsData });
                    this.setMarkers(map);
                    this.setState({
                      total: johnsHopkinsData.reduce(this.sum, 0),
                    });
                  });
                });
              }); //parse
            }); //end read my csv
          });
        }); // end read Johns Hopkins Death CSV
      });
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
          <div className="statsCard"><Card
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
