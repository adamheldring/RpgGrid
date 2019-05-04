import React from "react";
import Board from "./Board";
import Toolbar from "./Toolbar";

const boardMargin = 20;
const tiles = ["", "rock", "water", "tree"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }

  state = {
    boxSide: 100,
    boardHeight: 0,
    boardWidth: 0,
    boxMatrix: []
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateBoardSize);
    this.updateBoardSize();
  }

  setBoxSide = updatedBoxSide => {
    this.setState(
      {
        boxSide: updatedBoxSide
      },
      () => this.updateBoxMatrix()
    );
  };

  updateBoardSize = () => {
    const { clientHeight, clientWidth } = this.boardRef.current;
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
    const { boardWidth, boardHeight, boxSide } = this.state;
    const nrOfBoxesWide = Math.floor(boardWidth / boxSide);
    const nrOfBoxesHigh = Math.floor(boardHeight / boxSide);

    let newBoxMatrix = [];
    for (let i = 0; i < nrOfBoxesHigh; i++) {
      newBoxMatrix.push(new Array(nrOfBoxesWide).fill(0));
    }
    this.setState({ boxMatrix: newBoxMatrix });
  };

  updateBoxMatrix = () => {
    const { boardWidth, boardHeight, boxMatrix, boxSide } = this.state;
    const nrOfBoxesWide = Math.floor(boardWidth / boxSide);
    const nrOfBoxesHigh = Math.floor(boardHeight / boxSide);
    const newMatrix = [...boxMatrix];

    // Push another box to each row if board is too wide
    if (nrOfBoxesWide > newMatrix[0].length) {
      // calcs diff after resize, pushing one tile at the time is to slow for a fast resize
      const boxesWideDiff = nrOfBoxesWide - newMatrix[0].length;
      for (let i = 0; i < boxesWideDiff; i++) {
        newMatrix.forEach(row => {
          row.push(0);
        });
      }
    }
    // Push row onto Matrix if board is too tall
    if (nrOfBoxesHigh > newMatrix.length) {
      const boxesHighDiff = nrOfBoxesHigh - newMatrix.length;
      for (let i = 0; i < boxesHighDiff; i++) {
        newMatrix.push(new Array(newMatrix[0].length).fill(0));
      }
    }
    this.setState({ boxMatrix: newMatrix });
  };

  handleBoxClick = (rowIndex, boxIndex) => {
    const newMatrix = [...this.state.boxMatrix];
    newMatrix[rowIndex][boxIndex] = (newMatrix[rowIndex][boxIndex] + 1) % 4;
    this.setState({ boxMatrix: newMatrix });
  };

  render() {
    const { boxSide, boardWidth, boardHeight, boxMatrix } = this.state;
    return (
      <div className="mainWrapper">
        <Toolbar
          boxSide={this.state.boxSide}
          setBoxSide={updatedBoxSide => this.setBoxSide(updatedBoxSide)}
        />
        <Board
          boardRef={this.boardRef}
          boxSide={boxSide}
          boardWidth={boardWidth}
          boardHeight={boardHeight}
          boxMatrix={boxMatrix}
          tiles={tiles}
          handleBoxClick={(rowIndex, boxIndex) =>
            this.handleBoxClick(rowIndex, boxIndex)
          }
        />
      </div>
    );
  }
}

export default App;
