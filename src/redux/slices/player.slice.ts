import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {playerService} from "@/services/player.service";
import {AxiosError} from "axios";
import {act} from "react-dom/test-utils";

interface IState {
    leaderboard: [];
    recentMatches: [];
}

const initialState: IState = {
    leaderboard: [],
    recentMatches: [],
};

const getLeaderBoard = createAsyncThunk<any, void>(
    'playerSlice/getLeaderBoard',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await playerService.getLeaderBoard();
            return data;
        }catch (e) {
            const err = e as AxiosError;
            // @ts-ignore
            return rejectWithValue(err.response.data);
        }
    }
);

const getRecentMatches = createAsyncThunk<any, any>(
    'playerSlice/getRecentMatches',
    async ({name, tag}, {rejectWithValue}) => {
        try {
            const {data: {data}} = await playerService.getRecentMatches(name, tag);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            console.log(e);
        }
    }
);

const slice = createSlice({
    name: "playerSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getLeaderBoard.fulfilled, (state, action) => {
                state.leaderboard = action.payload.players
            })
            .addCase(getRecentMatches.fulfilled, (state, action) => {
                state.recentMatches = action.payload;
            }),
});

const {reducer: playerReducer, actions} = slice;

const playerActions = {...actions, getLeaderBoard, getRecentMatches};

export {
    playerReducer,
    playerActions
};



