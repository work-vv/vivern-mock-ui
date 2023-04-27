import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchProject } from './projectSlice';
import { RootState } from '../index';
import { v4 as uuidv4 } from 'uuid';

type Response = { id: string; status: number; body: { type: string; value: string } | null };

const responsesAdapter = createEntityAdapter<Response>();

export const createDefaultResponse = () => ({
  id: uuidv4(),
  body: {
    type: 'template',
    value: 'OK',
  },
  status: 200,
});

export const responseSlice = createSlice({
  name: 'responses',
  initialState: responsesAdapter.getInitialState(),
  reducers: {
    addResponse: responsesAdapter.upsertOne,
    updateResponse: responsesAdapter.updateOne,
    removeResponse: responsesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      // @ts-ignore
      fetchProject.fulfilled,
      (state, action) => {
        responsesAdapter.upsertMany(
          state,
          // @ts-ignore
          action.payload.responses
        );
      }
    );
  },
});

export const {
  selectById: selectResponseById,
  selectIds: selectResponseIds,
  selectEntities: selectResponseEntities,
  selectAll: selectAllResponses,
  selectTotal: selectTotalResponses,
} = responsesAdapter.getSelectors<RootState>((state) => state.responses);

export const { addResponse, updateResponse, removeResponse } = responseSlice.actions;
export default responseSlice;
