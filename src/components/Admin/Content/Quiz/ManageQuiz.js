import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
const options = [
  { value: "EASY", label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD", label: "Hard" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState(null);
  const handleUploadImage = (event) => {
    setImage(image.target.files[0]);
  };
  return (
    <div className="quiz-container">
      <div className="title">Manage Quiz</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new Quiz</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="my-3">
            <Select
              options={options}
              value={difficulty}
              placeholder="Quiz difficult..."
            />
          </div>
          <div className="more-actions">
            <label className="form-label mb-1" htmlFor="uploadImage">
              Upload image
            </label>
            <input
              type="file"
              id="uploadImage"
              className="form-control"
              onChange={(event) => handleUploadImage(event)}
            />
          </div>
          <button className="btn btn-primary mt-3">Add</button>
        </fieldset>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};
export default ManageQuiz;
