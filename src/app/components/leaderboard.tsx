"use client";

import {useAppDispatch, useAppSelector} from "@/hooks/redux.hooks";
import LeaderboardItem from "@/app/components/leaderboardItem";
import React, {useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import Link from "next/link";
import {playerActions} from "@/redux/slices/player.slice";

export default function Leaderboard() {

    const {leaderboard: items} = useAppSelector(state => state.playerReducer);


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(playerActions.getLeaderBoard());
    }, []);

    const itemsPerPage = 1000;

    const [itemsToShow, setItemsToShow] = useState(items.slice(0, itemsPerPage));
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    if (items.length === 0) {
        return null
    }
    const loadMore = () => {
        const nextPage = currentPage + 1;
        const start = (nextPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        if (end >= items.length) {
            setHasMore(false);
        } else {
            const newItems = items.slice(start, end);
            setItemsToShow((prevItems) => [...prevItems, ...newItems]);
            setCurrentPage(nextPage);
        }
    };

    const handleLinkClick = () => {

    };

    return (

        <div>
            {items && <InfiniteScroll
                pageStart={1}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div key={0}>Loading ...</div>}
            >
                {itemsToShow.map((item, index) => (
                    <div key={index}>
                        <Link
                            className={'block hover:bg-gray-200 text-blue-500 text-center m-3 text-2xl'}
                            key={index} href={{
                            pathname: `/recent_matches`,
                            query: {
                                name: item.gameName,
                                tag: item.tagLine,
                                puuid: item.puuid,
                            },
                        }}>{item.gameName}</Link>
                    </div>
                ))}
            </InfiniteScroll>}
        </div>
    );
};