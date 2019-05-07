import React from "react";
import { DropTarget } from "react-dnd";

const tileTarget = {
  drop(props, monitor, component) {
    return {
      rowIndex: props.rowIndex,
      boxIndex: props.boxIndex
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    tile: monitor.getItem()
  };
}

const Tile = props => {
  const {
    rowIndex,
    boxIndex,
    boxSide,
    value,
    handleBoxClick,
    tiles,
    clickEnabled
  } = props;
  const { connectDropTarget, hovered } = props;
  const backgroundColor = hovered ? "lightgreen" : "";

  return connectDropTarget(
    <div
      onClick={clickEnabled && (() => handleBoxClick(rowIndex, boxIndex))}
      className="grid__box"
      style={{
        width: `${boxSide}px`,
        heigth: `${boxSide}px`,
        backgroundColor: `${backgroundColor}`
      }}
    >
      {value > 0 && (
        <img
          className="grid__box--image"
          src={`./tiles/${tiles[value].content}.png`}
          alt="Tile"
        />
      )}
    </div>
  );
};

export default DropTarget("tile", tileTarget, collect)(Tile);
