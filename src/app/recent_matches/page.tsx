"use client";
import {useEffect, useState} from "react";
import {useSearchParams} from 'next/navigation'
import RecentMatch from "@/app/components/recentMatch";

export default function RecentMatches() {

    const searchParams = useSearchParams()
    const nameFromUrl = searchParams.get("name");
    const tagFromUrl = searchParams.get("tag");
    const [recentMatches, setRecentMatches] = useState([]);

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