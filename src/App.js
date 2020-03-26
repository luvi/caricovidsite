import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import Map from './Map';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


export default class App extends Component {
  constructor(props) {
    super(props);
  
  }

  render() {
    return (
      <div className="App">
        <Router>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Link to="/"><Navbar.Brand>Caribbean COVID Map BETA</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
            <Link style={{color: "white"}} to="/credits">Credits</Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        
        
      <div>
   

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
          <Map />
          </Route>
          <Route path="/credits">
            <Credits />
          </Route>
        </Switch>
      </div>
    </Router>
    
      </div>
    );
  }
}


function Credits() {
  return (
    
    <div>
      <div style={{backgroundColor:"#1A2637", position:"fixed", height:"100%", width: "100%", color:"white"}}>
        
        

        
      </div>
      <div style={{flex:3, flexDirection: "column", position:"fixed", color: "white"}} className="statsContainer">
        <div>Developer: <a href="https://twitter.com/JaniquekaJohn">@JaniquekaJohn</a></div>
      <div>Disclaimer: Data shown on this site is for information purposes only, please keep update delays in mind.</div>
      <div> Data Sources: Johns Hopkins, @KevzPolitics</div> 
      <div>BVI News</div>
       </div>
      </div>

    
  );
}

