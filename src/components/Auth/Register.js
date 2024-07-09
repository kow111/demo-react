import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import "./Register.scss";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleClickSubmit = async () => {
    if (!validateEmail(email)) {
      toast.error("Email is invalid");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    let data = await postRegister(email, username, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
    console.log(data);
  };
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="header">
        <span>Already have an account yet?</span>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Log in
        </button>
      </div>
      <div className="title col-3 mx-auto">TypeForm</div>
      <div className="welcome col-3 mx-auto">Hello, who’s this?</div>
      <div className="content-form col-3 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            placeholder="Enter email"
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            placeholder="Enter username (Can be empty)"
            type="text"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label>Password</label>
          <input
            placeholder="Password"
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isShowPassword ? (
            <span
              className="icons-eye"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              <VscEye />
            </span>
          ) : (
            <span
              className="icons-eye"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              <VscEyeClosed />
            </span>
          )}
        </div>
        <div className="btn-login">
          <button className="btn btn-primary" onClick={handleClickSubmit}>
            Register to TypeForm
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
export default Register;
