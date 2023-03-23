import {useAppSelector} from "../../hooks";
import {Link} from "react-router-dom";
import {selectProjectList} from "../../store/projectSlice";

const IndexProjects = () => {
    const projectList = useAppSelector(selectProjectList());
    return <>
        <h3>Project List</h3>
        {projectList.map(project => <p key={project.id}><Link to={`/projects/${project.id}`}>{project.title}</Link></p>)}
        <Link to="/projects/create">Create a Project</Link>
    </>
}
export default IndexProjects
