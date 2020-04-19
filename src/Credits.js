import React, { Component } from "react";

export default class Credits extends Component {
  render() {
      return(
    <div>
      <div
        style={{
          backgroundColor: "#1A2637",
          position: "fixed",
          height: "100%",
          width: "100%",
          color: "white"
        }}
      ></div>
      <div
        style={{
          flex: 3,
          flexDirection: "column",
          position: "fixed",
          color: "white"
        }}
        className="sourcesContainer"
      >
        <div>
          Developer: 
          <a href="https://twitter.com/JaniquekaJohn"> @JaniquekaJohn</a>
        </div>
       
        <div> Data Sources: Johns Hopkins, @KevzPolitics, Trinidad Express, Dominica News Online</div>
        <div><a href="https://github.com/luvi/caricoviddata">Our own open source dataset</a></div>
        <div>BVI News</div>
        <div>  </div>
        <div>  </div>
        <div class="disclaimer">Disclaimer: Data shown on this site is for information purposes only,
          please keep update delays in mind.</div>
      </div>
    </div>)
  }
}
