import React, { Component } from "react";
import { Card, Accordion } from "react-bootstrap";
import emojiFlags from "emoji-flags";
import fetchCountryCode from "../../functions/fetchCountryCode";
import AccordionToggle from "../../components/AccordionToggle";
import { withTranslation } from "react-i18next";
import "./Cards.css";

const cardStyle = {
  width: "260px",
  backgroundColor: "#1A2637",
  borderRadius: "1",
  marginTop: "0px",
};

const dismissMessageStyle = {
  color: "white",
  fontSize: "12px",
  fontWeight: "700",
  textDecoration: "none",
  cursor: "pointer",
  bordersize: "1px",
  borderColor: "white",
  marginTop: "0px",
  marginLeft: "95%",
};

const cardTextStyle = {
  fontSize: "15px",
  color: "white",
  padding: "0px",
  textDecoration: "none",
};

const cardBodyStyle = {
  paddingTop: "5px",
  paddingBottom: "5px",
  paddingRight: "5px",
  paddingLeft: "7px",
};

const dataStyle = {
  paddingBottom: "10px",
  fontSize: "10",
  paddingLeft: "1rem",
};

class ListCard extends Component {
  constructor(props) {
    super(props);
    this.t = props.t;
    this.state = {
      hideHighestActiveBox: false,
    };
  }

  onClickHideHighest = () => {
    this.setState({ hideHighestActiveBox: true });
  };

  render() {
    return (
      <div>
        {this.state.hideHighestActiveBox ? null : (
          <div className="statsCard">
            <Accordion>
              <Card type="rounded-0" style={cardStyle}>
                <Card.Body
                  className="div-only-mobile-cards"
                  style={cardBodyStyle}
                >
                  <Card.Text style={cardTextStyle}>
                    <div
                      style={dismissMessageStyle}
                      onClick={this.onClickHideHighest}
                    >
                      x
                    </div>
                    <AccordionToggle eventKey="1" style={cardTextStyle}>
                      {this.props.title}
                    </AccordionToggle>
                    <Accordion.Collapse eventKey="1">
                      <div style={dataStyle}>
                        {this.props.cases?.map((caseEntry) => (
                          <div>
                            <b>
                              {new Intl.NumberFormat().format(
                                caseEntry[this.props.param]
                              )}
                            </b>{" "}
                            {fetchCountryCode(caseEntry.country) &&
                              emojiFlags.countryCode(
                                fetchCountryCode(caseEntry.country)
                              ).emoji}
                            {caseEntry.country}
                          </div>
                        ))}
                      </div>
                    </Accordion.Collapse>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Accordion>
          </div>
        )}
      </div>
    );
  }
}

export default withTranslation()(ListCard);
