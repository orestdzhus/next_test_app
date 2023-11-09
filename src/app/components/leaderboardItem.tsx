"use client";

import {FC} from "react";

interface IProps {
    player: any;
}

export default function LeaderboardItem({player}: IProps) {

    console.log(player,"Player");

    return <h2>{player.gameName}</h2>;
};