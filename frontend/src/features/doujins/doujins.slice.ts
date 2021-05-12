import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../app/store";

export interface Doujin {
  title: string;
  author: string;
  pageUrls: string[];
  tags: string[];
}

export interface DoujinUrlData {
  title: string;
  url: string;
}

interface DoujinsState {
  doujins: Doujin[];
  doujinsUrlData: DoujinUrlData[];
  searchTagsInclude: string[];
  searchTagsExclude: string[];
}

const initialState: DoujinsState = {
  doujins: [],
  doujinsUrlData: [
    // {
    //   title:
    //     "(Shuuki Reitaisai 6) [Gekidoku Shoujo (ke-ta)] Protagonist (Touhou Project)",
    //   url: "https://nhentai.net/g/288576/",
    // },
    // {
    //   title:
    //     "(Reitaisai 16) [Gekidoku Shoujo (ke-ta)] GRAFFITI Vol. 4 (Touhou Project)",
    //   url: "https://nhentai.net/g/272636/",
    // },
    // {
    //   title: "(C84) [Gekidoku Shoujo (ke-ta)] ICE FLOWER (Touhou Project)",
    //   url: "https://nhentai.net/g/98161/",
    // },
    // {
    //   title:
    //     "(C94) [Gekidoku Shoujo (ke-ta)] Crazy Four Seasons (Touhou Project)",
    //   url: "https://nhentai.net/g/243578/",
    // },
    // {
    //   title:
    //     "(C81) [Gekidoku Shoujo (ke-ta, Hyuuga, Touma Nadare)] SLEEPING MAGE -Mahou no Mori no Nemurihime- Gekidoku Shoujo Publication Number VII (Touhou Project)",
    //   url: "https://nhentai.net/g/349629/",
    // },
  ],
  searchTagsInclude: ["marisa", "ke-ta", "japanese"],
  searchTagsExclude: [],
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
    fetch("http://localhost/doujins/download");
  }
);

const doujinsSlice = createSlice({
  name: "doujins",
  initialState: initialState,
  reducers: {
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
  },
  extraReducers: {
    [thunkDoujinsUrlData.fulfilled.toString()]: (
      state,
      action: PayloadAction<DoujinUrlData[]>
    ) => {
      state.doujinsUrlData = action.payload;
    },
  },
});

export const selectSearchTagsInclude = (state: RootState) => {
  return state.doujins.searchTagsInclude;
};

export const selectDoujinsUrlData = (state: RootState) => {
  return state.doujins.doujinsUrlData;
};

export const { addTagInclude, deleteTagInclude } = doujinsSlice.actions;
export const doujinsReducer = doujinsSlice.reducer;
