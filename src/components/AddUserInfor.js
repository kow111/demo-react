import React from "react";

class AddUserInfor extends React.Component {
  state = {
    name: "",
    age: 0,
  };
  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
    });
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
export default AddUserInfor;
