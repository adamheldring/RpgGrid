import React from "react";
import Tile from "./Tile";

class Board extends React.Component {
  state = {
    vpHeight: 0,
    vpWidth: 0
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowSize);
    this.updateWindowSize();
  }

  updateWindowSize = () => {
    this.setState({
      vpWidth: window.innerWidth - 10,
      vpHeight: window.innerHeight - 10
    });
  };

  render() {
    const { vpWidth, vpHeight } = this.state;
    const boxSide = 100;
    const nrOfBoxesWide = Math.floor(vpWidth / boxSide);
    const nrOfBoxesHigh = Math.floor(vpHeight / boxSide);
    const nrOfCells =
      Math.floor(vpWidth / boxSide) * Math.floor(vpHeight / boxSide);
    const boxList = new Array(nrOfCells || 0).fill("");
    const marginVertical = vpHeight - nrOfBoxesHigh * boxSide;

    console.log("window.innerWidth: ", window.innerWidth);
    console.log("window.innerHeight: ", window.innerHeight);

    return (
      <div
        className="mainWrapper"
        style={{ width: vpWidth + 10, height: vpHeight + 10 }}
      >
        <div
          className="grid"
          style={{
            width: nrOfBoxesWide * boxSide + 1,
            height: nrOfBoxesHigh * boxSide,
            marginTop: marginVertical / 2
          }}
        >
          {boxList.map(box => (
            <Tile boxSide />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
