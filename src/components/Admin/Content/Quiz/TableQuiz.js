const TableQuiz = (props) => {
  const { listQuiz } = props;

  return (
    <table className="table table-hover table-bordered mt-3 mb-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Difficulty</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {listQuiz &&
          listQuiz.length > 0 &&
          listQuiz.map((item, index) => {
            return (
              <tr key={`table-quiz-${index}`}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>
                  <button className="btn btn-infor">View</button>
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => props.handleClickUpdateQuiz(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => props.handleClickDeleteQuiz(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
export default TableQuiz;
