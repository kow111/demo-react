import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  const quizId = params.quizId;
  useEffect(() => {
    fetchQuestion();
  }, [quizId]);
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
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="q-body">
          <img alt="img-q" />
        </div>
        <div className="q-content">
          <div className="question">Q1: where r u come from</div>
          <div className="answers">
            <div>A. asdasd</div>
            <div>B. asdasd</div>
            <div>C. asdsads</div>
          </div>
        </div>
        <div className="q-footer">
          <button className="btn btn-info">Back</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content">count down</div>
    </div>
  );
};
export default DetailQuiz;
