import React, { useEffect, useState } from "react";
import "./DisplayInfor.scss";

const DisplayInfor = (props) => {
  const { listUser } = props;
  const [isShow, setShowHide] = useState(true);
  const handleShowHide = () => {
    setShowHide(!isShow);
  };
  console.log("Component rendered");
  useEffect(() => {
    if (listUser.length === 0) {
      console.log("No user here");
    }
    console.log("call me useEffect");
  }, [listUser]);
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
