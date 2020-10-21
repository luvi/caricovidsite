import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import Map from "../pages/MapPage/Map";
import Credits from "../pages/CreditsPage/Credits";
import GraphPage from "../pages/GraphPage/GraphPage";

import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Link to="/">
              <Navbar.Brand>Caribbean COVID Map</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                  <NavLink style={{color: "white", paddingRight: 10}} to="/graphs">Case Graphs</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <Link style={{color: "white"}} to="/credits">Credits</Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <div>
            <Switch>
              <Route exact path="/" component={Map}/>
              <Route path="/credits" component={Credits}/>     
              <Route path="/graphs" component={GraphPage}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
