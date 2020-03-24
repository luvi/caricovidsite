import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import mapboxgl from "mapbox-gl";
import { countryList } from "./countryList.js";
import { MAPBOX_ACCESS_TOKEN } from "./MAPBOX_ACCESS_TOKEN.js";
import { type } from "os";

var https = require("https");
const parse = require("csv-parse");

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

const url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
const deathsSource = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv`;

let quickAdd = [
  ["", "Belize", "17.195465", "-88.268587", "1"],
  ["", "Turks & Caicos Islands", "21.799720", "-71.729114", "1"]
];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: "",
      totalDeaths: 0,
      lng: -61,
      lat: 15,
      zoom: 4,
      caribbeanData: [],
      caribbeanDataDeaths: [],
      johnsHopkinsData: [],
      date: ""
    };
  }

  getCOVIDInfo(url, callback) {
    var body = "";
    https
      .get(url, function(res) {
        res.on("data", function(chunk) {
          body += chunk;
        });

        res.on("end", data => {
          callback(body);
        });
      })
      .on("error", function(e) {
        console.log("Got an error: ", e);
      });
  }

  isCaribbeanCountry(arr) {
    return countryList.includes(arr[1]) || countryList.includes(arr[0]);
  }

  sum(total, array) {
    return total + parseInt(array[array.length - 1]);
  }

  setMarkers(map) {
    let cariData = this.state.caribbeanData;
    let cariDataDeaths = this.state.caribbeanDataDeaths;

    cariData.forEach(element => {
      let numDeaths = 0;
      let caribbeanName = element[0] === "" ? element[1] : element[0];
      let numCases = element[element.length - 1];
      let matchingDEntry = cariDataDeaths.filter(
        entry => entry[0] === caribbeanName || entry[1] === caribbeanName
      )[0];
      if (typeof matchingDEntry !== "undefined") {
        numDeaths = matchingDEntry[matchingDEntry.length - 1];
      }

      console.log(numDeaths);
      let size = Math.max(20, (parseInt(numCases) / 300) * 100);

      let popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `${numCases} confirmed, ${numDeaths} passed`
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
    this.getCOVIDInfo(url, body => {
      console.log("developer: @JaniquekaJohn, data: Johns Hopkins");

      parse(body, (err, output) => {
        const arr = output;
        let size = arr[0].length; //latest entry
        this.setState({ date: arr[0][size - 1] }); //date of latest entry

        let caribbeanData = arr.filter(this.isCaribbeanCountry);

        caribbeanData = caribbeanData.concat(quickAdd);

        this.getCOVIDInfo(deathsSource, body => {
          parse(body, (err, output) => {
            let caribbeanDataDeaths = output.filter(this.isCaribbeanCountry);
            this.setState({ caribbeanDataDeaths: caribbeanDataDeaths });
            this.setState({
              totalDeaths: caribbeanDataDeaths.reduce(this.sum, 0)
            });
            this.setState({ caribbeanData: caribbeanData });
            this.setMarkers(map);
            this.setState({ total: caribbeanData.reduce(this.sum, 0) });
          });
        });
      });
    });

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/luvisaccharine/ck84wx1570bzg1iqfbqelhs3o",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Navbar.Brand href="#home">Caribbean COVID Map BETA</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link href="#">
                Total Confirmed Cases: {this.state.total}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">Updated: {this.state.date} </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/">Credits</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        <div
          ref={el => {
            this.mapContainer = el;
          }}
          className="mapContainer"
        />
      </div>
    );
  }
}
