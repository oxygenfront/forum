import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    currentPath: "/admin",
}
export const AdminSlice = createSlice({
    name:"changing",
    initialState,
    reducers: {
        changingPages: (state, action) => {
            state.currentPath = action.payload;
        }
    }
})

export const {changingPages} = AdminSlice.actions;