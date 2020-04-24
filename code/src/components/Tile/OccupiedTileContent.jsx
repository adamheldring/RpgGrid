import React, { Fragment } from "react";
import { DragSource } from "react-dnd";
import { Preview } from "react-dnd-multi-backend";

const tileSource = {
  beginDrag(props) {
    console.log("Begin drag!");
    return props.tile;
  },
  endDrag(props, monitor, component) {
    console.log("tile Coordinates: ", props.tileCoordinates);
    console.log("props: ", props);
    console.log("RESULT: ", monitor.getDropResult());

    // Delete if content dragged and dropped outside of it's box
    if (
      monitor.getDropResult().boxIndex !== props.tileCoordinates.col ||
      monitor.getDropResult().rowIndex !== props.tileCoordinates.row
    ) {
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

class OccupiedTileContent extends React.Component {
  render() {
    const {
      tile: { content },
      boxSide,
      isDragging,
      connectDragSource
    } = this.props;

    return connectDragSource(
      <div
        style={{
          position: "relative"
        }}
      >
        <img
          className="grid__box--image"
          style={{ position: "relative", top: "2px" }}
          src={`./tiles/${content}.png`}
          alt="Tile"
        />
        {isDragging && (
          <div
            style={{
              position: "absolute",
              top: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              opacity: "0.5",
              width: `${boxSide - 4}px `,
              height: `${boxSide - 4}px`
            }}
          >
            <i
              className="fas fa-minus"
              style={{
                color: "white",
                fontSize: `${boxSide / 2}px`
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default DragSource("tile", tileSource, collect)(OccupiedTileContent);
