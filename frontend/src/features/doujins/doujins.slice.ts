import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface Doujin {
  title: string;
  author?: string;
  pageUrls: string[];
  tags?: string[];
}

export interface DoujinUrlData {
  title: string;
  url: string;
}

interface DoujinsState {
  doujins: Doujin[];
  doujinFocused: Doujin;

  doujinsUrlData: DoujinUrlData[];

  searchTagsInclude: string[];
  searchTagsExclude: string[];

  downloadSuccess: boolean;
}

const initialState: DoujinsState = {
  doujins: [],
  doujinFocused: { title: "", pageUrls: [] },
  doujinsUrlData: [],
  searchTagsInclude: ["mokou", "ke-ta", "japanese"],
  searchTagsExclude: [],
  downloadSuccess: false,
};

export const thunkDoujinsUrlData = createAsyncThunk(
  "doujins/fetchDoujinsUrlData",
  async (searchTagsInclude: string[]) => {
    const doujinsUrlData = await fetch("http://localhost/doujins/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchTagsInclude,
        downloadLimit: 50,
      }),
    }).then((res) => res.json());

    return doujinsUrlData;
  }
);

export const thunkDoujins = createAsyncThunk(
  "doujins/fetchDoujins",
  async (doujinsUrlData: DoujinUrlData[]) => {
    console.log("SANITY CHECK");
    fetch("http://localhost/doujins/download-batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doujinsUrlData }),
    });
  }
);

const doujinsSlice = createSlice({
  name: "doujins",
  initialState: initialState,
  reducers: {
    setDoujins(state, action: PayloadAction<Doujin[]>) {
      state.doujins = action.payload;
    },
    setDoujinFocused(state, action: PayloadAction<Doujin>) {
      state.doujinFocused = action.payload;
    },
    addTagInclude(state, action: PayloadAction<string>) {
      if (
        state.searchTagsInclude.find((tag) => tag === action.payload) ===
        undefined
      ) {
        state.searchTagsInclude.push(action.payload);
      }
    },
    deleteTagInclude(state, action: PayloadAction<string>) {
      state.searchTagsInclude = state.searchTagsInclude.filter(
        (tag) => tag !== action.payload
      );
    },
    setDownloadSuccess(state, action: PayloadAction<boolean>) {
      state.downloadSuccess = action.payload;
    },
  },
  extraReducers: {
    [thunkDoujinsUrlData.fulfilled.toString()]: (
      state,
      action: PayloadAction<DoujinUrlData[]>
    ) => {
      state.doujinsUrlData = action.payload;
    },
    [thunkDoujins.fulfilled.toString()]: (state) => {
      state.downloadSuccess = true;
    },
  },
});

export const selectSearchTagsInclude = (state: RootState) => {
  return state.doujins.searchTagsInclude;
};

export const selectDoujinsUrlData = (state: RootState) => {
  return state.doujins.doujinsUrlData;
};

export const selectDoujins = (state: RootState) => {
  return state.doujins.doujins;
};

export const selectDoujinFocused = (state: RootState) => {
  return state.doujins.doujinFocused;
};

export const selectDownloadSuccess = (state: RootState) => {
  return state.doujins.downloadSuccess;
};

export const {
  setDoujins,
  setDoujinFocused,
  addTagInclude,
  deleteTagInclude,
  setDownloadSuccess,
} = doujinsSlice.actions;
export const doujinsReducer = doujinsSlice.reducer;
