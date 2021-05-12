import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Map from "../pages/MapPage/Map";
import Credits from "../pages/CreditsPage/Credits";
import GraphPage from "../pages/GraphPage/GraphPage";
import TestsPage from "../pages/TestsPage/TestsPage";
import Testing from "../pages/TestingPage/Testing";

export default () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(null);

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setLang(languageCode);
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
                  href="/tests"
                >
                  {t("tests_title")}
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
                <NavDropdown title="Language" id="basic-nav-dropdown">
                  <NavDropdown.Item >
                    <Nav.Link
                      style={{ color: "black", paddingRight: 10 }}
                      onClick={() => changeLanguage("en")}
                    >
                      {t("language_english")}
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item >
                    <Nav.Link
                      style={{ color: "black", paddingRight: 10 }}
                      onClick={() => changeLanguage("fr")}
                    >
                      {t("language_french")}
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
            <Route
              path="/credits"
              render={(props) => <Credits {...props} Lang={lang} />}
            />
            <Route path="/graphs" component={GraphPage} />
            <Route path="/tests" component={TestsPage} />
            <Route path="/testing" component={Testing} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
