import { createSlice } from "@reduxjs/toolkit";
import { userState } from "../Types/SliceTypes";

const userSlice = createSlice({
    name : "user",
    initialState : {name: "", picture: ""} as userState,
    reducers : {
        addUser : (state , action)=> {
            return {
                ...state,
                name : action.payload.name,
                picture : action.payload.picture,
            }
        }
    }
});

export default userSlice.reducer;
export const { addUser } = userSlice.actions;