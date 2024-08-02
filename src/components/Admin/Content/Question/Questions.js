import { useEffect, useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const Questions = (props) => {
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      isValid: false,
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
          isValid: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestion);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");

  useEffect(() => {
    fetchDataQuiz();
  }, []);
  const fetchDataQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return { value: item.id, label: `${item.id}: ${item.name}` };
      });
      setListQuiz(newQuiz);
    }
  };

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
  const handleOnChangeFileQuestions = (id, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === id);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };
  const handleOnChange = (type, qId, event) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === qId);
      if (index > -1) {
        questionsClone[index].description = event.target.value;
        setQuestions(questionsClone);
      }
    }
  };
  const handleAnswerQuestion = (type, aId, qId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === qId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (item) => {
          if (item.id === aId) {
            if (type === "CHECKBOX") {
              item.isCorrect = value;
            } else if (type === "INPUT") {
              item.description = value;
            }
          }
          return item;
        }
      );
      setQuestions(questionsClone);
    }
  };
  const handlePreviewImage = (item) => {
    setDataImagePreview({
      title: item.imageName,
      url: URL.createObjectURL(item.imageFile),
    });
    setIsPreviewImage(true);
  };
  const handleSubmitQuestionsForQuiz = async () => {
    let questionsClone = _.cloneDeep(questions);
    if (_.isEmpty(selectedQuiz)) {
      toast.error("No quiz selected");
      return;
    }
    questionsClone = questionsClone.map((item) => {
      item.isValid = false;
      item.answers.map((answer) => {
        answer.isValid = false;
        return answer;
      });
      return item;
    });
    //validate answer
    let isValidA = true;
    let indexQ = 0,
      indexA = 0;
    let isValidQ = true;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        let iQ = questionsClone.findIndex((item) => {
          return item.id === questions[i].id;
        });
        questionsClone[iQ].isValid = true;
        setQuestions(questionsClone);

        isValidQ = false;
        indexQ = i;
        break;
      }
    }
    if (isValidQ === false) {
      toast.error(`Not empty Description for Question ${indexQ + 1}`);
      return;
    }
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          let iQ = questionsClone.findIndex((item) => {
            return item.id === questions[i].id;
          });
          let iA = questionsClone[iQ].answers.findIndex(
            (item) => item.id === questions[i].answers[j].id
          );
          questionsClone[iQ].answers[iA].isValid = true;
          setQuestions(questionsClone);

          isValidA = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidA === false) {
        break;
      }
    }
    if (isValidA === false) {
      toast.error(`Not Empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }
    toast.success("Create questions and answers success");
    setQuestions(initQuestion);
    //
  };
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
            options={listQuiz}
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
                      className={
                        item.isValid
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      placeholder={`Question ${index + 1}'s Description`}
                      value={item.description}
                      onChange={(event) =>
                        handleOnChange("QUESTION", item.id, event)
                      }
                    />
                  </div>
                  <div className="col-3 d-flex flex-column">
                    <label
                      className="btn btn-secondary"
                      htmlFor={`upload-${item.id}`}
                      style={{ width: "150px" }}
                    >
                      Upload image
                    </label>
                    <input
                      id={`upload-${item.id}`}
                      type="file"
                      className="form-control"
                      hidden
                      onChange={(event) =>
                        handleOnChangeFileQuestions(item.id, event)
                      }
                    />
                    <span>
                      {item.imageName ? (
                        <span
                          onClick={() => handlePreviewImage(item)}
                          style={{ cursor: "pointer" }}
                        >
                          {item.imageName}
                        </span>
                      ) : (
                        "0 file is uploaded"
                      )}
                    </span>
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
                        checked={answer.isCorrect}
                        onChange={(event) =>
                          handleAnswerQuestion(
                            "CHECKBOX",
                            answer.id,
                            item.id,
                            event.target.checked
                          )
                        }
                      />
                      <div className="col-6 answer-name">
                        <input
                          type="text"
                          className={
                            answer.isValid
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          placeholder={`Answer ${index + 1}`}
                          value={answer.description}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "INPUT",
                              answer.id,
                              item.id,
                              event.target.value
                            )
                          }
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
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => handleSubmitQuestionsForQuiz()}
            >
              Save Questions
            </button>
          </div>
        )}
        {isPreviewImage && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};
export default Questions;
