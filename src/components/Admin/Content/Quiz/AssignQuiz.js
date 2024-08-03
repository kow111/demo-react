import { useEffect, useState } from "react";
import {
  getAllQuizForAdmin,
  getAllUser,
} from "../../../../services/apiService";
import "./AssignQuiz.scss";
import Select from "react-select";

const AssignQuiz = (props) => {
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");

  useEffect(() => {
    fetchDataUsers();
    fetchDataQuiz();
  }, []);

  const fetchDataUsers = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      console.log(res.DT);
      let newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}: ${item.username} - ${item.email}`,
        };
      });
      setListUser(newUser);
    }
  };

  const fetchDataQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return { value: item.id, label: `${item.id}: ${item.name}` };
      });
      setListQuiz(newQuiz);
    }
  };

  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group">
        <label>Select Quiz:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group">
        <label>Select User:</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>
      <div className="mt-3">
        <button className="btn btn-primary">Assign</button>
      </div>
    </div>
  );
};
export default AssignQuiz;
