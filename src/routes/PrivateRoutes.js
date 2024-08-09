import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = (props) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  if (!isAuth) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return <div>{props.children}</div>;
};
export default PrivateRoutes;
