import {configureStore} from '@reduxjs/toolkit';
import themeReducer from "./Slice/ThemeSlice";
import LogInReducer from "./Slice/LogInSlice";
import userReducer from "./Slice/userSlice";

const store = configureStore({
    reducer : {
        themes: themeReducer,
        LogIn: LogInReducer,
        user: userReducer,
    }
})

export default store;