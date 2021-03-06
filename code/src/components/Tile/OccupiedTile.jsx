import React from "react";
import { DragSource } from "react-dnd";

const tileSource = {
  beginDrag(props) {
    return { tileCoordinates: props.tileCoordinates, ...props.tile };
  },
  endDrag(props, monitor, component) {
    // Delete if content dragged and dropped outside of it's box
    if (monitor.didDrop()) {
      if (
        monitor.getDropResult().boxIndex !== props.tileCoordinates.col ||
        monitor.getDropResult().rowIndex !== props.tileCoordinates.row
      ) {
        // Dropped in other box - delete
        return props.handleBoxClear(
          props.tileCoordinates.row,
          props.tileCoordinates.col
        );
      } else {
        // Dropped back in same box - keep
        return null;
      }
    } else {
      // Dropped outside of board - delete
      return props.handleBoxClear(
        props.tileCoordinates.row,
        props.tileCoordinates.col
      );
    }
  },
  canDrag(props, monitor) {
    if (props.locked) {
      return false;
    } else {
      return true;
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class OccupiedTile extends React.Component {
  render() {
    const {
      tile,
      boxSide,
      isDragging,
      connectDragSource,
      hovered,
      locked
    } = this.props;
    return connectDragSource(
      <div
        className={`${
          !isDragging && !locked ? "occupied-tile__wrapper--highlight" : ""
        }`}
        style={{
          position: "relative",
          cursor: locked ? "auto" : "grab"
        }}
      >
        <img
          className="grid__box--image"
          style={{ position: "relative", top: "2px" }}
          src={`./tiles/${tile.content}.png`}
          alt="Tile"
        />
        <div
          className="occupied-tile__editframe"
          style={{
            position: "absolute",
            top: "-2px",
            left: "-4px",
            border: "4px solid yellow",
            width: `${boxSide - 4}px `,
            height: `${boxSide - 4}px`
          }}
        />
        {isDragging && (
          <div
            style={{
              position: "absolute",
              top: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: `${hovered ? "yellow" : "red"}`,
              opacity: "0.5",
              width: `${boxSide - 4}px `,
              height: `${boxSide - 4}px`
            }}
          >
            {!hovered && (
              <i
                className="fas fa-minus"
                style={{
                  color: "white",
                  fontSize: `${boxSide / 2}px`
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default DragSource("tile", tileSource, collect)(OccupiedTile);
