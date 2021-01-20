import React, { Component } from "react";
import { Card } from "react-bootstrap";

const cardStyle = {
    width: "260px",
    backgroundColor: "#1A2637",
    borderRadius: "1",
    marginTop: "0px",
  };
  
  const cardTextStyle = {
    fontSize: "15px",
    color: "white",
    padding: "0px",
  };



export default class StatsCard extends Component {


    render(){
        return(

<div className="statsCard">

            <Card type="rounded-0" style={cardStyle}>
              <Card.Body>
                <Card.Text style={cardTextStyle}>
                  <div>
                    Active Cases: <b>{this.props.totalActiveCases}</b>{" "}
                  </div>
                  <div>
                    Confirmed Cases: <b>{this.props.total}</b>
                  </div>
                  <div>
                    Deaths: <b>{this.props.totalDeaths}</b>
                  </div>
                  <div style={{ fontSize: "7px" }}>
                    *Note that Puerto Rico is now excluded from active case
                    count as we do not have their recovery data
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
    

        )


    }

    
}