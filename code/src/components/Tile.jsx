import React from "react";

const Tile = ({
  rowIndex,
  boxIndex,
  boxSide,
  value,
  handleBoxClick,
  tiles
}) => {
  return (
    <div
      className="grid__box"
      onClick={() => handleBoxClick(rowIndex, boxIndex)}
      style={{
        width: `${boxSide}px`,
        heigth: `${boxSide}px`
      }}
    >
      {value > 0 && (
        <img
          className="grid__box--image"
          src={`./tiles/${tiles[value]}.png`}
          alt="Tile"
        />
      )}
    </div>
  );
};

export default Tile;
