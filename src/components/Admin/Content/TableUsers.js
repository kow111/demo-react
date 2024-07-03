const TableUsers = (props) => {
  const users = props.users;
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
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
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => props.handleClickViewUser(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => props.handleClickUpdateUser(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleClickDeleteUser(item)}
                    >
                      Delete
                    </button>
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
