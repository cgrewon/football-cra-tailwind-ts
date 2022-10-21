// export interface IPickTeam {
//   id: number
//   team_index: number
//   created_at: Date
//   updated_at: Date
// }

export interface IMatch {
  id: number
  match_title: string
  date: string
  team1: string
  team1_score: number
  team2: string
  team2_score: number
  draw_score: number
  created_at: Date
  updated_at: Date
}

export interface ILeague {
  id: number
  name: string
  created_at: Date
  updated_at: Date
  matches: IMatch[]
  tickets: ITicket[]
}

export interface ILeagueRes {
  data: ILeague[]
  conut: number
}

export interface ICreateMatch {
  match_title: string
  date: string
  team1: string
  team1_score: number
  draw_score: number
  team2: string
  team2_score: number
}

export interface ICreateLeague {
  name: string
  matches: ICreateMatch[]
}

export interface ICreatePickTeam {
  team_index: number
  match_id: number
}
export interface ICreateTicket {
  league_id: number
  user_name: string
  pickTeams: ICreatePickTeam[]
}

export interface IPickTeam {
  id: number
  team_index: number
  match: IMatch
}
export interface ITicket {
  id: number
  user_name: string
  created_at: Date
  updated_at: Date
  pickTeams: IPickTeam[]
  league: ILeague
}

export interface DeleteResult {
  affected: number
}

export function getPickTeamsForMatchFrom(ticket: ITicket, matchId: number): IPickTeam[] {
  return ticket.pickTeams.filter((pickTeam) => pickTeam.match.id == matchId)
}
