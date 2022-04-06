import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiSliceState {
    loadingStatus: string,
    sidebarIsShown: boolean
}

const initialState: uiSliceState = {
    loadingStatus: "",
    sidebarIsShown: false
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoadingStatus(state, action: PayloadAction<string>){
            state.loadingStatus = action.payload;
        },
        showSidebar(state){
            state.sidebarIsShown = true
        },
        closeSidebar(state){
            state.sidebarIsShown = false
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;