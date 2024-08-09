import { Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import Dashboard from "./components/Admin/Content/DashBoard";
import Login from "./components/Auth/Login";
import App from "./App";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import NotFound from "./components/NotFound";
import ManageQuiz from "./components/Admin/Content/Quiz/ManageQuiz";
import Questions from "./components/Admin/Content/Question/Questions";
import PrivateRoutes from "./routes/PrivateRoutes";
const Layout = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="users"
            element={
              <PrivateRoutes>
                <ListQuiz />
              </PrivateRoutes>
            }
          />
        </Route>
        <Route path="/quiz/:quizId" element={<DetailQuiz />} />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <Admin />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizs" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
    </>
  );
};
export default Layout;
