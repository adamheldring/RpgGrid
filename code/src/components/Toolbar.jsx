import React, { useState } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

const Toolbar = ({ boxSide, setBoxSide, background, setBackground, tiles }) => {
  const [isExpanded, toggleIsExpanded] = useState(true);
  return (
    <div className="toolbar__wrapper">
      <div
        className="toolbar__toggle"
        onClick={() => toggleIsExpanded(!isExpanded)}
      >
        <i className="fab fa-fort-awesome" />
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
          <div className="tile">
            {tiles.map((tile, tileIndex) => {
              if (tileIndex !== 0) {
                return (
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
                      className="grid__box--image"
                      src={`./tiles/${tile}.png`}
                      alt="Tile"
                    />
                  </div>
                );
              }
            })}
          </div>
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
        <button className="toolbar__button">Save/Load</button>
      </div>
    </div>
  );
};

export default Toolbar;
