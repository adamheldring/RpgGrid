import React from "react";
import { DragSource } from "react-dnd";

const tileSource = {
  beginDrag(props) {
    return props.tile;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleTileDrop(props.tile.content, monitor.getDropResult());
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

class ToolbarTile extends React.Component {
  render() {
    const { isDragging, connectDragSource, tile, locked } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragSource(
      <div style={{ marginBottom: `10px` }}>
        <div
          className="grid-box"
          style={{
            border: `2px solid #666666`,
            padding: `0`,
            width: `75px`,
            height: `75px`,
            cursor: "pointer",
            opacity: locked ? "0.5" : "1"
          }}
        >
          <img
            style={{ opacity: `${opacity}` }}
            className="grid__box--image"
            src={`./tiles/${tile.content}.png`}
            alt="Tile"
          />
        </div>
      </div>
    );
  }
}

export default DragSource("tile", tileSource, collect)(ToolbarTile);
