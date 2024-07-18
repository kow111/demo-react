import vid from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={vid} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">Make forms worth filling out</div>
        <div className="title-2">
          Get more data—like signups, feedback, and anything else—with forms
          designed to be refreshingly different.
        </div>
        <div className="title-3">
          {isAuth ? (
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              Doing Quiz Now
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Get started—it's free
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
