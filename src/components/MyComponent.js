import React from "react";
class MyComponents extends React.Component {
  state = {
    name: "Teo",
    age: 10,
  };
  handleClick() {
    console.log(this.state.name);
  }
  handleOnMoveOver(event) {
    console.log(event);
  }
  render() {
    return (
      <div>
        My name is {this.state.name}
        <button onMouseOver={this.handleOnMoveOver}>hover me</button>
        <button onClick={this.handleClick}>click me</button>
      </div>
    );
  }
}

export default MyComponents;
