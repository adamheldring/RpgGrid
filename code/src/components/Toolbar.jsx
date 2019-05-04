import React, { useState } from "react";

const Toolbar = ({ boxSide, setBoxSide, background, setBackground }) => {
  const [isExpanded, toggleIsExpanded] = useState(false);
  return (
    <div className="toolbar__wrapper">
      <div
        className="toolbar__toggle"
        onClick={() => toggleIsExpanded(!isExpanded)}
      >
        <i className="fab fa-fort-awesome" />
      </div>
      <div className={`toolbar ${isExpanded ? "" : "toolbar--collapsed"}`}>
        <h1>TOOLBAR</h1>
        <input
          type="range"
          min="50"
          max="150"
          value={boxSide}
          onChange={e => setBoxSide(e.target.value)}
        />
        <p>Boxside: {boxSide} px</p>
        <button className="toolbar__button">Drag style to tile</button>
        <button className="toolbar__button">Save/Load</button>
        <select
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
      </div>
    </div>
  );
};

export default Toolbar;
