import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz } = props;

  const onTimeUp = () => {
    props.handleFinishBtn();
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
              className="questions"
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
