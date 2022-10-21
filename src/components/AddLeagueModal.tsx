
import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  HStack,
  Box,
  Text,
  Flex,
  Input,
} from '@chakra-ui/react'


import { EditIcon, DeleteIcon } from '@chakra-ui/icons'



import { TeamBox } from './TeamBox'
import MatchInputRow from './MatchInputRow'
import IBaseProps from '../interfaces/IBaseProps'
import { useAddLeagueModal, useCurrentLeagueStore, useLeague, useLeagueItemsStore } from '../store/store'
import { ICreateLeague, ICreateMatch, ILeague, ILeagueRes } from '../interfaces'
import { getICreateMatchFrom, IMatchRow } from '../interfaces/IMatchRow'
import Api from '../services/api'

const AddLeagueModal: React.FC<IBaseProps> = () => {
  const isOpen = useAddLeagueModal((store) => store.isOpen)

  const matches = useLeague((store) => store.matches)
  const setMatches = useLeague((store) => store.setMatches)
  const setCurrentLeague = useCurrentLeagueStore((store) => store.setLeague)
  const { leagueItems, setLeagueItems } = useLeagueItemsStore((state) => state)
  const [editIndex, setEditIndex] = useState<number>()
  const [leagueName, setLeagueName] = useState<string>()

  const setIsOpen = useAddLeagueModal((store) => store.setIsOpen)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClose = () => {
    setIsOpen(false)
  }

  const onSubmit = async () => {
    const matchList: ICreateMatch[] = []
    if (matches.length == 0) {
      alert('Please add matches')
      return
    }

    setIsLoading(true)

    for (const matchRow of matches) {
      matchList.push(getICreateMatchFrom(matchRow))
    }

    const data: ICreateLeague = {
      name: leagueName || `Default League Name ${Date.now()}`,
      matches: matchList,
    }

    const league: ILeague = await Api.addLeague(data)

    const res: ILeagueRes = await Api.getLeagues(0, 100)
    setLeagueItems(res.data)

    setCurrentLeague(league)
    setIsLoading(false)

    onClose()
  }

  const onEdit = (index: number) => {
    setEditIndex(index)
  }
  const onDelete = (index: number) => {
    const newMatches = matches.filter((one, _index) => index != _index)
    setMatches(newMatches)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="#020a0f">
        <ModalHeader>Add League</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack my={5}>
            <Input
              placeholder="League Name"
              value={leagueName}
              size="sm"
              rounded={5}
              onChange={(e) => {
                setLeagueName(e.target.value)
              }}
            />
            <Box py={2} my={3}>
              Matches
            </Box>

            {matches.map((match, index) => {
              if (editIndex == index) {
                return (
                  <MatchInputRow
                    isEdit
                    match={match}
                    onAdd={(match: IMatchRow) => {
                      const newMatches = matches.map((one, _index) => (_index == index ? match : one))
                      setMatches(newMatches)
                      setEditIndex(undefined)
                    }}
                  />
                )
              }
              return (
                <Flex key={index + 1} w="full" justify="space-evenly" borderY="1px solid gray" alignItems="center">
                  <div>{index + 1}</div>
                  <Flex direction="column" alignItems="center">
                    <Text fontSize="12px">{match.leagueName}</Text>
                    <Text fontSize="13px">{match.date}</Text>
                    <Text fontSize="13px">{match.time}</Text>
                  </Flex>
                  <TeamBox team={match.team1} />
                  <TeamBox team={match.draw} />
                  <TeamBox team={match.team2} />
                  <HStack>
                    <Button
                      variant="link"
                      onClick={() => {
                        onEdit(index)
                      }}
                    >
                      <EditIcon color="teal" />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => {
                        onDelete(index)
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </HStack>
                </Flex>
              )
            })}

            <MatchInputRow
              onAdd={(match: IMatchRow) => {
                setMatches([...matches, match])
              }}
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button size="sm" colorScheme="blue" mr={3} onClick={onSubmit} isLoading={isLoading}>
            Submit
          </Button>
          <Button size="sm" variant="solid" colorScheme="orange" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddLeagueModal
