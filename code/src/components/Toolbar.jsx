import React from "react";

const Toolbar = props => {
  return (
    <div className="toolbar">
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
  );
};

export default Toolbar;
