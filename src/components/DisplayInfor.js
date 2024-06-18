import React from "react";
import "./DisplayInfor.scss";
import logo from "../logo.svg";
class DisplayInfor extends React.Component {
  state = {
    isShow: true,
  };
  handleShowHide = () => {
    this.setState({ isShow: !this.state.isShow });
  };
  componentDidUpdate = (prevProps) => {
    console.log("componentDidUpdate", this.props, prevProps);
    if (this.props.listUser !== prevProps.listUser) {
      if (this.props.listUser.length === 5) {
        alert("You have 5 users");
      }
    }
  };
  render() {
    console.log("render DisplayInfor");
    const { listUser } = this.props;
    return (
      <div className="display-infor-container">
        <img src={logo} alt="logo" />
        <div>
          <span
            onClick={() => {
              this.handleShowHide();
            }}
          >
            {this.state.isShow ? "Hide list user" : "Show list user"}
          </span>
        </div>
        {this.state.isShow && (
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
                        this.props.handleDeleteUser(user.id);
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
  }
}
export default DisplayInfor;
