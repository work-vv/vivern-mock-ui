import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import {fetchProject} from './projectSlice';
import {RootState} from "../index";
import {HttpRequestMethods} from "../../types";

type Request = { id: string; method: string, route: string, parses: string[]}
const requestsAdapter = createEntityAdapter<Request>();

export const createDefaultRequest = () => ({
  id: uuidv4(),
  route: '/',
  method: HttpRequestMethods.GET,
  parses: [],
})
export const requestSlice = createSlice({
  name: 'requests',
  initialState: requestsAdapter.getInitialState(),
  reducers: {
    addRequest: requestsAdapter.upsertOne,
    updateRequest: requestsAdapter.updateOne,
    removeRequest: requestsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      // @ts-ignore
      fetchProject.fulfilled,
      (state, action) => {
        requestsAdapter.upsertMany(
          state,
          // @ts-ignore
          action.payload.requests
        );
      }
    );
  },
});

export const {
  selectById: selectRequestById,
  selectIds: selectRequestIds,
  selectEntities: selectRequestEntities,
  selectAll: selectAllRequests,
  selectTotal: selectTotalRequests,
} = requestsAdapter.getSelectors<RootState>((state) => state.requests);

export const selectAllRequestsById = (state: any, ids: any[]) => ids.map(({id, operationId}) => {
  const request = selectRequestById(state, id);
  // @ts-ignore
  return {...request, operationId}
});
export const {addRequest, updateRequest, removeRequest} = requestSlice.actions;
export default requestSlice;
