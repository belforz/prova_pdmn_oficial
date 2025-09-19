import React from "react";
import LembreteEntrada from "./LembreteEntrada";

class App extends React.Component {
  render() {
    return (
      <>
        <div className="card">
          <div className="card-body">
            <div className="col-12"></div>
            <LembreteEntrada />
          </div>
        </div>
      </>
    );
  }
}

export default App;
