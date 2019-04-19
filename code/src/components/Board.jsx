import React from "react";
import Tile from "./Tile";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.board = React.createRef();
  }

  state = {
    boardHeight: 0,
    boardWidth: 0
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateBoardSize);
    this.updateBoardSize();
  }

  updateBoardSize = () => {
    const { clientHeight, clientWidth } = this.board.current;
    this.setState({
      boardWidth: clientWidth - 20,
      boardHeight: clientHeight - 20
    });
  };

  render() {
    const { boardWidth, boardHeight } = this.state;
    console.log(boardWidth, boardHeight);
    const boxSide = 100;
    const nrOfBoxesWide = Math.floor(boardWidth / boxSide);
    const nrOfBoxesHigh = Math.floor(boardHeight / boxSide);
    const nrOfCells =
      Math.floor(boardWidth / boxSide) * Math.floor(boardHeight / boxSide);
    const boxList = new Array(nrOfCells || 0).fill("");
    // const marginVertical = boardHeight - nrOfBoxesHigh * boxSide;

    return (
      <div className="gridWrapper" ref={this.board}>
        <div
          className="grid"
          style={{
            width: nrOfBoxesWide * boxSide + 1,
            height: nrOfBoxesHigh * boxSide
            // marginTop: marginVertical / 2
          }}
        >
          {/* {boxList.map(box => (
            <Tile boxSide />
          ))} */}
        </div>
      </div>
    );
  }
}

export default Board;
