import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

const Credits = () => {

  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.body.style.backgroundColor = "#1A2637";
  }, []);

  return (
    <div
      style={{
        marginTop: "100px",
      }}
    >
      <Card
        style={{
          backgroundColor: "#1A2637",
          color: "white",
          border: "none",
        }}
      >
        <Card.Body>
          <Card.Title>This project has been made possible by </Card.Title>
          <Card.Text>
            {t("developer")}:{" "}
            <a href="https://twitter.com/JaniquekaJohn">
              {t("twitter_handle")}
            </a>{" "}
            <br />
            <a href="https://github.com/luvi/caricovidsite">
              {t("github_contributors")}
            </a>{" "}
            <br/>
            {t("data_sources")}
            , Mathieu, E., Ritchie, H., Ortiz-Ospina, E. et al. A global
            database of COVID-19 vaccinations. Nat Hum Behav (2021).
            https://doi.org/10.1038/s41562-021-01122-8
            <br />
            <a href="https://github.com/luvi/caricoviddata">
              {t("own_data_set")}
            </a>
            <br />
            {t("bvi_news")}
            <div class="disclaimer">{t("credits_disclaimer")}</div>
            <div>
                {t("note_puerto_rico")}
              </div>
              <div>
                Note that segregated data for St.Vincent and the Grenadines administered vaccine doses is not currently available.
            </div>
          </Card.Text>
          <Button variant="dark" href="https://www.buymeacoffee.com/mekeilia" target="_blank">Support the developer</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Credits;
