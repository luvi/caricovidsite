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
          <Card.Body className="div-only-mobile-cards">
            <Card.Text style={cardTextStyle}>
              {this.props.totalActiveCases && <div>
                {this.t("active_cases")}: <b>{this.props.totalActiveCases}</b>
              </div>}
              <div>
                {this.t("deaths")}: <b>{this.props.totalDeaths}</b>
              </div>
              {this.props.totalCritical && <div>
                {this.t("critical_condition")}: <b>{this.props.totalCritical}</b>
              </div>}
              <div>
                {this.t("confirmed_cases")}: <b>{this.props.total}</b>
              </div>


            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withTranslation()(StatsCard);
