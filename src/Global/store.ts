import {configureStore} from '@reduxjs/toolkit';
import themeReducer from "./Slice/ThemeSlice";
import LogInReducer from "./Slice/ThemeSlice";

const store = configureStore({
    reducer : {
        themes: themeReducer,
        LogIn: LogInReducer,
    }
})

export default store;