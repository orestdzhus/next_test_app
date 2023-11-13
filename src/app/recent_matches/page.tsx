"use client";
import {useEffect, useState} from "react";
import {useSearchParams} from 'next/navigation'
import {useDispatch} from "react-redux";
import {playerActions} from "@/redux/slices/player.slice";
import {useAppSelector} from "@/hooks/redux.hooks";
import RecentMatch from "@/app/components/recentMatch";

export default function RecentMatches() {

    const searchParams = useSearchParams()
    const nameFromUrl = searchParams.get("name");
    const tagFromUrl = searchParams.get("tag");
    const [recentMatches, setRecentMatches] = useState([]);

    const dispatch = useDispatch();

    // const {recentMatches} = useAppSelector(state => state.playerReducer);

    // useEffect(() => {
    //     // @ts-ignore
    //     dispatch(playerActions.getRecentMatches({name: nameFromUrl, tag: tagFromUrl}));
    // }, [dispatch]);

    useEffect(() => {
        fetch(`https://api.henrikdev.xyz/valorant/v3/matches/eu/${nameFromUrl}/${tagFromUrl}`)
            .then(value => value.json())
            .then(({data}) => setRecentMatches(data));
    }, []);

    return <div>
        {recentMatches && recentMatches.map((item, index) => {
            return <RecentMatch key={index} match={item}/>;
        })}
    </div>;
};