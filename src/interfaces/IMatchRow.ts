import { ICreateMatch, IMatch, IPickTeam } from '.'
import { ITeam } from './ITeam'

export interface IMatchRow {
  id: number
  leagueName?: string
  date?: string
  time?: string
  team1?: ITeam
  team2?: ITeam
  draw?: ITeam
}

export function getIMatchRowFrom(data: IMatch, pickTeams?: IPickTeam[]): IMatchRow {

  const times = data.date.split('T')[1].split(':')

  const teamSelectedlist = [false, false, false]

  if (pickTeams) {
    for (const pt of pickTeams) {
      if (pt.match.id == data.id) {
        if (pt.team_index == 0) {
          teamSelectedlist[0] = true
        } else if (pt.team_index == 1) {
          teamSelectedlist[1] = true
        } else if (pt.team_index == 2) {
          teamSelectedlist[2] = true
        }
      }
    }
  }

  const dates = data.date.split('T')[0].split('-')

  return {
    id: data.id,
    leagueName: data.match_title,
    date: `${dates[1]}-${dates[2]}`,
    time: `${times[0]}:${times[1]}`,
    team1: {
      name: data.team1,
      score: data.team1_score,
      selected: teamSelectedlist[0],
    },
    draw: {
      name: 'Draw',
      score: data.draw_score,
      selected: teamSelectedlist[1],
    },
    team2: {
      name: data.team2,
      score: data.team2_score,
      selected: teamSelectedlist[2],
    },
  } as IMatchRow
}

export function getICreateMatchFrom(data: IMatchRow): ICreateMatch {
  return {
    match_title: data.leagueName,
    date: `${data.date}T${data.time}`,
    team1: data.team1?.name,
    team1_score: data.team1?.score,
    draw_score: data.draw?.score,
    team2: data.team2?.name,
    team2_score: data.team2?.score,
  } as ICreateMatch
}
