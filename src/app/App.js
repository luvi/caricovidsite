import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Map from "../pages/MapPage/Map";
import Map2 from "../pages/MapPage/Map2"
import Credits from "../pages/CreditsPage/Credits";
import GraphPage from "../pages/GraphPage/GraphPage";
import VaccinePage from "../pages/VaccinePage/VaccinePage";
import i18n from "../locales";

export default () => {
  const { t } = useTranslation();
  //const [lang, setLang] = useState(null);

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          className={"header-color"}
          variant="dark"
          expand="lg"
          fixed="top"
        >
          <Link to="/">
            <Navbar.Brand>{t("title")}</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" activeKey="/home">
              <Nav.Item>
                <Nav.Link
                  style={{ color: "white", paddingRight: 10 }}
                  href="/vaccination"
                >
                  {t("vaccines_title")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  style={{ color: "white", paddingRight: 10 }}
                  href="/graphs"
                >
                  {t("case_graphs")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <div> </div>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{ color: "white" }} href="/credits">
                  {t("credits")}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <NavDropdown title={t("language")} id="basic-nav-dropdown">
                  <NavDropdown.Item >
                    <Nav.Link
                      style={{ color: "black", paddingRight: 10 }}
                      onClick={() => i18n.changeLanguage("en")}
                    >
                      {t("language_english")}
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
                    <Nav.Link
                      style={{ color: "black", paddingRight: 10 }}
                      onClick={() => i18n.changeLanguage("fr")}
                    >
                      {t("language_french")}
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
                    <Nav.Link
                      style={{ color: "black", paddingRight: 10 }}
                      onClick={() => i18n.changeLanguage('es')}
                    >
                      es
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div>
          <Switch>
            <Route exact path="/" component={Map} />
            <Route exact path="/mapsecret" component={Map2} />
            <Route
              path="/credits"
              render={(props) => <Credits {...props} />}
            />
            <Route path="/graphs"> <GraphPage /> </Route>
            <Route path="/vaccination" component={VaccinePage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
