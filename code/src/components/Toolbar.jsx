import React, { useState } from "react";

const Toolbar = props => {
  const [isExpanded, toggleIsExpanded] = useState(false);
  console.log("Toolbar expanded: ", isExpanded);
  return (
    <div className="toolbar__wrapper">
      <div
        className="toolbar__toggle"
        onClick={() => toggleIsExpanded(!isExpanded)}
      >
        <i class="fas fa-tools" />
      </div>
      <div className={`toolbar ${isExpanded ? "" : "toolbar--collapsed"}`}>
        <h1>TOOLBAR</h1>
        <input type="range" />
        <button>Toggel edit mode</button>
        <button>Drag style to tile</button>
        <button>Save/Load</button>
        <select name="backgroundPicker" id="backgroundPicker">
          <option value="0">Meadow</option>
          <option value="1">Water</option>
          <option value="2">Mountains</option>
          <option value="3">Forest</option>
        </select>
      </div>
    </div>
  );
};

export default Toolbar;
