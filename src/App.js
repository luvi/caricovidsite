import React, { Component } from "react";
import "./App.css";
var https = require("https");
const parse = require("csv-parse");

const url = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;
let data;

let countryList = [
  "Anguilla",
  "Antigua and Barbuda",
  "Aruba",
  "The Bahamas",
  "Barbados",
  "British Virgin Islands",
  "Cayman Islands",
  "Cuba",
  "Dominica",
  "Dominican Republic",
  "Grenada",
  "Guadeloupe",
  "Haiti",
  "Jamaica",
  "Martinique",
  "Montserrat",
  "Netherlands Antilles",
  "Puerto Rico",
  "Saint Barthelemy",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "St Martin",
  "Saint Vincent and the Grenadines",
  "Trinidad and Tobago",
  "Turks & Caicos Islands",
  "US Virgin Islands",
  "Venezuela",
  "Guyana",
  "Belize",
  "French Guiana",
  "Suriname",
  "Panama"
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: '',
      total: ''

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

  componentDidMount() {
    //setInterval(() => {
    this.getCOVIDInfo(url, body => {
      console.log("hi");
      data = body;
      parse(
        body,
        {
          comment: "#"
        },
        (err, output) => {
          const arr = output;
          let size = arr[0].length; //latest entry
          console.log(arr[0][size - 1]); //date of latest entry
          let outputString = "";

          let caribbeanData = arr.filter(this.isCaribbeanCountry);
          for (let country in caribbeanData) {
            outputString +=
              caribbeanData[country][0] === ""
                ? caribbeanData[country][1]
                : caribbeanData[country][0]
            ;
            outputString +=
              " " + caribbeanData[country][caribbeanData[country].length - 1]
            ;
          }

          this.setState({output: outputString});
          this.setState({total: caribbeanData.reduce(this.sum, 0)});
        }
      );
    });
    //}, 10000);
  }

  render() {
    return (
      <div className="App">
        <h1>Caribbean COVID Map TEST</h1>
    <h3>Countries Data </h3>
    <div>{this.state.output}</div>
    <h3>Total cases</h3>
    <div>{this.state.total}</div>
      </div>
    );
  }
}
