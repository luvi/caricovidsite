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
