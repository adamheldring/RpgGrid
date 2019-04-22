import React from "react";

const Tile = ({ boxSide, value }) => {
  return (
    <div
      className="grid__box"
      style={{ width: `${boxSide}px`, heigth: `${boxSide}px` }}
    >
      {value}
    </div>
  );
};

export default Tile;
