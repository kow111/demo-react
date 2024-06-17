import React from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";
class MyComponents extends React.Component {
  state = {
    listUser: [
      {
        id: 1,
        name: "Teo",
        age: 25,
      },
      {
        id: 2,
        name: "Ti",
        age: 10,
      },
      {
        id: 3,
        name: "Tun",
        age: 27,
      },
    ],
  };
  handleAddNewUser = (userObj) => {
    this.setState({
      listUser: [userObj, ...this.state.listUser],
    });
    console.log(userObj);
  };
  render() {
    return (
      <div>
        <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
        <DisplayInfor listUser={this.state.listUser} />
      </div>
    );
  }
}

export default MyComponents;
