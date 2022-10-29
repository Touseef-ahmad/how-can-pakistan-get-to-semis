// This table needs to be updated manually
const pointsTable = {
    IND: {
        team: 'IND',
        matchesPlayed: 2,
        won: 2,
        lost: 0,
        draw: 0,
        teamsPlayed: ['PAK', 'NED']
    },
    SA: {
        team: 'SA',
        matchesPlayed: 2,
        won: 1,
        lost: 0,
        draw: 1,
        teamsPlayed: ['BAN', 'ZIM']
    },
    ZIM: {
        team: 'ZIM',
        matchesPlayed: 2,
        won: 1,
        lost: 0,
        draw: 1,
        teamsPlayed: ['PAK', 'SA']
    },
    BAN: {
        team: 'BAN',
        matchesPlayed: 2,
        won: 1,
        lost: 1,
        draw: 0,
        teamsPlayed: ['SA', 'NED']
    },
    PAK: {
        team: 'PAK',
        matchesPlayed: 2,
        won: 0,
        lost: 2,
        draw: 0,
        teamsPlayed: ['IND', 'ZIM']
    },
    NED: {
        team: 'NED',
        matchesPlayed: 2,
        won: 0,
        lost: 2,
        draw: 0,
        teamsPlayed: ['IND', 'BAN']
    },
};

export const AllTeams = [
    'IND', 'PAK', 'SA', 'ZIM', 'BAN', 'NED'
];

let teamsYetToPlayMatches = []; // teams that have not played all 5 matches

const updateTeamsYetToPlayMatches = () => {
    teamsYetToPlayMatches = AllTeams.filter(team => pointsTable[team].matchesPlayed !== 5)
};


updateTeamsYetToPlayMatches();

let logs = [];
const logger = (newLog) => {
    logs.push(newLog)
}


const TeamsRankPoints = { // how strong a team is on paper
    IND: 10,
    PAK: 9,
    SA: 8,
    BAN: 8,
    ZIM: 7,
    NED: 6,
};

const getBiasedWinner = (team, oponent, favourite) => {
    if (team === favourite) {
        return [favourite, oponent];
    } else if (oponent === favourite) {
        return [favourite, team];
    }
};

/**
 * This is where all the Artificial Intelligence is ;)
 * In order for Pakistan no team should win more than 3 games
 * It's also very likely that india will win all their group matches
 */
const shouldTeamWinTheMatch = (team, oponent) => {
    if (team === 'PAK' || oponent === 'PAK') {
        return getBiasedWinner(team, oponent, 'PAK');
    }
    if (team === 'IND' || oponent === 'IND') {
        return getBiasedWinner(team, oponent, 'IND');
    }
    if (pointsTable[team].won + 1 <= 3 && pointsTable[oponent].won + 1 <= 3) {
        logger(`Outcome of ${team} vs ${oponent} does not matter, simulator will pick the strong side on paper`);
        return TeamsRankPoints[team] - TeamsRankPoints[oponent] > 0 ? [team, oponent] : [oponent, team];
    }
    return pointsTable[team].won + 1 > 3 ? [oponent, team] : [team, oponent];
};

const getOponentForNextMatch = (teamName) => {
    const {
        teamsPlayed
    } = pointsTable[teamName];
    return AllTeams.filter(team => teamName !== team && !teamsPlayed.includes(team))[0];
};

const updatePointsTable = (winner, loser) => {
    pointsTable[winner].matchesPlayed = pointsTable[winner].matchesPlayed + 1;
    pointsTable[winner].won = pointsTable[winner].won + 1;
    pointsTable[loser].matchesPlayed = pointsTable[loser].matchesPlayed + 1;
    pointsTable[loser].lost = pointsTable[loser].lost + 1;
    pointsTable[winner].teamsPlayed.push(loser);
    pointsTable[loser].teamsPlayed.push(winner);
};

const simulateNextMatch = () => {
    const team = teamsYetToPlayMatches[0];
    const oponent = getOponentForNextMatch(team);
    const [winner, loser] = shouldTeamWinTheMatch(team, oponent);
    updatePointsTable(winner, loser);
    updateTeamsYetToPlayMatches();
    logger(`${team} plays  ${oponent}, winner = ${winner}, loser = ${loser}`);
};

export const simulate = () => {
    while (teamsYetToPlayMatches.length > 0) {
        simulateNextMatch();
    }
    return pointsTable;
}

export const getLogs = () => {
    return logs;
}