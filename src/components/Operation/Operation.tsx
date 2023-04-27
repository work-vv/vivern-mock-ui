import './operation.scss';
import Request from './Request';
import Response from './Response';

type OperationProps = {
  operation: { request: string; responses: string[] };
};

const Operation = ({ operation }: OperationProps) => {
  const { request, responses } = operation;
  return (
    <div>
      <Request requestId={request} />
      <h3>Responses</h3>
      {responses.map((responseId) => (
        <Response key={responseId} responseId={responseId} />
      ))}
    </div>
  );
};
export default Operation;
