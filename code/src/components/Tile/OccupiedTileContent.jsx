import React from "react";
import { DragSource } from "react-dnd";
// import { Preview } from "react-dnd-multi-backend";

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
      tile: { content },
      isDragging,
      connectDragSource
    } = this.props;
    return connectDragSource(
      <img
        className="grid__box--image"
        src={`./tiles/${content}.png`}
        alt="Tile"
        onClick={() => console.log("You Clicked")}
        style={{ border: isDragging ? "2px solid red" : "none" }}
      />
    );
  }
}

export default DragSource("tileContent", tileSource, collect)(
  OccupiedTileContent
);
