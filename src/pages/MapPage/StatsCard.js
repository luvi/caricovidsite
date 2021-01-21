import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { withTranslation } from "react-i18next";

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

class StatsCard extends Component {
  constructor(props) {
    super(props);
    this.t = props.t;
  }

  render() {
    return (
      <div className="statsCard">
        <Card type="rounded-0" style={cardStyle}>
          <Card.Body>
            <Card.Text style={cardTextStyle}>
              <div>
                {this.t("active_cases")}: <b>{this.props.totalActiveCases}</b>{" "}
              </div>
              <div>
                {this.t("confirmed_cases")}: <b>{this.props.total}</b>
              </div>
              <div>
                {this.t("deaths")}: <b>{this.props.totalDeaths}</b>
              </div>
              <div style={{ fontSize: "7px" }}>
                {this.t("note_puerto_rico")}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withTranslation()(StatsCard);
