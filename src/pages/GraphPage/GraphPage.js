import React, { Component } from "react";
import isCaribbeanCountry from "../../functions/isCaribbeanCountryFull";
import { countryList } from "../../data/fullCountryList";
import getCOVIDInfo from "../../functions/fetchFromURL";
import {
  url,
  recoveredSourceURL,
  deathsSource,
  graphGridColour,
} from "../../constants";
import parse from "csv-parse";
import { Form } from "react-bootstrap";
import ReactDOM from "react-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./GraphPage.css";
import {
  activeCasesLineColour,
  confirmedCasesLineColour,
  deathsLineColour,
} from "./graph-line-colours";
//import AllCountriesGraph from "./allCountriesGraph";

const data = [];

export default class GraphPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedCountry: "Antigua and Barbuda",
      allCountriesData: [],
      deathsdata: [],
    };
  }

  handleChange = () => {
    this.setState({ selectedCountry: ReactDOM.findDOMNode(this.select).value });
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#1A2637";

    getCOVIDInfo(deathsSource)
      .then((deathsBody) => {
        parse(deathsBody, (err, output) => {
          output = output.filter(isCaribbeanCountry);
          this.setState({ deathsdata: output });
        });

        return getCOVIDInfo(url);
      })
      .then((body) => {
        parse(body, (err, output) => {
          const arr = output;
          let size = arr[0].length; //latest entry
          this.setState({ date: arr[0][size - 1] }); //date of latest entry

          let johnsHopkinsData = arr.filter(isCaribbeanCountry);
          let labels = arr[0];

          for (let i = 0; i < johnsHopkinsData.length; i++) {
            let inner = [];

            for (let j = 4; j < labels.length; j++) {
              let dataArrayPerCountry = [];
              dataArrayPerCountry["name"] = labels[j];
              dataArrayPerCountry["Confirmed cases"] = parseInt(
                johnsHopkinsData[i][j]
              );
              dataArrayPerCountry["Active cases"] = 2;
              dataArrayPerCountry["Deaths"] = parseInt(
                this.state.deathsdata[i][j]
              );
              inner.push(dataArrayPerCountry);
            }

            let countryName =
              johnsHopkinsData[i][0] === ""
                ? johnsHopkinsData[i][1]
                : johnsHopkinsData[i][0];

            data[countryName] = inner;
          }

          this.setState({ data });
        });

        return getCOVIDInfo(recoveredSourceURL);
      })
      .then((recoveredData) => {
        parse(recoveredData, (err, output) => {
          let labels = output[0];
          let recoveryData = output.filter(isCaribbeanCountry);
          let data = this.state.data;

          for (let i = 0; i < recoveryData.length; i++) {
            let countryName =
              recoveryData[i][0] === ""
                ? recoveryData[i][1]
                : recoveryData[i][0];
            let innerArr = data[countryName];
            let count = 0;
            let indexOfFirstDateLabel = 4;

            for (let j = indexOfFirstDateLabel; j < labels.length; j++) {
              let numberOfRecoveredCasesOnThisDate = recoveryData[i][j];
              let numberOfConfirmedCasesOnThisDate =
                innerArr[count]["Confirmed cases"];
              let numberOfDeathsOnThisDate = innerArr[count]["Deaths"];

              innerArr[count]["Active cases"] =
                numberOfConfirmedCasesOnThisDate -
                numberOfRecoveredCasesOnThisDate -
                numberOfDeathsOnThisDate;
              count++;
            }

            data[countryName] = innerArr;
          }

          this.setState({ data: data });
        });
      });
  }

  render() {
    return (
      <div className={"graph-style"}>
        <Form>
          <Form.Group controlId="caribbeanForm.SelectCustom">
            <Form.Label>Choose a country</Form.Label>
            <Form.Control
              ref={(select) => {
                this.select = select;
              }}
              as="select"
              custom
              onChange={this.handleChange}
              defaultValue="Antigua and Barbuda"
            >
              <option value="All countries">All countries</option>
              {countryList.map((country) => (
                <option value={country}>{country}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>

        {this.state.selectedCountry === "All countries" ? (
          <div> Graph for all countries coming soon </div> //ReactComponent
        ) : (
          //  <AllCountriesGraph countryData={[this.state.allCountriesData]}/>

          <ResponsiveContainer width="99%" height={500}>
            <LineChart
              data={this.state.data[this.state.selectedCountry]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={graphGridColour} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Confirmed cases"
                stroke={confirmedCasesLineColour}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Active cases"
                stroke={activeCasesLineColour}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="Deaths"
                stroke={deathsLineColour}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        <div className="disclaimer">Data source: JHU, updated once per day</div>
      </div>
    );
  }
}

export class CustomTooltip extends Component {
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div>
          {" "}
          {!!payload ? (
            <div className="custom-tooltip">
              <p className="label">{`${label}`}</p>
              <p className="desc">{`${payload[0].value} confirmed case(s), ${payload[1].value} active case(s), ${payload[2].value} total deaths `}</p>
            </div>
          ) : (
            <div> </div>
          )}{" "}
        </div>
      );
    }

    return null;
  }
}
