import React, { Component } from "react";
import { LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend } from "recharts";

import {countryList} from "./fullCountryList.js";



export default class AllCountriesGraph extends Component {

	constructor(props) {
    super(props);
    this.state = {
        data: this.props.countryData[0]
        
      };
    
  }
  
  componentDidMount(){

    console.log(!!this.state.data[0] ? this.state.data[0]["name"] : "");
    console.log(this.state.data);
    this.setState({data: this.props.countryData[0]})
  }

 


 
  
  render() {
    

    return (
    
    <div>
        Coming soon
        {/* <LineChart
        width={1000}
        height={700}
        data={this.state.data}
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
        {countryList.map(country =>
             <Line
             type="monotone"
             dataKey={country}
             stroke="#82ca9d"
             dot={false}
           />
          )}
      </LineChart> */}
      </div>
    );
  }
}


