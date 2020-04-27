import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import Map from "./Map";
import Credits from "./Credits";
import GraphPage from "./GraphPage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Link to="/">
              <Navbar.Brand>Caribbean COVID Map</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
            <Link style={{color: "white"}} to="/graphs">Case Graphs</Link>
            </Nav.Item>
            <Nav.Item>
          ""
            </Nav.Item>
            <Nav.Item>
            <Link style={{color: "white"}} to="/credits">Credits</Link>
            </Nav.Item>


            
              
              
            
            </Nav>
          </Navbar>

          <div>
            <Switch>
              <Route exact path="/">
                <Map />
              </Route>
              <Route path="/credits">
                <Credits />
              </Route>
              <Route path="/graphs">
                <GraphPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
