const RightContent = (props) => {
  const { dataQuiz } = props;
  return (
    <>
      <div className="main-timer">10:30</div>
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
