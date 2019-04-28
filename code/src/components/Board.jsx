import React from "react";
import Tile from "./Tile";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.board = React.createRef();
  }

  state = {
    boardHeight: 0,
    boardWidth: 0,
    boxMatrix: []
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateBoardSize);
    this.updateBoardSize();
  }

  updateBoardSize = () => {
    const { clientHeight, clientWidth } = this.board.current;
    this.setState(
      {
        boardWidth: clientWidth - 20,
        boardHeight: clientHeight - 20
      },
      () => {
        if (this.state.boxMatrix.length === 0) this.createBoxMatrix();
      }
    );
  };

  createBoxMatrix = () => {
    const { boardWidth, boardHeight } = this.state;
    const { boxSide } = this.props;
    const nrOfBoxesWide = Math.floor(boardWidth / boxSide);
    const nrOfBoxesHigh = Math.floor(boardHeight / boxSide);

    // this.setState({ boxMatrix: [["test"]] });
    let newBoxMatrix = [];
    let newBoxRow = [];
    for (let i = 0; i < nrOfBoxesWide; i++) {
      newBoxRow.push(i);
    }
    for (let i = 0; i < nrOfBoxesHigh; i++) {
      newBoxMatrix.push(newBoxRow);
    }
    console.table(newBoxMatrix);
    this.setState({ boxMatrix: newBoxMatrix });
  };

  updateBoxMatrix = boxSide => {
    // const { boardWidth, boardHeight } = this.state;
    // const nrOfCells =
    //   Math.floor(boardWidth / boxSide) * Math.floor(boardHeight / boxSide);
    // const boxMatrix = new Array(nrOfCells || 0).fill("");
    // return boxMatrix;
    // return this.state.boxMatrix;
  };

  render() {
    const { boardWidth, boardHeight, boxMatrix } = this.state;
    const { boxSide } = this.props;
    const nrOfBoxesWide = Math.floor(boardWidth / boxSide);
    const nrOfBoxesHigh = Math.floor(boardHeight / boxSide);

    return (
      <div className="gridWrapper" ref={this.board}>
        <div
          className="grid"
          style={{
            width: nrOfBoxesWide * boxSide,
            height: nrOfBoxesHigh * boxSide,
            gridTemplateColumns: `repeat(auto-fill, ${boxSide}px)`,
            gridTemplateRows: `repeat(auto-fill, ${boxSide}px)`
          }}
        >
          {boxMatrix.map((row, rowIndex) => {
            if (rowIndex < nrOfBoxesHigh) {
              return row.map((box, boxIndex) => {
                if (boxIndex < nrOfBoxesWide) {
                  return <Tile boxSide={boxSide} value={box} />;
                } else {
                  return null;
                }
              });
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }
}

export default Board;
