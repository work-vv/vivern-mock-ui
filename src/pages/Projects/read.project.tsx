import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {selectProject} from "../../store/projectSlice";

const ReadProject = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const project = useAppSelector(selectProject(projectId as string));
    return <>
        <p>Project</p>
        <p>{project?.id}</p>
        <p>{project?.title}</p>
        <p>{project?.pathPrefix}</p>
        <p>{project?.operations.map(operation => <p key={operation.id}><Link to={`/projects/${project.id}/operations/${operation.id}`}>{operation.request.route}</Link></p>)}</p>
        <Link to={`/projects/${projectId}/operations/create`}>Create a Project</Link>
    </>
}
export default ReadProject
