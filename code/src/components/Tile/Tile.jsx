import React from "react";
import { DropTarget, DragSource } from "react-dnd";
import OccupiedTileContent from "./OccupiedTileContent";

// TILE AS DROP TARGET FOR CREATE
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
    locked
  } = props;
  const { connectDropTarget, hovered } = props;
  const backgroundColor = hovered ? "lightgreen" : "";
  return connectDropTarget(
    <div
      onClick={locked ? undefined : () => handleBoxClick(rowIndex, boxIndex)}
      className="grid__box"
      style={{
        width: `${boxSide}px`,
        heigth: `${boxSide}px`,
        backgroundColor: `${backgroundColor}`,
        opacity: hovered ? "0.6" : "1"
      }}
    >
      {hovered && (
        <i
          className="fas fa-plus"
          style={{ fontSize: `${boxSide / 2}px`, position: "absolute" }}
        />
      )}
      {value > 0 && <OccupiedTileContent tile={tiles[value]} />}
    </div>
  );
};

export default DropTarget("tile", tileTarget, collect)(Tile);
