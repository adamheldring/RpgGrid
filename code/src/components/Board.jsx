import React from "react";
import Tile from "./Tile";

const Board = ({ boxSide, boardWidth, boardHeight, boxMatrix, boardRef }) => {
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
};

export default Board;
