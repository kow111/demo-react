import ModalAddUser from "./ModalAddUser";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import { useState } from "react";
const ManageUser = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={handleShow}>
            <FcPlus />
            Add new User
          </button>
        </div>
        <div className="table-users-container">table users</div>
        <ModalAddUser show={show} setShow={setShow} />
      </div>
    </div>
  );
};
export default ManageUser;
