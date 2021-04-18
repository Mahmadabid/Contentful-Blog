import { createSlice } from "@reduxjs/toolkit";
import { LogInState } from "../Types/SliceTypes";

const initialState = { value: false } as LogInState;

const LogInSlice = createSlice({
    name: "Authentication",
    initialState,
    reducers: {
        setLoggedIn: (state) => {
            state.value?state.value = false:state.value = true
        },
    },
});

export const { setLoggedIn } = LogInSlice.actions;
export default LogInSlice.reducer;