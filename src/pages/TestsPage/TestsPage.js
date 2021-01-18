import React, { Component } from "react";
import getCOVIDInfo from "../../functions/fetchFromURL";
import { testsURL, graphGridColour, barbadosTestsURL } from "../../constants";
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

const svg = "Saint Vincent and the Grenadines"
const bb = "Barbados"

export default class TestsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedCountry: svg,
    };
  }

  parseDataForCountry = (body, countryName)=> {

    parse(body, (err, output) => {
        err ?? console.warn(err);

        let inner = [];
        output.map((entry) => {
          let outputSet = [];
          outputSet["date"] = entry[0];
          outputSet["tests"] = parseInt(entry[1]);
          inner.push(outputSet);
          return inner;
        });
        let localData = this.state.data
        localData[countryName] = inner
        this.setState({ data: localData });
        console.log(this.state.data)
    })
}

  handleChange = () => {
    this.setState({ selectedCountry: ReactDOM.findDOMNode(this.select).value });
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#1A2637";

    getCOVIDInfo(testsURL).then((testsBody) => {

        this.parseDataForCountry(testsBody,svg)
 
      return getCOVIDInfo(barbadosTestsURL);

    }).then((barbadosTestBody) =>{

        this.parseDataForCountry(barbadosTestBody,bb)
        
    });
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 100,
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          position: "relative",
          color: "white",
        }}
      >
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
              defaultValue={svg}
            >
             <option value={bb}>
                {bb}
              </option>
              <option value={svg}>
              {svg}
              </option>
            </Form.Control>
          </Form.Group>
        </Form>
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
            <XAxis dataKey="date" />
            <YAxis domain={[0, 30000]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="tests"
              stroke="#03f4fc"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="disclaimer">Beta, not yet updated daily</div>
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
              <p className="desc">{`${payload[0].value} tests completed`}</p>
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
