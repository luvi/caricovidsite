import React, { Component } from "react";

export default class Credits extends Component {


  componentDidMount() {
    document.body.style.backgroundColor = "#1A2637";
  }

  render() {
    return (
      <div>
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            color: "white",
          }}
          className="sourcesContainer"
        >
          <div>
            Developer:
            <a href="https://twitter.com/JaniquekaJohn"> @JaniquekaJohn</a>
          </div>

          <div>
            Data Sources: Johns Hopkins, @KevzPolitics, Trinidad Express,
            Dominica News Online
          </div>
          <div>
            <a href="https://github.com/luvi/caricoviddata">
              Our own open source dataset
            </a>
          </div>
          <div>BVI News</div>
          <div> </div>
          <div></div>
          <div class="disclaimer">
            Disclaimer: Data shown on this site is for information purposes
            only, please keep update delays in mind.
          </div>
        </div>

        <div style={{
            display: "flex",
            margin: "auto",
            flexDirection: "column",
            position: "relative",
            color: "white",
            
          }}>
          <div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
            <h4>Fundraiser</h4>
          </div>
          <div>
            <div>Help a student in Dominica get connected</div>
          </div>
          <iframe
            style={{
              margin: "auto",
              maxHeight: "100%",
              width: "300px",
              height: "180px",
              border: "0px solid #cfcfcf",
            }}
            src="https://www.gofundme.com/f/student-axecess/widget/medium"
          ></iframe>
          <div
            class="gfm-embed"
            data-url="https://www.gofundme.com/f/student-axecess/widget/large"
          ></div>
        </div>
      </div>
    );
  }
}
