import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import { toast } from "react-toastify";
const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.quizId;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuest, setCurrentQuest] = useState(0);

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
  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          console.log("value: ", value);
          let answer = [];
          let description,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              description = item.description;
              image = item.image;
            }
            answer.push(item.answers);
          });
          return { questionId: key, answer: answer, description, image };
        })
        .value();
      console.log(data);
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
            currentQuest={currentQuest}
          />
        </div>
        <div className="q-footer">
          {currentQuest === 0 ? (
            <button className="btn btn-info" onClick={handleBackBtn} disabled>
              Back
            </button>
          ) : (
            <button className="btn btn-info" onClick={handleBackBtn}>
              Back
            </button>
          )}
          {currentQuest === dataQuiz.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={() => handleNextBtn()}
              disabled
            >
              Next
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => handleNextBtn()}>
              Next
            </button>
          )}
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};
export default DetailQuiz;
