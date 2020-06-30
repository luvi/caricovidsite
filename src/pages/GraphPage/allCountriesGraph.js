import React, { Component } from "react";
import { LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend } from "recharts";

import {countryList} from "../../fullCountryList.js";



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
        <LineChart
        width={700}
        height={500}
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
        <Tooltip content={<CustomTooltip/>}/>
        <Legend />
        {countryList.map(country =>
             <Line
             type="monotone"
             dataKey={country}
             stroke={'#'+Math.floor(Math.random()*16777215).toString(16)}
             dot={false}
           />
          )}
      </LineChart>
      
    );
  }
}

export class CustomTooltip extends Component {

    render() {
        const { active } = this.props;
    
        if (active) {
          const { payload, label } = this.props;
          return (
            <div className="custom-tooltip">
              <p className="label">{`${label}`}</p>
            </div>
          );
        }
    
        return null;
      }
    }




