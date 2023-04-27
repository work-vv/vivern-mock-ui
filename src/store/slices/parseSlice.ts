import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchProject } from './projectSlice';
import { RootState } from '../index';
import { v4 as uuidv4 } from 'uuid';

type Parse = { id: string; variable: string; value: string | null; sample: { value: string; args: string } | null };

const parsesAdapter = createEntityAdapter<Parse>();

export const createDefaultParse = () => ({
  id: uuidv4(),
  variable: 'test',
  value: null,
  sample: null,
});

export const parseSlice = createSlice({
  name: 'parses',
  initialState: parsesAdapter.getInitialState(),
  reducers: {
    addParse: parsesAdapter.upsertOne,
    updateParse: parsesAdapter.updateOne,
    removeParse: parsesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      // @ts-ignore
      fetchProject.fulfilled,
      (state, action) => {
        parsesAdapter.upsertMany(
          state,
          // @ts-ignore
          action.payload.parses
        );
      }
    );
  },
});

export const {
  selectById: selectParseById,
  selectIds: selectParseIds,
  selectEntities: selectParseEntities,
  selectAll: selectAllParses,
  selectTotal: selectTotalParses,
  // @ts-ignore
} = parsesAdapter.getSelectors<RootState>((state) => state.parses);

export const { addParse, updateParse, removeParse } = parseSlice.actions;
export default parseSlice;
