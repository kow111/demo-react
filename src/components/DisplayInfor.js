import React from "react";
import "./DisplayInfor.scss";
class DisplayInfor extends React.Component {
  state = {
    isShow: true,
  };
  handleShowHide = () => {
    this.setState({ isShow: !this.state.isShow });
  };
  render() {
    const { listUser } = this.props;
    return (
      <div className="display-infor-container">
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
          <div>
            {listUser.map((user) => {
              return (
                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                  <div>My name is {user.name}</div>
                  <div>I'm {user.age}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default DisplayInfor;
