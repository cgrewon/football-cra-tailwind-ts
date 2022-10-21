

import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { ITicket } from '../interfaces'
import { IMatchRow } from '../interfaces/IMatchRow'
import { IMatchRowProps } from '../interfaces/IMatchRowProps'
import { useCurrentLeagueStore, useLeague } from '../store/store'
import { TeamBox } from './TeamBox'

export const MatchRow: React.FC<IMatchRowProps> = ({ match, rowIndex, resultTeamIndex, isResultTicket, onTeamClick }) => {
  // const matches = useLeague((store) => store.matches)
  const defaultTicket: ITicket | undefined  = useCurrentLeagueStore((state) => state.defaultTicket)


  const isPickedAtDefaultTicket = (teamIndex: number, matchRow?: IMatchRow)=>{
    console.log({
      match,
      matchRow,
      defaultTicket
    })
    if (!match || !matchRow || !defaultTicket) return false;

    const finds = defaultTicket?.pickTeams.filter(pt=>{
      return pt.team_index == teamIndex && matchRow.id == pt.match.id
    })
    return finds && finds?.length > 0
  }

  return (
    <Flex alignItems="center" justify="space-evenly" py={0} borderBottom="1px solid gray">
      <Box minWidth="40px" textAlign="center">
        {rowIndex ? rowIndex + 1 : 1}
      </Box>
      <Flex direction="column" alignItems="center" textAlign="center">
        <Text fontSize="12px">{match?.leagueName}</Text>
        <Text fontSize="11px">{match?.date}</Text>
        <Text fontSize="13px">{match?.time}</Text>
      </Flex>

      <TeamBox
        team={match?.team1}
        isResultTicket={isResultTicket}

        isCorrectBox={resultTeamIndex === 0}
        isDefault={isPickedAtDefaultTicket(0, match)}
        onClick={() => {
          if (match && match.team1) {
            onTeamClick?.(match.id, 0, !match.team1.selected)
          }
        }}
      />
      <TeamBox
        team={match?.draw}
        isResultTicket={isResultTicket}
        isCorrectBox={resultTeamIndex === 1}
        isDefault={isPickedAtDefaultTicket(1, match)}
        onClick={() => {
          if (match && match.draw) {
            onTeamClick?.(match.id, 1, !match.draw.selected)
          }
        }}
      />
      <TeamBox
        team={match?.team2}
        isResultTicket={isResultTicket}
        isCorrectBox={resultTeamIndex === 2}
        isDefault={isPickedAtDefaultTicket(2, match)}
        onClick={() => {
          if (match && match.team2) {
            onTeamClick?.(match.id, 2, !match.team2.selected)
          }
        }}
      />
    </Flex>
  )
}
