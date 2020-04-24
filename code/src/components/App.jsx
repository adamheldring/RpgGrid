import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import MultiBackend, { TouchTransition } from "react-dnd-multi-backend";
import Board from "./Board";
import Toolbar from "./Toolbar";

const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition
    }
  ]
};

const boardMargin = 20;
const tiles = [
  { content: "" },
  { content: "water-sq" },
  { content: "lava-sq" },
  { content: "stone-sq" },
  { content: "cryptic-sq" },
  { content: "stairs" },
  { content: "barrel" },
  { content: "tree-1" },
  { content: "tree-2" },
  { content: "rock-1" },
  { content: "rock-2" }
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
    locked: false
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

  handleBoxClear = (rowIndex, boxIndex) => {
    const newMatrix = [...this.state.boxMatrix];
    newMatrix[rowIndex][boxIndex] = 0;
    this.setState({ boxMatrix: newMatrix });
  };

  handleTileDrop = (tileContent, tileTarget) => {
    let newMatrix = [...this.state.boxMatrix];
    let updatedValue = tiles.indexOf(
      tiles.find(tile => tile.content === tileContent)
    );
    if (!updatedValue > 0) updatedValue = 0;
    newMatrix[tileTarget.rowIndex][tileTarget.boxIndex] = updatedValue;
    this.setState({ boxMatrix: newMatrix });
  };

  // TODO - handleDeleteDrop

  toggleLocked = () => {
    this.setState({ locked: !this.state.locked });
  };

  render() {
    const {
      boxSide,
      boardWidth,
      boardHeight,
      boxMatrix,
      background,
      locked
    } = this.state;
    return (
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
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
            locked={locked}
            toggleLocked={this.toggleLocked}
          />
          <Board
            boardRef={this.boardRef}
            boxSide={boxSide}
            boardWidth={boardWidth}
            boardHeight={boardHeight}
            boxMatrix={boxMatrix}
            tiles={tiles}
            handleBoxClear={(rowIndex, boxIndex) =>
              this.handleBoxClear(rowIndex, boxIndex)
            }
            locked={locked}
          />
        </div>
      </DndProvider>
    );
  }
}
export default App;
