import _ from "lodash";
import "./Question.scss";
const Question = (props) => {
  const { data, currentQuest } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  return (
    <>
      {data && data.image && (
        <div className="q-img">
          <img alt="q-img" src={`data:image/png;base64,${data.image}`} />
        </div>
      )}

      <div className="question">
        Question {currentQuest + 1}: {data.description}
      </div>
      <div className="answers">
        {data.answer &&
          data.answer.length > 0 &&
          data.answer.map((item, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div class="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`flexCheckDefault${index}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`flexCheckDefault${index}`}
                  >
                    {item.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
