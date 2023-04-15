import {configureStore} from '@reduxjs/toolkit';

import {projectSlice} from './slices/projectSlice';
import operationSlice from "./slices/operationSlice";
import requestSlice from "./slices/requestSlice";
import responseSlice from "./slices/responseSlice";
import parseSlice from "./slices/parseSlice";

export const store = configureStore({
  reducer: {
    projects: projectSlice.reducer,
    operations: operationSlice.reducer,
    requests: requestSlice.reducer,
    responses: responseSlice.reducer,
    parses: parseSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
