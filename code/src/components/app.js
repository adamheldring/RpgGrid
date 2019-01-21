import React from "react";

class App extends React.Component {
  state = {
    vpHeight: 0,
    vpWidth: 0
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowSize);
    this.updateWindowSize();
  }

  updateWindowSize = () => {
    this.setState({
      vpWidth: window.innerWidth - 10,
      vpHeight: window.innerHeight - 10
    });
  };

  render() {
    // TODO
    // Make box size user adjustable by setting grid numbers inline
    // Make slider for box size so adjustable on different resolutions
    // Make settings for backrounds
    // Make boxes clickable??? for rocks players water or whatever.
    // Deal with console errors'
    // Make bg-images proper size

    const { vpWidth, vpHeight } = this.state;
    const boxSide = 100;
    const nrOfBoxesWide = Math.floor(vpWidth / boxSide);
    const nrOfBoxesHigh = Math.floor(vpHeight / boxSide);
    const nrOfCells =
      Math.floor(vpWidth / boxSide) * Math.floor(vpHeight / boxSide);
    const boxList = new Array(nrOfCells || 0).fill("");
    const marginVertical = vpHeight - nrOfBoxesHigh * boxSide;

    console.log("window.innerWidth: ", window.innerWidth);
    console.log("window.innerHeight: ", window.innerHeight);

    return (
      <div
        className="mainWrapper"
        style={{ width: vpWidth + 10, height: vpHeight + 10 }}
      >
        <div
          className="grid"
          style={{
            width: nrOfBoxesWide * boxSide + 1,
            height: nrOfBoxesHigh * boxSide,
            marginTop: marginVertical / 2
          }}
        >
          {boxList.map(box => {
            return (
              <div
                className="grid__box"
                style={{ width: boxSide, heigth: boxSide }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
