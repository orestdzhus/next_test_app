"use client";

import {useSearchParams} from "next/navigation";

interface IProps {
    match: any;
}

export default function RecentMatch({match}: IProps) {
    const searchParams = useSearchParams();
    const playerName = searchParams.get("name");
    // console.log(match);

    const {metadata: {map, game_start_patched, game_length}, players: {all_players}, teams} = match;

    const player = all_players.find((item) => item.name === "Fujii");
    console.log(player);
    const colorOfTheTeam = player.team.toLowerCase();

    console.log(player);

    const {assets: {agent: {small}}, stats: {kills, deaths, assists}} = player;

    const playerTeamResult = teams[colorOfTheTeam].has_won;


    const gameDuration = (game_length / 60).toFixed(1);

    return <div className="h-62 bg-gray-600 bg-10 m-5 text-white text-lg p-4">
        <h2>Map played - {map}</h2>
        <h2>Player`s team - {playerTeamResult ? "WIN" : "LOST"}</h2>
        <h2>Started at - {game_start_patched}</h2>
        <h2>Game duration - {gameDuration} minutes</h2>
        <div className="m-3">
            <header>Player`s KDA</header>
            <h3>Kills: {kills}</h3>
            <h3>Deaths: {deaths}</h3>
            <h3>Assists: {assists}</h3>
        </div>
        <img src={small} alt="xxx"/>


    </div>;
};