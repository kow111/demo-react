import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { FaTrashAlt } from "react-icons/fa";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState("");
  return (
    <div className="questions-container">
      <div className="title">Manage Question</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3">Add Questions:</div>
        <div>
          <div className="row questions-content">
            <div className="col-6">
              <label>Description</label>
              <input type="text" className="form-control" />
            </div>
            <div className=" col-3">
              <label>Upload Image</label>
              <input type="file" className="form-control" />
            </div>
            <div className="col-3">
              <button className="btn btn-primary">Add new</button>
              <button className="btn btn-danger ms-3">Delete one</button>
            </div>
          </div>
          <div className="answers-content mt-3">
            <input className="form-check-input is-correct" type="checkbox" />
            <div className="col-6 answer-name">
              <input
                type="text"
                className="form-control"
                placeholder="Answer 1"
              />
            </div>
            <div className="">
              <button className="btn btn-primary">Add new</button>
              <button className="btn btn-danger ms-3">Delete one</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Questions;
