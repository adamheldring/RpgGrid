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
    handleBoxClear,
    tiles,
    locked
  } = props;
  const { connectDropTarget, hovered } = props;
  const backgroundColor = hovered ? "lightgreen" : "";
  const tileCoordinates = { row: rowIndex, col: boxIndex };
  return connectDropTarget(
    <div
      onClick={locked ? undefined : () => handleBoxClear(rowIndex, boxIndex)}
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
      {value > 0 && (
        <OccupiedTileContent
          tile={tiles[value]}
          boxSide={boxSide}
          tileCoordinates={tileCoordinates}
          handleBoxClear={handleBoxClear}
        />
      )}
    </div>
  );
};

export default DropTarget("tile", tileTarget, collect)(Tile);
