import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Outlet, useLocation } from "react-router-dom";

import Map2 from "../pages/MapPage/Map";

export default () => {
  const { t, i18n } = useTranslation();
  //const [lang, setLang] = useState(null);
  const [selected, setSelected] = useState("");

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  const handleSelect = (eventKey) => {

    setSelected(eventKey.toString());

  }

  const location = useLocation();


  return (
    <div className="App">
      <Navbar
        className={"header-color"}
        variant="dark"
        expand="lg"
        fixed="top"
      >

        <Navbar.Brand><Nav.Link className="brand" href="/" eventKey="link-0">{t("title")}</Nav.Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="pills" className="justify-content-end" activeKey={selected} onSelect={handleSelect}>
            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                style={{ color: "white", paddingRight: 10 }}
                href="/vaccination"
              >
                {t("vaccines_title")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-5"
                style={{ color: "white", paddingRight: 10 }}
                href="/deaths"
              >
                {t("deaths_title")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
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
              <Nav.Link eventKey="link-3" style={{ color: "white" }} href="/credits">
                {t("credits")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <NavDropdown title={t("language")} id="basic-nav-dropdown">
                <NavDropdown.Item >
                  <Nav.Link
                    eventKey="link-4"
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
                <NavDropdown.Item >
                  <Nav.Link
                    style={{ color: "black", paddingRight: 10 }}
                    onClick={() => changeLanguage('es')}
                  >
                    es
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {location.pathname === '/' ? <Map2 /> : <Outlet />}
    </div>
  );
};
