import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import {getProject} from '../../services/adminApi';
import {normalize, schema} from 'normalizr';
import {RootState} from "../index";

export const parseEntity = new schema.Entity('parses', {});
export const requestEntity = new schema.Entity('requests', {
  parses: parseEntity,
});
export const responseEntity = new schema.Entity('responses', {
  parses: parseEntity,
});
export const operationEntity = new schema.Entity('operations', {
  request: requestEntity,
  responses: [responseEntity]
});

type Project = { id: string; title: string, description: string, pathPrefix: string, projectVariables: string[], operations: string[]}
export const projectEntity = new schema.Entity<Project>('projects', {
  operations: [operationEntity],
});

const projectsAdapter = createEntityAdapter<Project>();

export const fetchProject = createAsyncThunk(
  'projects/fetchProject',
  async (id: string) => {
    const data = await getProject(id);
    const normalized = normalize(data, projectEntity);
    return normalized.entities;
  }
);

export const projectSlice = createSlice({
  name: 'projects',
  initialState: projectsAdapter.getInitialState(),
  reducers: {
    addProject: projectsAdapter.upsertOne,
    updateProject: projectsAdapter.updateOne,
    removeProject: projectsAdapter.removeOne,
  },
  extraReducers: {
    // @ts-ignore
    [fetchProject.fulfilled]: (state, action) => {
      projectsAdapter.upsertMany(
        state,
        action.payload.projects
      );
    },
  },
});

export const {
  selectById: selectProjectById,
  selectIds: selectProjectIds,
  selectEntities: selectProjectEntities,
  selectAll: selectAllProjects,
  selectTotal: selectTotalProjects,
} = projectsAdapter.getSelectors<RootState>((state) => state.projects);

// const selectProjectById1 = (id: string) => (state: { projects: EntityState<Project>; operations: EntityState<unknown>; }, id: string) => selectById(state, id);


export const {addProject, updateProject, removeProject} = projectSlice.actions;

export default projectSlice;
