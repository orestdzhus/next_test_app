"use client";

import {useSearchParams} from "next/navigation";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

interface IProps {
    match: any;
}

export default function RecentMatch({match}: IProps) {
    const searchParams = useSearchParams();
    const playerName = searchParams.get("name");
    const playerPuuid = searchParams.get("puuid");

    const {metadata: {map, game_start_patched, game_length}, players: {all_players}, teams} = match;

    const player = all_players.find((item) => item.puuid === playerPuuid);

    if (!player) {
        return
    }

    console.log(player);

    const colorOfTheTeam = player.team.toLowerCase();

    const {assets: {agent: {small}, card: {small: smallCard}}, stats: {kills, deaths, assists}} = player;

    const playerTeamResult = teams[colorOfTheTeam]?.has_won;

    let gameResult = "";

    switch (playerTeamResult) {
        case true:
            gameResult = "Win";
            break;
        case false:
            gameResult = "Lost";
            break;
        case null:
            gameResult = "No result awailable";
            break;
        case undefined:
            gameResult = "No result";
            break;
    }

    const gameDuration = (game_length / 60).toFixed(1);

    return (
        <div className="h-62 bg-neutral-900 bg-10 m-5 text-white text-lg p-4">
            <h2>Map played - {map}</h2>
            <h2>Player`s team - {gameResult}</h2>
            <h2>Started at - {game_start_patched}</h2>
            <h2>Game duration - {gameDuration} minutes</h2>
            <div className="m-3">
                <header>Player`s KDA</header>
                <h3>Kills: {kills}</h3>
                <h3>Deaths: {deaths}</h3>
                <h3>Assists: {assists}</h3>
            </div>
            <img src={small} alt="xxx"/>
            <img src={smallCard} alt="card"/>
        </div>);
};