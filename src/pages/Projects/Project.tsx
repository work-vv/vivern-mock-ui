import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  updateProject,
  selectProjectById,
} from '../../store/slices/projectSlice';
import {
  addOperation,
  createOperation,
  selectAllOperationsWithRequests,
} from '../../store/slices/operationSlice';
import Operation from '../../components/Operation/Operation';
import Button from '../../components/Button';
import React, { useState } from 'react';
import {
  addResponse,
  createDefaultResponse,
} from '../../store/slices/responseSlice';
import {
  addRequest,
  createDefaultRequest,
} from '../../store/slices/requestSlice';
import './project.scss';
import Label from '../../components/Label';
import Title from '../../components/Title';
import Input from '../../components/Form/Input';
import Environment from '../../components/Environment/Environment';
import EnvironmentList from '../../components/Environment/EnvironmentList';

const Project = () => {
  const dispatch = useAppDispatch();
  const [selectedOperation, setSelectedOperation] = useState();
  const { projectId } = useParams<{ projectId: string }>();
  const project = useAppSelector((state) =>
    selectProjectById(state, projectId as string),
  );
  if (!project) {
    throw new Error('Not Found');
  }
  const operations = project.operations || [];
  // @ts-ignore
  const operationsWithRequests = useAppSelector((state) =>
    selectAllOperationsWithRequests(state, operations),
  );

  const handleCreateOperation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const request = dispatch(addRequest(createDefaultRequest()));
    const response = dispatch(addResponse(createDefaultResponse()));
    const operation = dispatch(
      addOperation(createOperation(request.payload.id, response.payload.id)),
    );
    const updatedOperations = [...operations, operation.payload.id];
    dispatch(
      updateProject({
        id: projectId as string,
        changes: { operations: updatedOperations },
      }),
    );
  };

  const handleOperationClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // @ts-ignore
    const selectedOperation = operationsWithRequests.find(
      (operation) => operation.id === e.currentTarget.id,
    );
    setSelectedOperation(selectedOperation);
  };

  const showOperation = selectedOperation ? (
    <Operation operation={selectedOperation} />
  ) : (
    <div className="ba">Select operation</div>
  );

  return (
    <section className="page container container--flex">
      <div className="operations">
        <Button
          classname="operations__button"
          title={'+'}
          handleButtonClick={handleCreateOperation}
        />
        <Input
          inputName="filter"
          inputValue=""
          inputPlaceholder="Filter"
          handleInputChange={() => null}
        />

        {operationsWithRequests.map(({ id, route, method }) => (
          <div
            className="operation"
            id={id}
            key={id}
            onClick={handleOperationClick}
          >
            {route} <Label title={method} />
          </div>
        ))}
      </div>
      <div className="operation-details">{showOperation}</div>
    </section>
  );
};
export default Project;
