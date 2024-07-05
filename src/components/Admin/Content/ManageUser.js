import ModalAddUser from "./ModalAddUser";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import TableUsers from "./TableUsers";
import { useEffect, useState } from "react";
import { getAllUser, getUserByPage } from "../../../services/apiService";
import ModelUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManageUser = (props) => {
  const LIMIT_USER = 7;

  const [show, setShow] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  const [pageCount, setPageCount] = useState(0);

  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [users, setUsers] = useState([]);

  const fetchDataUsers = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      setUsers(res.DT);
    }
  };

  const fetchDataUsersWithPage = async (page) => {
    let res = await getUserByPage(page, LIMIT_USER);
    if (res && res.EC === 0) {
      console.log(res.DT);
      setUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  useEffect(() => {
    fetchDataUsersWithPage(1);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClickUpdateUser = (user) => {
    setShowUpdateUser(true);
    setDataUpdate(user);
  };

  const handleClickViewUser = (user) => {
    setShowViewUser(true);
    setDataView(user);
  };

  const handleClickDeleteUser = (user) => {
    setShowDeleteUser(true);
    setDataDelete(user);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  const resetDataView = () => {
    setDataView({});
  };

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
          {/* <TableUsers
            users={users}
            handleClickUpdateUser={handleClickUpdateUser}
            handleClickViewUser={handleClickViewUser}
            handleClickDeleteUser={handleClickDeleteUser}
          /> */}
          <TableUserPaginate
            users={users}
            handleClickUpdateUser={handleClickUpdateUser}
            handleClickViewUser={handleClickViewUser}
            handleClickDeleteUser={handleClickDeleteUser}
            fetchDataUsersWithPage={fetchDataUsersWithPage}
            pageCount={pageCount}
          />
        </div>
        <ModalAddUser
          show={show}
          setShow={setShow}
          fetchDataUsers={fetchDataUsers}
        />
        <ModelUpdateUser
          show={showUpdateUser}
          setShow={setShowUpdateUser}
          dataUpdate={dataUpdate}
          fetchDataUsers={fetchDataUsers}
          resetDataUpdate={resetDataUpdate}
        />
        <ModalViewUser
          dataView={dataView}
          setShow={setShowViewUser}
          show={showViewUser}
          resetDataView={resetDataView}
        />
        <ModalDeleteUser
          show={showDeleteUser}
          setShow={setShowDeleteUser}
          dataDelete={dataDelete}
          fetchDataUsers={fetchDataUsers}
        />
      </div>
    </div>
  );
};
export default ManageUser;
