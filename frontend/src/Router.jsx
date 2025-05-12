import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateProject from "./pages/createProject";
import ProjectPlayground from "./pages/ProjectPlayground";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CreateProject />} />
        <Route path="/project/:projectId" element={<ProjectPlayground/>}/>
      </Routes>
    </div>
  );
};

export default Router;
