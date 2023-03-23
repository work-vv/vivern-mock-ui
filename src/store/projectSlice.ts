import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './index';
import {IProject, IOperation, IOperationRequest, ITask, IOperationResponse, HttpRequestMethods} from '../types';
import {v4 as uuidv4} from 'uuid';

type ProjectStateType = Omit<IProject, 'operations'>;
type OperationStateType = Pick<IOperation, 'id' | 'projectId'>;

type initialStateType = {
  projectList: ProjectStateType[],
  operationList: OperationStateType[],
  requestList: IOperationRequest[],
  requestTaskList: ITask[],
  responseList: IOperationResponse[],
  operationTasksList: ITask[],
};

const initialState: initialStateType = {
  projectList: [],
  operationList: [],
  requestList: [],
  requestTaskList: [],
  responseList: [],
  operationTasksList: [],
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectStateType>) => {
      state.projectList.push(action.payload);
    },
    addOperation: (state, action: PayloadAction<OperationStateType>) => {
      state.operationList.push(action.payload);
    },
    addRequest: (state, action: PayloadAction<IOperationRequest>) => {
      state.requestList.push(action.payload);
    },
    addRequestTask: (state, action: PayloadAction<ITask>) => {
      state.requestTaskList.push(action.payload);
    },
    addResponse: (state, action: PayloadAction<IOperationResponse>) => {
      state.responseList.push(action.payload);
    },
    addOperationTask: (state, action: PayloadAction<ITask>) => {
      state.operationTasksList.push(action.payload);
    },
  },
});

export const {addProject, addOperation} = projectSlice.actions;
export const selectProjectList = () => (state: RootState) => state.project.projectList;
export const selectProject = (projectId: string) => (state: RootState) => {
  const project = state.project.projectList.find(project => project.id === projectId)
  const operations = selectOperationList(projectId)(state)
  return project ? {...project, operations} : null
};

const selectOperationActions = (operationId: string) => (state: RootState) => {
  return {
    request: selectRequest(operationId)(state) || {
      operationId: operationId,
      route: '/',
      method: HttpRequestMethods.GET,
      parses: []
    },
    requestTaskGroups: [],
    responses: selectResponses(operationId)(state),
    operationTaskGroups: [],
  }
}

export const selectOperationList = (projectId: string) => (state: RootState) => state.project.operationList.filter(
  operation => operation.projectId === projectId
).map((operation): IOperation => {
  const operationActions = selectOperationActions(operation.id)(state)
  return {
    ...operation,
    ...operationActions
  }
});

export const selectOperation = (projectId: string, operationId: string) => (state: RootState): IOperation | null => {
  const operation = state.project.operationList.find(
    operation => operation.projectId === projectId);
  const operationActions = selectOperationActions(operationId)(state)
  return operation ? {
    ...operation,
    ...operationActions
  } : null
}

export const selectRequest = (operationId: string) => (state: RootState) => {
  return state.project.requestList.find(
    request => request.operationId === operationId)
}

export const selectResponses = (operationId: string) => (state: RootState) => state.project.responseList.filter(
  response => response.operationId === operationId
);

export default projectSlice.reducer;
