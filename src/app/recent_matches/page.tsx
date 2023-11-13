"use client";
import {useEffect} from "react";
import {useRouter} from 'next/router'
import {useSearchParams} from 'next/navigation'
import {useDispatch} from "react-redux";
import {playerActions} from "@/redux/slices/player.slice";
import {useAppSelector} from "@/hooks/redux.hooks";
import RecentMatch from "@/app/components/recentMatch";

export default function RecentMatches() {

    const searchParams = useSearchParams()
    const nameFromUrl = searchParams.get("name");
    const tagFromUrl = searchParams.get("tag");

    console.log(tagFromUrl, "TAAAGGGGGGG");

    const dispatch = useDispatch();

    const {recentMatches} = useAppSelector(state => state.playerReducer);


    useEffect(() => {
        // @ts-ignore
        dispatch(playerActions.getRecentMatches({name: nameFromUrl, tag: tagFromUrl}));

    }, [dispatch]);


    return <div>
        {recentMatches && recentMatches.map((item, index) => {

            if (!item) {
                console.log("NO ITEM");
                console.log(item);
            }

            return <RecentMatch key={index} match={item}/>;
        })}
    </div>;
};