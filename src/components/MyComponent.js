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
      age: Math.floor(Math.random() * 100 + 1),
    });
  }
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  handleOnChangeInput = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <input
            type="text"
            onChange={(event) => this.handleOnChangeInput(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponents;
