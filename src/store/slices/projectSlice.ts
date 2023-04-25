import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {getProject} from '../../services/adminApi';
import {RootState} from "../index";
import {normalizeConfig} from "../../services/normalizer";

type Project = {
  id: string;
  title: string,
  description: string,
  pathPrefix: string,
  projectVariables: string[],
  operations: string[]
}

const projectsAdapter = createEntityAdapter<Project>();

export const fetchProject = createAsyncThunk(
  'projects/fetchProject',
  async () => {
    const data = await getProject();
    const normalized = normalizeConfig(data);
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

// @ts-ignore
export const selectAllEntities = ({projects, operations, requests, responses, parses}) => ({
  projects: projects.entities,
  operations: operations.entities,
  requests: requests.entities,
  responses: responses.entities,
  parses: parses.entities
});

export const {addProject, updateProject, removeProject} = projectSlice.actions;

export default projectSlice;
