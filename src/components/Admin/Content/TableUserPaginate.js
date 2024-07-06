import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

const TableUserPaginate = (props) => {
  const { users, pageCount } = props;

  const handlePageClick = (event) => {
    props.fetchDataUsersWithPage(+event.selected + 1);
    props.setCrtPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };
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
      <div className="users-pagination">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.crtPage - 1}
        />
      </div>
    </>
  );
};
export default TableUserPaginate;
