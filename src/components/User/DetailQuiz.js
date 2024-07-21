import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.quizId;
  useEffect(() => {
    fetchQuestion();
  }, [quizId]);
  const fetchQuestion = async () => {
    let res = await getDataQuiz(quizId);
    console.log(res);
  };
  return <div className="detail-quiz-container">Detail Quiz </div>;
};
export default DetailQuiz;
