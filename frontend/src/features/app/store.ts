import { configureStore, Store } from "@reduxjs/toolkit";
import { doujinsReducer } from "../doujins/doujins.slice";

export const store = configureStore({
  reducer: {
    doujins: doujinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
