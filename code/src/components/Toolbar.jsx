import React, { useState } from "react";
import Slider from "react-rangeslider";
import ToolbarTile from "./Tile/ToolbarTile";
import "react-rangeslider/lib/index.css";

const Toolbar = ({
  boxSide,
  setBoxSide,
  background,
  setBackground,
  tiles,
  handleTileDrop,
  locked,
  toggleLocked
}) => {
  const [isExpanded, toggleIsExpanded] = useState(true);
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
          style={{
            display: "inline-block",
            width: "164px",
            margin: "0px 20px 20px 20px",
            opacity: locked ? "0.7" : "1"
          }}
          className="toolbar__custom-select"
          name="backgroundSelect"
          id="backgroundSelect"
          value={background}
          onChange={e => setBackground(e.target.value)}
        >
          <option value="grass" disabled={locked}>
            ☘ MEADOW
          </option>
          <option value="forest" disabled={locked}>
            🌲 FOREST
          </option>
          <option value="desert" disabled={locked}>
            🏜 DESERT
          </option>
          <option value="water" disabled={locked}>
            🌊 OCEAN
          </option>
        </select>
        <div className="toolbar__tiles">
          {tiles.map((tile, tileIndex) => {
            if (tileIndex !== 0) {
              return (
                <ToolbarTile
                  key={tileIndex}
                  tile={tile}
                  boxSide={boxSide}
                  locked={locked}
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
        <div
          className="toolbar__slider--wrapper"
          style={{ opacity: locked ? "0.7" : "1" }}
        >
          <Slider
            labels={{ 50: "S", 100: "M", 150: "L" }}
            className="toolbar__slider"
            min={50}
            max={150}
            step={5}
            orientation="vertical"
            value={boxSide}
            onChange={value => {
              !locked && setBoxSide(value);
            }}
          />
        </div>
        <button
          className={`toolbar__lock-button ${
            locked ? "toolbar__lock-button--locked" : ""
          }`}
          onClick={toggleLocked}
          style={{
            backgroundColor: `${
              locked ? "var(--warning-color)" : "var(--primary-color)"
            }`
          }}
        >
          <i
            className={`fa fa-${locked ? "lock" : "lock-open"}`}
            style={{
              paddingLeft: `${locked ? "0" : "7.5px"}`
            }}
          />
          <div
            style={{
              fontSize: "10px",
              marginTop: "4px"
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
