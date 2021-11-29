import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// configureStore will help keep track of state updates and setup some middleware
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Infer the 'RootState' and 'AddDispatch' types from the store itself
export type AppDispatch = typeof store.dispatch;
// Inferred type: {user: userReducer}
export type RootState = ReturnType<typeof store.getState>;
