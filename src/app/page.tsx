"use client";

import {useEffect} from "react";
import {useAppDispatch} from "@/hooks/redux.hooks";
import {playerActions} from "@/redux/slices/player.slice";
import Leaderboard from "@/app/components/leaderboard";

export default function Home() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(playerActions.getLeaderBoard());
    }, []);

    return (
        <div>
            <Leaderboard/>
        </div>
    );
};