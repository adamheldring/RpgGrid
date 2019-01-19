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
    vpWidth: window.innerWidth,
    vpHeight: window.innerHeight
  })
}

  render() {
    const { vpWidth, vpHeight } = this.state

    const boxList = new Array(50).fill("")

    console.log(boxList)
    return (
      <div className="mainWrapper" style={{ width: vpWidth-2, height: vpHeight-2 }}>
        <div className="grid">
          {boxList.map(box => {
            return <div className="grid__box"></div>
          })}
        </div>
      </div>
    );
  }
}

export default App;
