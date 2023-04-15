import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {fetchProject} from './projectSlice';
import {RootState} from "../index";
import {selectRequestById} from "./requestSlice";

const operationsAdapter = createEntityAdapter();

export const createOperation = (requestId: string, responseId: string) =>  ({
  id: uuidv4(),
  request: requestId,
  requestTaskGroups: [],
  responses: [responseId],
  operationTaskGroups: [],
})
export const operationSlice = createSlice({
  name: 'operations',
  initialState: operationsAdapter.getInitialState(),
  reducers: {
    addOperation: operationsAdapter.upsertOne,
    removeOperation: operationsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      // @ts-ignore
      fetchProject.fulfilled,
      (state, action) => {
        operationsAdapter.upsertMany(
          state,
          // @ts-ignore
          action.payload.operations
        );
      }
    );
  },
});

export const {
  selectById: selectOperationById,
  selectIds: selectOperationIds,
  selectEntities: selectOperationEntities,
  selectAll: selectAllOperations,
  selectTotal: selectTotalOperations,
} = operationsAdapter.getSelectors<RootState>((state) => state.operations);

export const selectAllOperationsWithRequests = (state: any, ids: any[]) => ids.map(id => {
  const operation = selectOperationById(state, id);
  // @ts-ignore
  const {route, method}  = selectRequestById(state, operation.request);
  // @ts-ignore
  return {route, method, ...operation}
});

export const {addOperation, removeOperation} = operationSlice.actions;
export default operationSlice;
