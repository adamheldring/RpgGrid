import React from "react";
import { DropTarget } from "react-dnd";
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
    tile: monitor.getItem(),
    hovered: monitor.isOver(),
    dragToDelete: monitor.getItem() && !!monitor.getItem().tileCoordinates
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
  const { connectDropTarget, hovered, dragToDelete } = props;
  const backgroundColor = hovered && !dragToDelete ? "lightgreen" : "";
  const tileCoordinates = { row: rowIndex, col: boxIndex };
  return connectDropTarget(
    <div
      onClick={locked ? undefined : () => handleBoxClear(rowIndex, boxIndex)}
      className="grid__box"
      style={{
        width: `${boxSide}px`,
        heigth: `${boxSide}px`,
        backgroundColor: `${backgroundColor}`,
        opacity: hovered && !dragToDelete ? "0.6" : "1"
      }}
    >
      {hovered && !dragToDelete && (
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
          dragToDelete={dragToDelete}
          hovered={hovered}
          locked={locked}
        />
      )}
    </div>
  );
};

export default DropTarget("tile", tileTarget, collect)(Tile);
