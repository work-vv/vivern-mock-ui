import React from "react";
import {selectAllProjects} from '../../store/slices/projectSlice';
import {useAppDispatch, useAppSelector} from "../../hooks";
import Card from "../../components/Card";
import {Link} from "react-router-dom";
import Button from "../../components/Button";
import FileInput from "../../components/Form/FileInput";
import {fetchProject} from "../../store/slices/projectSlice";

const ProjectList = () => {
  const projects = useAppSelector(selectAllProjects);
  const dispatch = useAppDispatch();

  const handleImportfromServer = () => {
      dispatch(fetchProject())
  }

    return (
    <section className="project-list">
        <Link to="/projects/create">
            <Button title="New project" handleButtonClick={() => true} />
        </Link>
        <FileInput title="import from file" handleInputChange={e => null} />
        <Button title="Import from server" handleButtonClick={handleImportfromServer} />
        <div className="container container--flex" >
            {projects.map(({id, title, description}) => (
                <div key={id}>
                    <div><Link to={`/projects/${id}`}><Card title={title} description={description}/></Link></div>
                </div>
            ))}
        </div>
    </section>
  );
}
export default ProjectList
