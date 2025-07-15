export interface Standing {
    id: number;
    teamId: number;           
    points: number;
    wins: number;
    losses: number;
    played: number;
    penalties: number;
    forfeits: number;
    defaulted: number;
    pointScored: number;
    pointAgainst: number;
    pointDifference: number;
    seasonId: number;
}