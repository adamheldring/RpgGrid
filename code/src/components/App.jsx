import React from "react";
import { DndProvider } from "react-dnd";
import TouchBackend from "react-dnd-touch-backend";
import Board from "./Board";
import Toolbar from "./Toolbar";

const boardMargin = 20;
const tiles = [
  { content: "" },
  { content: "rock" },
  { content: "water" },
  { content: "tree" }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
  }

  state = {
    boxSide: 100,
    boardHeight: 0,
    boardWidth: 0,
    boxMatrix: [],
    background: "grass",
    clickEnabled: false
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

  setBackground = updatedBackground => {
    this.setState({
      background: updatedBackground
    });
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

  handleTileDrop = (tileContent, tileTarget) => {
    let newMatrix = [...this.state.boxMatrix];
    let updatedValue;
    switch (tileContent) {
      case "rock": {
        updatedValue = 1;
        break;
      }
      case "water": {
        updatedValue = 2;
        break;
      }
      case "tree": {
        updatedValue = 3;
        break;
      }
      default: {
        updatedValue = 0;
      }
    }
    newMatrix[tileTarget.rowIndex][tileTarget.boxIndex] = updatedValue;
    this.setState({ boxMatrix: newMatrix });
  };

  toggleClickEnabled = () => {
    this.setState({ clickEnabled: !this.state.clickEnabled });
  };

  render() {
    const {
      boxSide,
      boardWidth,
      boardHeight,
      boxMatrix,
      background,
      clickEnabled
    } = this.state;
    return (
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <div
          className="mainWrapper"
          style={{
            backgroundImage: `url(./bg/${background}.jpeg)`
          }}
        >
          <Toolbar
            boxSide={this.state.boxSide}
            setBoxSide={updatedBoxSide => this.setBoxSide(updatedBoxSide)}
            background={background}
            setBackground={updatedBackground =>
              this.setBackground(updatedBackground)
            }
            tiles={tiles}
            handleTileDrop={(tileContent, tileTarget) =>
              this.handleTileDrop(tileContent, tileTarget)
            }
            clickEnabled={clickEnabled}
            toggleClickEnabled={this.toggleClickEnabled}
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
            clickEnabled={clickEnabled}
          />
        </div>
      </DndProvider>
    );
  }
}
export default App;
