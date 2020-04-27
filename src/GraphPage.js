import React, { Component } from "react";
import isCaribbeanCountry from './isCaribbeanCountry'
import getCOVIDInfo from "./fetchFromURL";
import parse from 'csv-parse'
import { Form } from "react-bootstrap";
import ReactDOM from 'react-dom'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const url =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
 const data = [];
  const datax = [
  {
    name: "Page A",
    confirmed: 4000,
    deaths: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    confirmed: 3000,
    deaths: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    confirmed: 2000,
    deaths: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    confirmed: 2780,
    deaths: 3908,
    amt: 200,
  },
  {
    name: "Page E",
    confirmed: 1890,
    deaths: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    confirmed: 2390,
    deaths: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    confirmed: 3490,
    deaths: 4300,
    amt: 2100,
  },
];

export default class GraphPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
         data: [],
         selectedCountry: "Barbados"
      };
  }

  handleChange = (option) => {
      this.setState({ selectedCountry: ReactDOM.findDOMNode(this.select).value})
  }

  getData = () => {

    console.log(this.state.data)
    return this.state.data['Barbados']

  }
  componentDidMount() {

    document.body.style.backgroundColor = "#1A2637";

    getCOVIDInfo(url, (body) => {
      //readJohnsCSV
      console.log("developer: @JaniquekaJohn, data: Johns Hopkins");

      parse(body, (err, output) => {
        const arr = output;
        let size = arr[0].length; //latest entry
        this.setState({ date: arr[0][size - 1] }); //date of latest entry

        let johnsHopkinsData = arr.filter(isCaribbeanCountry);
        let labels = arr[0];
      
        
        for (let i=0; i<johnsHopkinsData.length; i++){
            
            let inner = []

            for (let j=4; j<labels.length; j++){

                let rex = []
                rex["name"] = labels[j]
                rex["Confirmed cases"] = parseInt(johnsHopkinsData[i][j])
                
                inner.push(rex)
            }

           let cname = johnsHopkinsData[i][0] === "" ? johnsHopkinsData[i][1] : johnsHopkinsData[i][0]

           data[cname] = inner;
          
          
        }

        this.setState({data})
        console.log(data)
        
      });
    });
  }
  render() {
    return (
      <div
        style={{
          display:"flex",
          marginTop:100,
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          position: "relative",
          color: "white",

        }}
       
      >

<Form>
  <Form.Group controlId="exampleForm.SelectCustom">
    <Form.Label>Choose a country</Form.Label>
    <Form.Control ref={select => { this.select = select }} as="select"custom onChange={this.handleChange}>
      
      <option value="Barbados">Barbados</option>
      <option value="Jamaica">Jamaica</option>

    </Form.Control>
  </Form.Group>
</Form>

        <LineChart
          width={700}
          height={500}
          data={this.state.data[this.state.selectedCountry]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Confirmed cases"
            stroke="#82ca9d"
            dot={false}
          />
        </LineChart>
        <div class="disclaimer">Data source: JHU, updated once per day</div>
      </div>
    );
  }
}
