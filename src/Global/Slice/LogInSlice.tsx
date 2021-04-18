import { createSlice } from "@reduxjs/toolkit";
import { LogInState } from "../Types/SliceTypes";

const initialState = { value: false } as LogInState;

const LogInSlice = createSlice({
    name: "Authentication",
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setLoggedIn } = LogInSlice.actions;
export default LogInSlice.reducer;