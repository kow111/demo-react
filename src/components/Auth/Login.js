import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import "./Login.scss";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickSubmit = async () => {
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    } else {
      toast.error(data.EM);
    }
    console.log(data);
  };
  const navigate = useNavigate();
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="text-forgot-password">Forgot password?</span>
        <div className="btn-login">
          <button className="btn btn-primary" onClick={handleClickSubmit}>
            Login to TypeForm
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
