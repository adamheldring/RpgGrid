import React from "react";
import { DragSource } from "react-dnd";
import { Preview } from "react-dnd-multi-backend";

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

    const generatePreview = ({ itemType, item, style }) => {
      return (
        <div style={style}>
          <div className="grid-box">
            <img
              style={{ width: "75px", height: "75px" }}
              src={`./tiles/${tile.content}.png`}
              alt="Tile"
            />
          </div>
        </div>
      );
    };
    return connectDragSource(
      <div>
        <div
          className="grid-box"
          style={{
            border: `2px solid #666666`,
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
        <Preview generator={generatePreview} />
      </div>
    );
  }
}

export default DragSource("tile", tileSource, collect)(DragTile);
