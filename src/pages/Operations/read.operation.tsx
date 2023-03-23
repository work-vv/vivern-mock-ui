import {useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import {selectOperation} from "../../store/projectSlice";

const ReadOperation = () => {
  const {projectId} = useParams<{ projectId: string }>();
  const {operationId} = useParams<{ operationId: string }>();
  const operation = useAppSelector(selectOperation(projectId as string, operationId as string));

  return <>
    <p>Operation</p>
    <p>{operation?.id}</p>
    <p>{operation?.request.route}</p>
    <p>{operation?.request.method}</p>
  </>
}
export default ReadOperation
