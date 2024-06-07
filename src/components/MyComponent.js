import React from "react";

class MyComponents extends React.Component {
  state = {
    name: "Teo",
    age: 10,
  };
  render() {
    return <div> My name is {this.state.name}</div>;
  }
}

export default MyComponents;
