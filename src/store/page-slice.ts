import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: { pageLinks: string[]; currIdx: number } = {
  pageLinks: [],
  currIdx: 0,
};
const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    clearPageState: (state) => {
        state.pageLinks=[];
        state.currIdx=0;
    },
    initialStorePageLinks: (state, action: PayloadAction<string[]>) => {
      action.payload.map((item) => state.pageLinks.push(item));
    },
    storePageLink: (state, action) => {
      state.pageLinks.push(action.payload);
    },
    incCurrIdx: (state) => {
      state.currIdx++;
    },
    decCurrIdx: (state) => {
      state.currIdx--;
    },
  },
});

export const pageActions = pageSlice.actions;

export default pageSlice;
