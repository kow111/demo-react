import React, { useState } from "react";
import "./DisplayInfor.scss";
import logo from "../logo.svg";
// class DisplayInfor extends React.Component {
//   render() {
//     console.log("render DisplayInfor");
//     const { listUser } = this.props;
//     return (
//       <div className="display-infor-container">
//         {true && (
//           <>
//             {listUser.map((user) => {
//               return (
//                 <div key={user.id} className={user.age > 18 ? "green" : "red"}>
//                   <div>
//                     <div>My name is {user.name}</div>
//                     <div>I'm {user.age}</div>
//                   </div>
//                   <div>
//                     <button
//                       onClick={() => {
//                         this.props.handleDeleteUser(user.id);
//                       }}
//                     >
//                       X
//                     </button>
//                   </div>
//                   <hr />
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }
const DisplayInfor = (props) => {
  const { listUser } = props;
  const [isShow, setShowHide] = useState(true);
  const handleShowHide = () => {
    setShowHide(!isShow);
  };

  return (
    <div className="display-infor-container">
      <div>
        <span onClick={() => handleShowHide()}>
          {isShow ? "Hide List Users" : "Show List User"}
        </span>
      </div>
      {isShow && (
        <>
          {listUser.map((user) => {
            return (
              <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                <div>
                  <div>My name is {user.name}</div>
                  <div>I'm {user.age}</div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      props.handleDeleteUser(user.id);
                    }}
                  >
                    X
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
export default DisplayInfor;
