import React from 'react';
import './App.scss';
import Header from "./components/Header";
import Home from "./pages/home";
import {Route, Routes} from "react-router-dom";
import Error from "./pages/error";
import {IndexProject, CreateProject, ReadProject} from "./pages/Projects";
import {IndexOperation, CreateOperation, ReadOperation} from "./pages/Operations"

function App() {
  return (<>
    <Header/>
    <main className="main">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/projects" element={<IndexProject/>}/>
        <Route path="/projects/create" element={<CreateProject/>}/>
        <Route path="/projects/:projectId" element={<ReadProject/>}/>
        <Route path="/projects/:projectId/operations" element={<IndexOperation/>}/>
        <Route path="/projects/:projectId/operations/create" element={<CreateOperation/>}/>
        <Route path="/projects/:projectId/operations/:operationId" element={<ReadOperation/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </main>
  </>);
}

export default App;
