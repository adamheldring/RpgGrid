import React from "react";

class App extends React.Component {

state = {
  windowHeight: 0,
  windowWidth: 0
}

componentDidMount() {
  window.addEventListener("resize", this.updateWindowSize)
  this.updateWindowSize()
}

updateWindowSize = () => {
  this.setState({
    vpWidth: window.innerWidth - 2,
    vpHeight: window.innerHeight - 4
  })
}

  render() {
// TODO Calculate leftover height and split the margin between top and bottom
// Add a little safety margin for height
// Make Boxside constant be incharge of Box Size with inline class
// Make slider for box size so adjustable on different resolutions
// Make settings for backrounds
// Make boxes clickable??? for rocks players water or whatever.


    const { vpWidth, vpHeight } = this.state
    const boxSide = 100
    const nrOfBoxesWide = Math.floor(vpWidth / boxSide)
    const nrOfBoxesHigh = Math.floor(vpHeight / boxSide)
    const nrOfCells = Math.floor(vpWidth / boxSide) * Math.floor(vpHeight / boxSide)
    const boxList = new Array(nrOfCells || 0).fill("")

    return (
      <div className="mainWrapper" style={{ width: vpWidth, height: vpHeight }}>
        <div className="grid" style={{ width: nrOfBoxesWide * boxSide }}>
          {boxList.map(box => {
            return <div className="grid__box"></div>
          })}
        </div>
      </div>
    );
  }
}

export default App;
