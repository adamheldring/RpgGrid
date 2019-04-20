import React from "react";

const Tile = ({ boxSide }) => {
  console.log(boxSide);
  return (
    <div
      className="grid__box"
      style={{ width: `${boxSide}px`, heigth: `${boxSide}px` }}
    />
  );
};

export default Tile;
