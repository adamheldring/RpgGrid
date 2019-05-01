import React from "react";
import Tile from "./Tile";

const boardMargin = 20;

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
        boardWidth: clientWidth - boardMargin,
        boardHeight: clientHeight - boardMargin
      },
      () => {
        if (this.state.boxMatrix.length === 0) {
          this.createBoxMatrix();
        } else {
          this.updateBoxMatrix();
        }
      }
    );
  };

  createBoxMatrix = () => {
    const { boardWidth, boardHeight } = this.state;
    const { boxSide } = this.props;
    const nrOfBoxesWide = Math.floor(boardWidth / boxSide);
    const nrOfBoxesHigh = Math.floor(boardHeight / boxSide);

    let newBoxMatrix = [];
    for (let i = 0; i < nrOfBoxesHigh; i++) {
      newBoxMatrix.push(new Array(nrOfBoxesWide).fill(null));
    }
    this.setState({ boxMatrix: newBoxMatrix });
  };

  updateBoxMatrix = () => {
    const { boardWidth, boardHeight, boxMatrix } = this.state;
    const { boxSide } = this.props;
    const nrOfBoxesWide = Math.floor(boardWidth / boxSide);
    const nrOfBoxesHigh = Math.floor(boardHeight / boxSide);
    const newMatrix = [...boxMatrix];

    // Push another box to each row if board is too wide
    if (nrOfBoxesWide > newMatrix[0].length) {
      // calcs diff after resize, pushing one tile at the time is to slow for a fast resize
      const boxesWideDiff = nrOfBoxesWide - newMatrix[0].length;
      for (let i = 0; i < boxesWideDiff; i++) {
        newMatrix.forEach(row => {
          row.push(null);
        });
      }
    }
    // Push row onto Matrix if board is too tall
    if (nrOfBoxesHigh > newMatrix.length) {
      const boxesHighDiff = nrOfBoxesHigh - newMatrix.length;
      for (let i = 0; i < boxesHighDiff; i++) {
        newMatrix.push(new Array(newMatrix[0].length).fill(null));
      }
    }
    this.setState({ boxMatrix: newMatrix });
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
                  return <Tile boxSide={boxSide} value={box} key={boxIndex} />;
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
