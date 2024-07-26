import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
import { postCreateQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
const options = [
  { value: "EASY", label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD", label: "Hard" },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState(null);
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Name and Description is required");
      return;
    }
    let res = await postCreateQuiz(description, name, difficulty?.value, image);
    if (res.EC === 0) {
      console.log(res);
      toast.success(res.EM);
      setName("");
      setDescription("");
    } else {
      toast.error(res.EM);
    }
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
              defaultValue={difficulty}
              onChange={setDifficulty}
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
          <div className="mt-3 button-save">
            <button
              className="btn btn-primary"
              onClick={() => handleSubmitQuiz()}
            >
              Save
            </button>
          </div>
        </fieldset>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};
export default ManageQuiz;
