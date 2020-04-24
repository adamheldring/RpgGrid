import React from "react";
import TileWrapper from "./Tile/TileWrapper";

const Board = ({
  boxSide,
  boardWidth,
  boardHeight,
  boxMatrix,
  tiles,
  boardRef,
  handleBoxClear,
  locked
}) => {
  const nrOfBoxesWide = Math.floor(boardWidth / boxSide);
  const nrOfBoxesHigh = Math.floor(boardHeight / boxSide);

  return (
    <div className="gridWrapper" ref={boardRef}>
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
                return (
                  <TileWrapper
                    rowIndex={rowIndex}
                    boxIndex={boxIndex}
                    boxSide={boxSide}
                    value={box}
                    tiles={tiles}
                    key={boxIndex}
                    handleBoxClear={(rowIndex, boxIndex) =>
                      handleBoxClear(rowIndex, boxIndex)
                    }
                    locked={locked}
                  />
                );
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
};

export default Board;
