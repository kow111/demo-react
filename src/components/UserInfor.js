import React from "react";

class UserInfor extends React.Component {
  state = {
    name: "Teo",
    age: 10,
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  handleOnChangeInput = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleOnChangeAge = (event) => {
    this.setState({
      age: event.target.value,
    });
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label>your name:</label>
          <input
            value={this.state.name}
            type="text"
            onChange={(event) => this.handleOnChangeInput(event)}
          />
          <label>your age:</label>
          <input
            value={this.state.age}
            type="number"
            onChange={(event) => this.handleOnChangeAge(event)}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
export default UserInfor;
