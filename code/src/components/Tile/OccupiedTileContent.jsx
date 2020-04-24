import React, { Fragment } from "react";
import { DragSource } from "react-dnd";
import { Preview } from "react-dnd-multi-backend";

const tileSource = {
  beginDrag(props) {
    console.log("Begin drag!");
    return props.tile;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleTileDrop(
      props.tileContent.content,
      monitor.getDropResult()
    );
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
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class OccupiedTileContent extends React.Component {
  render() {
    const {
      boxSide,
      tile: { content },
      isDragging,
      connectDragSource
    } = this.props;

    return connectDragSource(
      <div
        style={{
          position: "relative",
          top: "2px"
        }}
      >
        <img
          className="grid__box--image"
          src={`./tiles/${content}.png`}
          alt="Tile"
          onClick={() => console.log("You Clicked")}
        />
        {isDragging && (
          <div
            style={{
              position: "absolute",
              top: "0",
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
              style={{ color: "white", fontSize: `${boxSide / 2}px` }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default DragSource("tileContent", tileSource, collect)(
  OccupiedTileContent
);
