import React from "react";
import ReactDOM from "react-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Auth,
  Dashboard,
  CommunityQuizzes,
  CreateQuiz,
  MyQuizzes,
  Profile,
  TakeQuiz,
  ViewQuiz,
  ViewResults,
} from "./components";

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/community-quizzes" element={<CommunityQuizzes />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/my-quizzes" element={<MyQuizzes />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/take-quiz" element={<TakeQuiz />} />
      <Route path="/view-quiz" element={<ViewQuiz />} />
      <Route path="/view-results" element={<ViewResults />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);


