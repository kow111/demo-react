import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";
class MyComponents extends React.Component {
  render() {
    return (
      <div>
        <UserInfor />
        <DisplayInfor name="Teo" age="25" />
      </div>
    );
  }
}

export default MyComponents;
