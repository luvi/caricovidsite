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



export default class UpdatedCard extends Component {


    render(){
        return(
<div className="statsCard">
    <Card type="rounded-0" style={cardStyle}>
      <Card.Body>
        <Card.Text style={cardTextStyle}>
          <div>
            Updated: <b>{this.props.date}</b>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
    

        )


    }

    
}