import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";
// class MyComponents extends React.Component {
//   state = {
//     listUser: [
//       {
//         id: 1,
//         name: "Teo",
//         age: 25,
//       },
//       {
//         id: 2,
//         name: "Ti",
//         age: 10,
//       },
//       {
//         id: 3,
//         name: "Tun",
//         age: 27,
//       },
//     ],
//   };
//   handleAddNewUser = (userObj) => {
//     this.setState({
//       listUser: [userObj, ...this.state.listUser],
//     });
//   };
//   handleDeleteUser = (id) => {
//     let listUserClone = this.state.listUser;
//     listUserClone = listUserClone.filter((item) => item.id !== id);
//     this.setState({
//       listUser: listUserClone,
//     });
//   };
//   render() {
//     return (
//       <>
//         <div className="a">
//           <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
//           <DisplayInfor
//             listUser={this.state.listUser}
//             handleDeleteUser={this.handleDeleteUser}
//           />
//         </div>
//         <div className="b"></div>
//       </>
//     );
//   }
// }
const MyComponents = () => {
  const [listUser, setListUser] = useState([
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
  ]);
  const handleAddNewUser = (userObj) => {
    setListUser([userObj, ...listUser]);
  };
  const handleDeleteUser = (id) => {
    let listUserClone = [...listUser];
    listUserClone = listUserClone.filter((item) => item.id !== id);
    setListUser(listUserClone);
  };
  return (
    <>
      <div className="a">
        <AddUserInfor handleAddNewUser={handleAddNewUser} />
        <DisplayInfor listUser={listUser} handleDeleteUser={handleDeleteUser} />
      </div>
      <div className="b"></div>
    </>
  );
};
export default MyComponents;
