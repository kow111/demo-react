import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "./Login.scss";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner9 } from "react-icons/im";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickSubmit = async () => {
    setIsLoading(true);
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    } else {
      setIsLoading(false);
      toast.error(data.EM);
    }
    console.log(data);
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/register")}
        >
          Sign up
        </button>
      </div>
      <div className="title col-3 mx-auto">TypeForm</div>
      <div className="welcome col-3 mx-auto">Hello, who’s this?</div>
      <div className="content-form col-3 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="text-forgot-password">Forgot password?</span>
        <div className="btn-login">
          <button
            className="btn btn-primary"
            onClick={handleClickSubmit}
            disabled={isLoading}
          >
            {isLoading && <ImSpinner9 className="loader-icon" />}
            <span>Login to TypeForm</span>
          </button>
        </div>
        <div className="text-center">
          <span className="back-btn" onClick={() => navigate("/")}>
            {" "}
            &#60;&#60; Go back home
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
