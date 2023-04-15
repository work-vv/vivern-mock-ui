import React from 'react';
import './App.scss';
import Header from "./components/Header";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Error from "./pages/Error";
import Project from "./pages/Projects/Project";
import ProjectList from "./pages/Projects/ProjectList";
import ProjectForm from "./pages/Projects/ProjectForm";
import Footer from "./components/Footer";

function App() {
  return (<>
    <Header/>
    <main className="main">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<ProjectList/>}/>
        <Route path="/projects/create" element={<ProjectForm/>}/>
        <Route path="/projects/:projectId" element={<Project/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </main>
    <Footer />
  </>);
}

export default App;
