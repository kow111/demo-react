import "./App.scss";
import React from "react";
import Header from "./components/Header/header";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <div>
        <button>
          <Link to="/users">Go to user Page</Link>
        </button>
        <button>
          <Link to="/admin">Go to admin Page</Link>
        </button>
      </div>
    </div>
  );
};

export default App;
