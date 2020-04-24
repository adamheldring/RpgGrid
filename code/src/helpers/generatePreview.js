import React from "react";

const generatePreview = ({ itemType, item, style, boxSide }) => {
  return (
    <div style={style}>
      <div className="grid-box">
        <img
          style={{
            width: boxSide,
            height: boxSide,
            opacity: "0.6"
          }}
          src={`./tiles/${item.content}.png`}
          alt="Tile"
        />
      </div>
    </div>
  );
};

export default generatePreview;
