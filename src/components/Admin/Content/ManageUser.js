import ModalAddUser from "./ModalAddUser";
import "./ManageUser.scss";
const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">ManageUser</div>
      <div className="users-content">
        <div>
          <button>Add new User</button>
        </div>
        <div>table users</div>
        <ModalAddUser />
      </div>
    </div>
  );
};
export default ManageUser;
