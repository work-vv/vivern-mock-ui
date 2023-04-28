import { fetchProject, selectAllProjects } from '../../store/slices/projectSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const ProjectList = () => {
  const projects = useAppSelector(selectAllProjects);
  const dispatch = useAppDispatch();

  const click = () => {
    const project = dispatch(fetchProject());
  };

  return (
    <section>
      <div className="container-flex">
        <Link to="/projects/create">
          <Button title="New project" handleButtonClick={() => true} />
        </Link>
        <Button title="Import from file" handleButtonClick={() => true} />
        <Link to="/projects/import">
          <Button title="Import from server" handleButtonClick={() => true} />
        </Link>
      </div>
      <div className="container-flex">
        {projects.map(({ id, title, description }) => (
          <div key={id}>
            <div>
              <Link to={`/projects/${id}`}>
                <Card title={title} description={description} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
