import React from "react";
import Board from "./Board";
import Toolbar from "./Toolbar";

class App extends React.Component {
  state = {
    boxSide: 100
  };

  setBoxSide = updatedBoxSide => {
    this.setState({
      boxSide: updatedBoxSide
    });
  };

  render() {
    return (
      <div className="mainWrapper">
        <Toolbar
          boxSide={this.state.boxSide}
          setBoxSide={updatedBoxSide => this.setBoxSide(updatedBoxSide)}
        />
        <Board boxSide={this.state.boxSide} />
      </div>
    );
  }
}

export default App;
