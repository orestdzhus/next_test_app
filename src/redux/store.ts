import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {playerReducer} from "@/redux/slices/player.slice";
import App from "next/app";


const rootReducer = combineReducers({
    playerReducer
});
export const setupStore = () => configureStore({
    reducer: rootReducer,
});

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

export type {
    RootState,
    AppStore,
    AppDispatch
};


