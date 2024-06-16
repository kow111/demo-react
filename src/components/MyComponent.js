import React from "react";
import UserInfor from "./UserInfor";
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
        age: 26,
      },
      {
        id: 3,
        name: "Tun",
        age: 27,
      },
    ],
  };

  render() {
    return (
      <div>
        <UserInfor />
        <DisplayInfor listUser={this.state.listUser} />
      </div>
    );
  }
}

export default MyComponents;
