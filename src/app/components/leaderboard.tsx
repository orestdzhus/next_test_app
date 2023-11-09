"use client";

import {useAppSelector} from "@/hooks/redux.hooks";
import LeaderboardItem from "@/app/components/leaderboardItem";
import React, {useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import Link from "next/link";
export default function Leaderboard() {

    const {leaderboard: items} = useAppSelector(state => state.playerReducer);

    console.log(items);
    // const items = Array.from({length: 100}, (_, index) => `Item ${index + 1}`);
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
                        <Link onClick={handleLinkClick}
                              key={index} href={`/recent_matches?name=${item.gameName}&tag=${item.tagLine}`}
                              className={'block hover:bg-gray-200 text-blue-500 text-center m-3 text-2xl'}
                        >{item.gameName}</Link>
                    </div>
                ))}
            </InfiniteScroll>}
        </div>
    );
};