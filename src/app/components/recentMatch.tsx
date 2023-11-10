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

    const {assets: {agent: {small}, card: {small: smallCard, large,wide}}, stats: {kills, deaths, assists}} = player;

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
        <div className="h-62 bg-10 bg-amber-400 m-5 text-black text-lg p-4 shadow-lg shadow-gray-700">

            <div className="flex">
                <div>
                    <img className="shadow-lg shadow-gray-800" style={{width: 170, height: 320}} src={large} alt="large"/>
                    <h1 className="text-3xl text-amber-300 p-4 hover:text-amber-900">{playerName}</h1>
                </div>

                <div className="m-3 text-neutral-800 decoration-1 text-2xl">
                    <h2>Map played - {map}</h2>
                    <h2>Player`s team - {gameResult}</h2>
                    <h2>Started at - {game_start_patched}</h2>
                    <h2>Game duration - {gameDuration} minutes</h2>
                    <div className="m-3 flex">
                        <div>
                            <header>Player`s KDA</header>
                            <div className="m-2">
                                <h3 className="text-xl">Kills: {kills}</h3>
                                <h3 className="text-xl">Deaths: {deaths}</h3>
                                <h3 className="text-xl">Assists: {assists}</h3>
                            </div>
                        </div>
                        <div className="ml-60">
                            <h1 className="text-white m-3">Player`s agent</h1>
                            <img src={small} alt="xxx"/>
                        </div>
                    </div>
                </div>

            </div>

        </div>);
};