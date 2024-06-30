import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiService";

const TableUsers = (props) => {
  const [users, setUsers] = useState([]);
  const fetchDataUsers = async () => {
    let res = await getAllUser();
    console.log(res);
    if (res && res.EC === 0) {
      setUsers(res.DT);
    }
  };
  useEffect(() => {
    fetchDataUsers();
    console.log("this is useEffect");
  }, []);
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button className="btn btn-primary">View</button>
                    <button className="btn btn-warning mx-2">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {users && users.length === 0 && (
            <tr>
              <td colSpan={"4"} style={{ textAlign: "center" }}>
                No user here
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default TableUsers;
