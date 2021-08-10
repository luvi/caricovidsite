import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import "./Cards.css";

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

const disclaimerStyle = {
  fontSize: "10px",
  color: "white",
  padding: "0px",
};

class UpdatedCard extends Component {
  constructor(props) {
    super(props);
    this.t = props.t;
  }
  render() {
    return (
      <div className="statsCard">
        <Card type="rounded-0" style={cardStyle}>
          <Card.Body className="div-only-mobile-cards">
            <Card.Text  style={cardTextStyle}>
              <div>
                {this.t("updated")}: <b>{this.props.date}</b>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withTranslation()(UpdatedCard);
