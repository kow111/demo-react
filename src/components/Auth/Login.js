import { useState } from "react";
import "./Login.scss";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickSubmit = () => {
    alert("me");
  };
  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button className="btn btn-primary">Sign up</button>
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
        <span>Forgot password?</span>
        <div className="btn-login">
          <button className="btn btn-primary" onClick={handleClickSubmit}>
            Login to TypeForm
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
