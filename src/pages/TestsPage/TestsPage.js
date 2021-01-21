import React, { Component } from "react";
import { withTranslation } from 'react-i18next'
import getCOVIDInfo from "../../functions/fetchFromURL";
import { testsURL, graphGridColour, barbadosTestsURL } from "../../constants";
import parse from "csv-parse";
import { Form,Alert } from "react-bootstrap";
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
import { testPageLineColour } from "../GraphPage/graph-line-colours";
import { TestsCustomTooltip } from "./CustomTestPageTooltip";
import "./TestsPage.css";

const svg = "Saint Vincent and the Grenadines";
const bb = "Barbados";
const svgCredit = "| Test data collected from the SVG Ministry of Health";

class TestsPage extends Component {
  constructor(props) {
    super(props);
    this.t = props.t
    this.state = {
      data: [],
      selectedCountry: svg,
    };
  }

  parseDataForCountry = (body, countryName) => {
    parse(body, (err, output) => {
      err ?? console.warn(err);

      let inner = [];
      output.map((entry) => {
        let outputSet = [];
        outputSet["date"] = entry[0];
        outputSet[this.t('tests')] = parseInt(entry[1]);
        inner.push(outputSet);
        return inner;
      });
      let localData = this.state.data;
      localData[countryName] = inner;
      this.setState({ data: localData });
    
    });
  };

  handleChange = () => {
    this.setState({ selectedCountry: ReactDOM.findDOMNode(this.select).value });
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#1A2637";

    getCOVIDInfo(testsURL)
      .then((testsBody) => {
        this.parseDataForCountry(testsBody, svg);

        return getCOVIDInfo(barbadosTestsURL);
      })
      .then((barbadosTestBody) => {
        this.parseDataForCountry(barbadosTestBody, bb);
      });
  }
  render() {
    return (
      <div className={"graph-style"}>
        <Form>
          <Form.Group controlId="caribbeanForm.SelectCustom">
            <Form.Label>Choose a country to view test data</Form.Label>
            <Form.Control
              ref={(select) => {
                this.select = select;
              }}
              as="select"
              custom
              onChange={this.handleChange}
              defaultValue={svg}
            >
              <option value={bb}>{bb}</option>
              <option value={svg}>{svg}</option>
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
            <Tooltip content={<TestsCustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey={this.t('tests')}
              stroke={testPageLineColour}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <Alert dismissable={true} key={1} variant={'secondary'} style={{color: 'gray', fontSize: '0.75rem',backgroundColor: '#273852', borderColor: '#273852', padding:'0.45rem', marginTop:'1rem'}}>
        {this.t('tests_disclaimer')} {this.state.selectedCountry === bb? this.t('credit_kevz') : svgCredit}
       </Alert>

       <Alert dismissable={true} key={1} variant={'secondary'} style={{color: 'gray', fontSize: '0.75rem',backgroundColor: '#273852', borderColor: '#273852', padding:'0.45rem', marginTop:'1rem'}}>
        Interested in volunteering for data entry? contact me on <Alert.Link href="https://www.twitter.com/janiquekajohn" target="_blank">Twitter</Alert.Link>
       </Alert>
      
      </div>
    );
  }
}

export default withTranslation()(TestsPage)
