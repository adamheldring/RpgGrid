import React from "react";
import { DropTarget, DragSource } from "react-dnd";
import { flow } from "lodash";

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

// TILE AS DRAG SOURCE FOR DELETE
const tileSourceForDelete = {
  beginDrag(props) {
    return props.tile;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleDeleteDrop(props.tile.content, monitor.getDropResult());
  },
  canDrag(props, monitor) {
    if (props.locked) {
      return false;
    } else {
      return true;
    }
  }
};

function deleteTileCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
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

export default flow(
  DragSource("tile", tileSourceForDelete, deleteTileCollect),
  DropTarget("tile", tileTarget, collect)
)(Tile);
