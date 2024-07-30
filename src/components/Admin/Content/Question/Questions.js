import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "Question 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "Answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };
  const handleAddRemoveAnswer = (type, aId, qId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let indexQuestion = questionsClone.findIndex((item) => item.id === qId);
      questionsClone[indexQuestion].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === "REMOVE") {
      let indexQuestion = questionsClone.findIndex((item) => item.id === qId);
      questionsClone[indexQuestion].answers = questionsClone[
        indexQuestion
      ].answers.filter((item) => item.id !== aId);
      setQuestions(questionsClone);
    }
  };
  console.log("Q: ", questions);
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
        {questions &&
          questions.length > 0 &&
          questions.map((item, index) => {
            return (
              <div key={`question-${item.id}`} className="q-main mt-3">
                <div className="row questions-content">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description..."
                      value={item.description}
                    />
                  </div>
                  <div className=" col-3">
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleAddRemoveQuestion("ADD", "");
                      }}
                    >
                      Add new
                    </button>
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => {
                        handleAddRemoveQuestion("REMOVE", item.id);
                      }}
                      disabled={questions.length === 1}
                    >
                      Delete one
                    </button>
                  </div>
                </div>
                {item.answers &&
                  item.answers.length > 0 &&
                  item.answers.map((answer, index) => (
                    <div key={answer.id} className="answers-content mt-3">
                      <input
                        className="form-check-input is-correct"
                        type="checkbox"
                      />
                      <div className="col-6 answer-name">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Answer ${index + 1}`}
                          value={answer.description}
                        />
                      </div>
                      <div className="btn-group-custom">
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleAddRemoveAnswer("ADD", "", item.id)
                          }
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() =>
                            handleAddRemoveAnswer("REMOVE", answer.id, item.id)
                          }
                          disabled={item.answers.length === 1}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  ))}

                <hr />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Questions;
