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
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class DragTile extends React.Component {
  render() {
    const { isDragging, connectDragSource, tile } = this.props;
    const opacity = isDragging ? 0.5 : 1;
    return connectDragSource(
      <div
        className="grid-box"
        style={{
          border: `2px solid #444444`,
          padding: `5px`,
          width: `75px`,
          heigth: `75px`,
          marginBottom: `10px`,
          cursor: "pointer"
        }}
      >
        <img
          style={{ opacity: `${opacity}` }}
          className="grid__box--image"
          src={`./tiles/${tile.content}.png`}
          alt="Tile"
        />
      </div>
    );
  }
}

export default DragSource("tile", tileSource, collect)(DragTile);
