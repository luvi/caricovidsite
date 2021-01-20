import React, { Component } from "react";

export class CustomTooltip extends Component {
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
                <p className="desc">{`${payload[0].value} confirmed case(s), ${payload[1].value} active case(s), ${payload[2].value} total deaths `}</p>
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
  