import React, { Component } from "react";
import { Card,Accordion } from "react-bootstrap";
import emojiFlags from "emoji-flags";
import fetchCountryCode from "../../functions/fetchCountryCode";
import AccordionToggle from "../../components/AccordionToggle";
import { withTranslation } from "react-i18next";

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




class HighestActiveCard extends Component {

    constructor(props) {
        super(props);
        this.t=props.t
        this.state = {

          hideHighestActiveBox: false

        };
      }

      onClickHideHighest = () => {
        this.setState({ hideHighestActiveBox: true });
      };

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
                      {this.t('highest_active_cases')}
                      </AccordionToggle>
                      <Accordion.Collapse eventKey="1">
                        <div style={{ fontSize: 12 }}>
                          {this.props.highestActiveCases.map((caseEntry) => (
                            <div>
                              <b>{new Intl.NumberFormat().format(caseEntry.activeCases)}</b>{" "}
                              {
                                emojiFlags.countryCode(
                                  fetchCountryCode(caseEntry.caribbeanName)
                                ).emoji
                              }{" "}
                              {caseEntry.caribbeanName}
                            </div>
                          ))}
                          <div style={{ fontSize: "7px" }}>
                          {this.t('note_puerto_rico')}
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

export default withTranslation()(HighestActiveCard);






         