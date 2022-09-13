import React, { Component } from "react";
import { SyncLoader } from "react-spinners";
import { Container } from "react-bootstrap";

// Para mais infos: https://www.npmjs.com/package/react-spinners

class BounceLoading extends Component {
  render() {
    return (
      <Container className="text-center" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <SyncLoader loading={true} color="#00a99d" />
      </Container>
    );
  }
}

export default BounceLoading;
