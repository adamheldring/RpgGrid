import React from "react";

const Tile = ({ boxSide }) => {
  return (
    <div className="grid__box" style={{ width: boxSide, heigth: boxSide }}>
      Tile Content
    </div>
  );
};

export default Tile;
