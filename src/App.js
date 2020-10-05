import React, { Component, Fragment } from "react";
import PreviewPanel from "./containers/PreviewPanel";
import StylesPanel from "./containers/StylesPanel";

class App extends Component {
  render() {
    return (
      <Fragment>
        <StylesPanel></StylesPanel>
        <PreviewPanel></PreviewPanel>        
      </Fragment>
    );
  }
}

export default App;
