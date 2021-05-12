import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import UploadImageToS3WithReactS3 from "./UploadImageToS3WithReactS3";

const data = [];

class TestingPage extends Component {
  constructor(props) {
    super(props);
    this.t = props.t;
    this.state = {
      data: []
    };
  }



  componentDidMount() {
   
  }

  render() {
    return (
      <div style={{marginTop: '200px'}}><UploadImageToS3WithReactS3></UploadImageToS3WithReactS3></div>
    );
  }
}

export default withTranslation()(TestingPage);
