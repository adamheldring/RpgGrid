import React from "react";
import Board from "./Board";
import Toolbar from "./Toolbar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Toolbar />
        <Board />
      </div>
    );
  }
}

export default App;
