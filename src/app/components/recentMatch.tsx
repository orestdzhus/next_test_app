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


    if (!match || !match.metadata || !match.players || !match.players.all_players || !match.teams) {
        // Якщо дані не існують, можна повернути або вивести помилку
        return <div>No data available</div>;
    }

    const player = all_players.find((item: any) => item.puuid === playerPuuid);

    if (!player) {
        return <div></div>;
    }


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
        <div className="h-62 bg-10 bg-gray-300 m-5 text-amber-100 text-lg p-4 shadow-lg shadow-gray-700">

            <div className="flex">
                <div>
                    <img className="shadow-lg shadow-gray-800" style={{width: 170, height: 320}} src={large} alt="large"/>
                    <div className="text-3xl m-2 text-black font-bold font-mono ">{playerName}</div>
                </div>

                <div className="m-3 ml-8 text-gray-800 font-mono decoration-1 text-2xl">
                    <h2 className="m-3">Map played - {map}</h2>
                    <h2 className="m-3">Player`s team - {gameResult}</h2>
                    <h2 className="m-3">Started at - {game_start_patched}</h2>
                    <h2 className="m-3">Game duration - {gameDuration} minutes</h2>
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
                            <img className="shadow-lg shadow-gray-500" src={small} alt="xxx"/>
                            <div className="text-neutral-900 font-extrabold font-mono m-2">Player`s agent</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>);
};