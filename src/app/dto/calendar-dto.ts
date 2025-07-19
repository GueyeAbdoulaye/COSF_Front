export interface CalendarDto {
  id: number;
  journeys: string;
  awaitTeamId: number;
  matchDate: Date;
  location: string;
  scoreHome: number;
  scoreAway: number;
  seasonId: number;
}
