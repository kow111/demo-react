import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz, currentQuest } = props;

  const onTimeUp = () => {
    props.handleFinishBtn();
  };
  const getClassQuestion = (item, i) => {
    if (item && item.answer.length > 0) {
      let check = item.answer.find((a) => a.isSelected === true);
      if (check && currentQuest === i) {
        return "questions selected clicked";
      }
      if (check) {
        return "questions selected";
      }
      if (currentQuest === i) {
        return "questions clicked";
      }
    }
    return "questions";
  };
  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => (
            <div
              className={getClassQuestion(item, index)}
              key={`Q-${index}`}
              onClick={() => props.setCurrentQuest(index)}
            >
              {index + 1}
            </div>
          ))}
      </div>
    </>
  );
};
export default RightContent;
