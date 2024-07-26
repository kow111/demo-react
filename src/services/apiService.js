import axios from "../utils/axiosCustomize";

const postCreateUser = (email, password, username, role, image) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", image);
  return axios.post("v1/participant", form);
};
const postCreateQuiz = (description, name, difficulty, quizImage) => {
  const form = new FormData();
  form.append("description", description);
  form.append("name", name);
  form.append("difficulty", difficulty);
  form.append("quizImage", quizImage);
  return axios.post("v1/quiz", form);
};
const getAllUser = () => {
  return axios.get("v1/participant/all");
};

const putUpdateUser = (id, username, role, image) => {
  const form = new FormData();
  form.append("id", id);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", image);
  return axios.put("v1/participant", form);
};
const deleteUser = (userId) => {
  return axios.delete("v1/participant", { data: { id: userId } });
};
const getUserByPage = (page, limit) => {
  return axios.get(`v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (email, password) => {
  return axios.post("v1/login", {
    email: email,
    password: password,
  });
};
const postRegister = (email, username, password) => {
  return axios.post("v1/register", {
    email: email,
    username: username,
    password: password,
  });
};
const getQuizByUser = () => {
  return axios.get("v1/quiz-by-participant");
};
const getDataQuiz = (quizId) => {
  return axios.get(`v1/questions-by-quiz?quizId=${quizId}`);
};
const submitAnswer = (data) => {
  return axios.post(`v1/quiz-submit`, { ...data });
};
const getAllQuizForAdmin = () => {
  return axios.get(`v1/quiz/all`);
};
export {
  postCreateUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  getUserByPage,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  submitAnswer,
  postCreateQuiz,
  getAllQuizForAdmin,
};
