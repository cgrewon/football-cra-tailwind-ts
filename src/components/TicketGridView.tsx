import { Grid, VStack, Box } from '@chakra-ui/react'

import React from 'react'
import { ITicket } from '../interfaces'
import IBaseProps from '../interfaces/IBaseProps'
import { useCurrentLeagueStore } from '../store/store'
import Ticket from './Ticket'

const TicketGridView: React.FC<IBaseProps> = (props) => {
  const currentLeague = useCurrentLeagueStore((state) => state.league)

  

  return (
    <Grid w="full" gridTemplateColumns="repeat( auto-fit, minmax(350px, 1fr))" gap={10} justifyContent="center">
      {currentLeague &&
        currentLeague!.tickets?.map((ticket: ITicket) => {
          return <Ticket key={ticket.id} ticket={ticket} />
        })}
    </Grid>
  )
}

export default TicketGridView
