import React, { Component } from "react";

export default class Map extends Component {
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
          <a href="https://twitter.com/JaniquekaJohn">@JaniquekaJohn</a>
        </div>
        <div>
          Disclaimer: Data shown on this site is for information purposes only,
          please keep update delays in mind.
        </div>
        <div> Data Sources: Johns Hopkins, @KevzPolitics</div>
        <div>BVI News</div>
        <div>
          <a href="https://t.co/beIX5FprqY">
            A COVID-19 patient has died - Trinidad Express
          </a>
        </div>
        <div>
          <a href="https://dominicanewsonline.com/news/homepage/homepage-carousel/eleven-confirmed-cases-of-coronavirus-in-dominica-four-to-be-retested/">
            Eleven confirmed cases of coronavirus in Dominica
          </a>
        </div>
        <div>Notice: Panama and Venezuela have been removed from the total count.</div>
      </div>
    </div>)
  }
}
