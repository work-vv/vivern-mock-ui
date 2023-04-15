import React from "react";
import {selectAllProjects} from '../../store/slices/projectSlice';
import {useAppSelector} from "../../hooks";
import Card from "../../components/Card";
import {Link} from "react-router-dom";
import Button from "../../components/Button";

const ProjectList = () => {
  const projects = useAppSelector(selectAllProjects);

  return (
    <section className="project-list">
        <Link to="/projects/create">
            <Button title="New project" handleButtonClick={() => true} />
        </Link>
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
