import React, { useState } from "react";
import Slider from "react-rangeslider";
import DragTile from "./DragTile";
import "react-rangeslider/lib/index.css";

const Toolbar = ({
  boxSide,
  setBoxSide,
  background,
  setBackground,
  tiles,
  handleTileDrop,
  clickEnabled,
  toggleClickEnabled
}) => {
  const [isExpanded, toggleIsExpanded] = useState(false);
  const [displayRight, toggleDisplayRight] = useState(true);
  return (
    <div
      className="toolbar__wrapper"
      style={{
        right: `${displayRight ? "0" : "calc(100vw - var(--toolbar-width))"}`
      }}
    >
      <div>
        <button
          className="toolbar__toggle"
          style={
            displayRight
              ? {
                  right: "20px",
                  backgroundColor: `${
                    isExpanded ? "var(--primary-color)" : "black"
                  }`,
                  transform: `${isExpanded ? "scale(1.3)" : ""}`
                }
              : {
                  left: "20px",
                  backgroundColor: `${
                    isExpanded ? "var(--primary-color)" : "black"
                  }`,
                  transform: `${isExpanded ? "scale(1.3)" : ""}`
                }
          }
          onClick={() => toggleIsExpanded(!isExpanded)}
        >
          <i className={isExpanded ? "fa fa-times" : "fab fa-fort-awesome"} />
        </button>
        {isExpanded && (
          <button
            className="toolbar__toggle"
            style={
              displayRight
                ? {
                    left: "20px",
                    backgroundColor: `${isExpanded ? "#2e90db" : "black"}`,
                    transform: `${isExpanded ? "scale(1.3)" : ""}`
                  }
                : {
                    right: "20px",
                    backgroundColor: `${isExpanded ? "#2e90db" : "black"}`,
                    transform: `${isExpanded ? "scale(1.3)" : ""}`
                  }
            }
            onClick={() => toggleDisplayRight(!displayRight)}
          >
            <i className={`fa fa-arrow-${displayRight ? "left" : "right"}`} />
          </button>
        )}
      </div>
      <div className={`toolbar ${isExpanded ? "" : "toolbar--collapsed"}`}>
        <select
          style={{ marginBottom: "20px" }}
          name="backgroundPicker"
          id="backgroundPicker"
          value={background}
          onChange={e => setBackground(e.target.value)}
        >
          <option value="grass">Meadow</option>
          <option value="water">Water</option>
          <option value="forest">Forest</option>
          <option value="desert">Desert</option>
        </select>
        <div className="toolbar__tiles">
          {tiles.map((tile, tileIndex) => {
            if (tileIndex !== 0) {
              return (
                <DragTile
                  key={tileIndex}
                  tile={tile}
                  boxSide={boxSide}
                  handleTileDrop={(tileContent, tileTarget) =>
                    handleTileDrop(tileContent, tileTarget)
                  }
                />
              );
            } else {
              return undefined;
            }
          })}
        </div>
        <div className="toolbar__slider--wrapper">
          <Slider
            labels={{ 50: "S", 100: "M", 150: "L" }}
            className="toolbar__slider"
            min={50}
            max={150}
            orientation="vertical"
            value={boxSide}
            onChange={value => setBoxSide(value)}
          />
        </div>
        <button className="toolbar__button" onClick={toggleClickEnabled}>
          {clickEnabled ? "Disable click" : "Enable click"}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
