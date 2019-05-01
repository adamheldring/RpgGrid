import React from "react";

const Tile = ({ rowIndex, boxIndex, boxSide, value, handleBoxClick }) => {
  return (
    <div
      className="grid__box"
      onClick={() => handleBoxClick(rowIndex, boxIndex)}
      style={{ width: `${boxSide}px`, heigth: `${boxSide}px` }}
    >
      {value}
    </div>
  );
};

export default Tile;
