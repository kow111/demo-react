import React from "react";
class MyComponents extends React.Component {
  state = {
    name: "Teo",
    age: 10,
  };
  handleClick() {
    console.log(this.state.age);
    this.setState({
      name: "Ti",
    });
    this.setState({
      age: Math.floor(Math.random() * 100 + 1),
    });
  }
  handleOnMoveOver(event) {
    console.log(event);
  }
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old
        <button onMouseOver={this.handleOnMoveOver}>hover me</button>
        <button
          onClick={() => {
            this.handleClick();
          }}
        >
          click me
        </button>
      </div>
    );
  }
}

export default MyComponents;
