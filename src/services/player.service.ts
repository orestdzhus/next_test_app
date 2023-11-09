import {playerInstance} from "@/services/player.instance";

export const playerService = {
    getLeaderBoard: () => playerInstance.get('/valorant/v2/leaderboard/eu?start=1000'),

    getRecentMatches: (gameName: string, tagLine: string) => playerInstance.get(`/valorant/v3/matches/eu/${gameName}/${tagLine}`),
};
