import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, submitAnswer } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";
import RightContent from "./RightContent/RightContent";
const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.quizId;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuest, setCurrentQuest] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const handleBackBtn = () => {
    if (currentQuest === 0) {
      toast.error("This is the first question");
    } else {
      setCurrentQuest(currentQuest - 1);
    }
  };
  const handleNextBtn = () => {
    if (currentQuest === dataQuiz.length - 1) {
      toast.error("This is the last question");
    } else {
      setCurrentQuest(currentQuest + 1);
    }
  };
  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answer) {
      question.answer = question.answer.map((item) => {
        if (item.id === answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    dataQuizClone[index] = question;
    setDataQuiz(dataQuizClone);
  };
  const handleFinishBtn = async () => {
    console.log("check data bf submit", dataQuiz);
    let payload = {};
    payload.quizId = +quizId;
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let obj = {};
        let questionId = item.questionId;
        let userAnswerId = [];
        item.answer.forEach((item) => {
          if (item.isSelected) {
            userAnswerId.push(item.id);
          }
        });
        obj.questionId = +questionId;
        obj.userAnswerId = userAnswerId;
        answers.push(obj);
      });
      payload.answers = answers;
      const res = await submitAnswer(payload);
      if (res.EC === 0) {
        setDataModal({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setShowResult(true);
      } else {
        toast.error(res.EM);
      }
      console.log("check response: ", res);
    }
  };
  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answer = [];
          let description,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              description = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answer.push(item.answers);
          });
          return { questionId: key, answer: answer, description, image };
        })
        .value();
      setDataQuiz(data);
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-content">
          <Question
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuest] : []}
            handleCheckBox={handleCheckBox}
            currentQuest={currentQuest}
          />
        </div>
        <div className="q-footer">
          <button
            className="btn btn-info"
            onClick={handleBackBtn}
            disabled={currentQuest === 0}
          >
            Back
          </button>

          <button
            className="btn btn-primary"
            onClick={() => handleNextBtn()}
            disabled={currentQuest === dataQuiz.length - 1}
          >
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleFinishBtn()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent
          currentQuest={currentQuest}
          dataQuiz={dataQuiz}
          setCurrentQuest={setCurrentQuest}
        />
      </div>
      <ModalResult
        show={showResult}
        setShow={setShowResult}
        dataModal={dataModal}
      />
    </div>
  );
};
export default DetailQuiz;
