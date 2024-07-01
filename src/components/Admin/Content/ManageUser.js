import ModalAddUser from "./ModalAddUser";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import TableUsers from "./TableUsers";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiService";
const ManageUser = (props) => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const fetchDataUsers = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      setUsers(res.DT);
    }
  };
  useEffect(() => {
    fetchDataUsers();
  }, []);
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
        <div className="table-users-container">
          <TableUsers users={users} />
        </div>
        <ModalAddUser
          show={show}
          setShow={setShow}
          fetchDataUsers={fetchDataUsers}
        />
      </div>
    </div>
  );
};
export default ManageUser;
