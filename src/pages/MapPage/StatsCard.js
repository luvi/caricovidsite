import React from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

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

const StatsCard  = ({totalActiveCases, totalCritical, totalDeaths, total}) => {

    const {t} = useTranslation();
    
    return (
      <div className="statsCard">
        <Card type="rounded-0" style={cardStyle}>
          <Card.Body className="div-only-mobile-cards">
            <Card.Text style={cardTextStyle}>
              {totalActiveCases && <div>
                {t("active_cases")}: <b>{totalActiveCases}</b>
              </div>}
              <div>
                {t("deaths")}: <b>{totalDeaths}</b>
              </div>
              {totalCritical && <div>
                {t("critical_condition")}: <b>{totalCritical}</b>
              </div>}
              <div>
                {t("confirmed_cases")}: <b>{total}</b>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

export default StatsCard;
