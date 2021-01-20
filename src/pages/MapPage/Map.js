import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../../MAPBOX_ACCESS_TOKEN.js";
import getCOVIDInfo from "../../functions/fetchFromURL";
import parse from "csv-parse";
import isCaribbeanCountry from "../../functions/isCaribbeanCountry";
import {
  url,
  deathsSource,
  myOverrideURL,
  recoveredSourceURL,
  unitedStatesCaseSource,
} from "../../constants";
import createCaribbeanDataArray from "./createCaribbeanDataArray";
import TinyQueue from "tinyqueue";
import setMarkers from "./setMarkers";
import _ from "lodash";
import moment from "moment";

import UpdatedCard from "./UpdatedCard.js";
import StatsCard from "./StatsCard.js";
import LowestActiveCard from "./LowestActiveCard.js";
import HighestActiveCard from "./HighestActiveCard.js";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

let quickAddDeaths = [
  ["", "Trinidad and Tobago", "10.6918", "-61.2225", "2"],
  //["", "Puerto Rico", "18.2208", "-66.5901", "230"],
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
      lowestActiveCases: [],
      highestActiveCases: [],
      hideHighestActiveBox: false,
      puertoRicoConfirmedCases: 0,
    };
  }

  onClickHideHighest = () => {
    this.setState({ hideHighestActiveBox: true });
  };

  onClickHideLowest = () => {
    this.setState({ hideLowestActiveBox: true });
  };

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
          this.setState({
            date: moment(_.last(arr[0])).format("dddd, MMMM Do YYYY"),
          }); //date of latest entry

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

          // let prData = myCSVData.filter(
          //   (entry) => entry[1] === 'Puerto Rico'
          // )

          // this.setState({puertoRicoConfirmedCases: parseInt(_.last(prData[0]))})

          //pick the higher case count out of my override data, and Johns Hopkins Data (Confirmed cases)
          johnsHopkinsData.forEach((jhDataElement) => {
            let caribbeanName =
              jhDataElement[0] === "" ? jhDataElement[1] : jhDataElement[0];

            johnsHopkinsCountries.add(caribbeanName); //create set of all countries johns has
            let numCases = _.last(jhDataElement);
            let myDataCountry = myCSVData.filter(
              (entry) =>
                entry[0] === caribbeanName || entry[1] === caribbeanName
            );

            if (caribbeanName === "Belize") {
              //Johns Hopkins coordinates are incorrect

              jhDataElement[2] = "17.195465";
              jhDataElement[3] = "-88.268587";
            }

            if (typeof myDataCountry[0] !== "undefined") {
              myDataCountry = myDataCountry[0];
              let myCaseCount = _.last(myDataCountry);

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

          // recoveredArr.forEach((jhDataElement) => {
          //   let caribbeanName = jhDataElement[0] === "" ? jhDataElement[1] : jhDataElement[0];

          //   if (caribbeanName === 'Puerto Rico') { //Johns Hopkins coordinates are incorrect
          //     jhDataElement[recoveredArr.size - 1] = puertoRicoRecovered;
          //   }})
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

        let totalRecovered = this.state.caribbeanDataRecovered.reduce(
          this.sum,
          0
        );

        this.setState({ caribbeanDataDeaths: caribbeanDataDeaths });
        this.setState({ totalDeaths: caribbeanDataDeaths.reduce(this.sum, 0) });
        this.setState({ caribbeanData: johnsHopkinsData });
        let cleanedUpArray = createCaribbeanDataArray(
          this.state.caribbeanData,
          this.state.caribbeanDataDeaths,
          this.state.caribbeanDataRecovered
        );
        this.setState(cleanedUpArray);
        setMarkers(map, mapboxgl, cleanedUpArray);
        this.setState({ total: johnsHopkinsData.reduce(this.sum, 0) });

        this.setState({
          totalActiveCases:
            this.state.total -
            totalRecovered -
            this.state.totalDeaths -
            this.state.puertoRicoConfirmedCases,
        });

        let queue = new TinyQueue([...cleanedUpArray], function (a, b) {
          return a.activeCases - b.activeCases;
        });
        let highestActiveQueue = new TinyQueue(
          [...cleanedUpArray],
          function (a, b) {
            return b.activeCases - a.activeCases;
          }
        );
        let lowestActiveCases = [];
        let highestActiveCases = [];
        let topNumberOfCases = 5;
        for (let i = 0; i < topNumberOfCases; i++) {
          lowestActiveCases.push(queue.pop());
        }

        for (let i = 0; i < topNumberOfCases; i++) {
          let value = highestActiveQueue.pop();

          if (value.caribbeanName !== "Puerto Rico") {
            highestActiveCases.push(value);
          } else {
            i--;
          }
        }

        this.setState({ lowestActiveCases });
        this.setState({ highestActiveCases });
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
            <UpdatedCard date={this.state.date}/>
            <StatsCard totalActiveCases={this.state.totalActiveCases} total={this.state.total} totalDeaths={this.state.totalDeaths}/>
            <LowestActiveCard lowestActiveCases={this.state.lowestActiveCases} />
            <HighestActiveCard highestActiveCases={this.state.highestActiveCases} />
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
