import React, { Component } from "react";
import { Card,Accordion } from "react-bootstrap";
import emojiFlags from "emoji-flags";
import fetchCountryCode from "../../functions/fetchCountryCode";
import AccordionToggle from "../../components/AccordionToggle";

const cardStyle = {
    width: "260px",
    backgroundColor: "#1A2637",
    borderRadius: "1",
    marginTop: "0px",
  };
  
  const dismissMessageStyle = {
    color: "white",
    fontSize: "11px",
    textDecoration: "none",
    cursor: "pointer",
    bordersize: "1px",
    borderColor: "white",
    marginTop: "0px",
    marginLeft: "80%",
  };
  
  const cardTextStyle = {
    fontSize: "15px",
    color: "white",
    padding: "0px",
  };



export default class HighestActiveCard extends Component {

    constructor(props) {
        super(props);
        this.state = {

          hideLowestActiveBox: false

        };
      }


    render(){
        return(
            <div>
             {this.state.hideHighestActiveBox ? null : (
            <div className="statsCard">
              <Accordion>
                <Card type="rounded-0" style={cardStyle}>
                  <Card.Body>
                    <Card.Text style={cardTextStyle}>
                      <div
                        style={dismissMessageStyle}
                        onClick={this.onClickHideHighest}
                      >
                        x
                      </div>
                      <AccordionToggle eventKey="1" style={cardTextStyle}>
                        Highest Active Cases
                      </AccordionToggle>
                      <Accordion.Collapse eventKey="1">
                        <div style={{ fontSize: 12 }}>
                          {this.props.highestActiveCases.map((caseEntry) => (
                            <div>
                              <b>{caseEntry.activeCases}</b>{" "}
                              {
                                emojiFlags.countryCode(
                                  fetchCountryCode(caseEntry.caribbeanName)
                                ).emoji
                              }{" "}
                              {caseEntry.caribbeanName}
                            </div>
                          ))}
                          <div style={{ fontSize: "7px" }}>
                            Note that Puerto Rico is excluded as we do not have
                            their recovery data
                          </div>
                        </div>
                      </Accordion.Collapse>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Accordion>
            </div>
          )}
            </div>
            
    

        )


    }

    
}








         