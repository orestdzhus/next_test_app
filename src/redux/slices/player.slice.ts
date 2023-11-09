import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {playerService} from "@/services/player.service";
import {AxiosError} from "axios";

interface IState {
    leaderboard: [];
}

const initialState: IState = {
    leaderboard: [],
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

const getRecentMatches = createAsyncThunk<any, void>(
    'playerSlice/getRecentMatches',
    async (_, {rejectWithValue}) => {
        try {

        } catch (e) {

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

                // const amount = action.payload.players.slice(0,100)
                state.leaderboard = action.payload.players
            }),
});

const {reducer: playerReducer, actions} = slice;

const playerActions = {...actions, getLeaderBoard};

export {
    playerReducer,
    playerActions
};



