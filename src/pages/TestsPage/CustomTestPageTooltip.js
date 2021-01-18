import React, { Component } from "react";

export class TestsCustomTooltip extends Component {
    render() {
      const { active } = this.props;
  
      if (active) {
        const { payload, label } = this.props;
        return (
          <div>
            {" "}
            {!!payload ? (
              <div className="custom-tooltip">
                <p className="label">{`${label}`}</p>
                <p className="desc">{`${payload[0].value} tests completed`}</p>
              </div>
            ) : (
              <div> </div>
            )}{" "}
          </div>
        );
      }
  
      return null;
    }
  }