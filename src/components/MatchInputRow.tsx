import React, { useState } from 'react'
import { Button, Input, HStack, Box, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { IMatchInputRowProps } from '../interfaces/IMatchInputRowProps'
import { ITeam } from '../interfaces/ITeam'
import { useLeague } from '../store/store'
import { IMatchRow } from '../interfaces/IMatchRow'

const MatchInputRow: React.FC<IMatchInputRowProps> = (props) => {
  const [team1, setTeam1] = useState<ITeam | undefined>(props.match ? props.match.team1 : undefined)
  const [team2, setTeam2] = useState<ITeam | undefined>(props.match ? props.match.team2 : undefined)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [draw, setDraw] = useState<ITeam | undefined>(
    props.match ? props.match.draw : { name: 'draw', selected: false },
  )

  const [title, setTitle] = useState<string | undefined>(props.match?.leagueName)
  const [dateTime, setDateTime] = useState<string>(`${props.match?.date}T${props.match?.time}`)

  const matches = useLeague((store) => store.matches)

  const isValidTeam = (team?: ITeam) => {
    if (!team) return false
    return !!team.name && !!team.score
  }

  const onAdd = () => {
    if (!dateTime) {
      alert('Please select date time.')
      return
    }
    if (isValidTeam(team1) && isValidTeam(team2) && isValidTeam(draw)) {
      const match: IMatchRow = {
        id: matches.length + 1,
        leagueName: title,
        date: dateTime!.split('T')[0],
        time: dateTime!.split('T')[1],
        team1,
        team2,
        draw,
      }

      props.onAdd(match)
    } else {
      setShowAlert(true)
    }
  }

  const onReset = () => {
    setShowAlert(false)
    setTeam1(undefined)
    setTeam2(undefined)
    setDraw(undefined)
  }

  return (
    <Box my={3}>
      <HStack my={2}>
        <Input
          placeholder="League Title"
          value={title}
          size="sm"
          rounded={5}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <Input
          placeholder="Select Date and Time"
          size="sm"
          type="datetime-local"
          rounded={5}
          colorScheme="white"
          color="white"
          value={dateTime}
          onChange={(e) => {
            
            setDateTime(e.target.value)
          }}
        />
      </HStack>
      <HStack>
        <VStack>
          <Input
            placeholder="Team1 Name"
            value={team1 ? team1.name : ''}
            size="sm"
            rounded={5}
            onChange={(e) => {
              setShowAlert(false)
              setTeam1({
                ...team1,
                name: e.target.value,
                selected: false,
              })
            }}
          />
          <Input
            placeholder="Score"
            type="number"
            size="sm"
            rounded={5}
            value={team1 ? team1.score : ''}
            onChange={(e) => {
              setShowAlert(false)
              setTeam1({
                ...team1,
                score: parseFloat(e.target.value),
                selected: false,
              })
            }}
          />
        </VStack>
        <VStack>
          <Input placeholder="Team Name" size="sm" rounded={5} value="Draw" disabled />
          <Input
            placeholder="Score"
            type="number"
            size="sm"
            rounded={5}
            value={draw ? draw.score : ''}
            onChange={(e) => {
              setShowAlert(false)
              setDraw({
                ...draw,
                score: parseFloat(e.target.value),
                selected: false,
              })
            }}
          />
        </VStack>
        <VStack>
          <Input
            placeholder="Team2 Name"
            value={team2 ? team2.name : ''}
            size="sm"
            rounded={5}
            onChange={(e) => {
              setShowAlert(false)
              setTeam2({
                ...team2,
                name: e.target.value,
                selected: false,
              })
            }}
          />
          <Input
            placeholder="Score"
            type="number"
            size="sm"
            rounded={5}
            value={team2 ? team2.score : ''}
            onChange={(e) => {
              setShowAlert(false)
              setTeam2({
                ...team2,
                score: parseFloat(e.target.value),
                selected: false,
              })
            }}
          />
        </VStack>
        <VStack>
          <Button w="80px" colorScheme="teal" onClick={onAdd} size="sm">
            {props.isEdit ? 'Save' : 'Add'}
          </Button>
          <Button w="80px" colorScheme="red" onClick={onReset} size="sm">
            Reset
          </Button>
        </VStack>
      </HStack>
      {showAlert ? (
        <Alert status="error" mt={2}>
          <AlertIcon />
          <AlertTitle>Input invalid!</AlertTitle>
          <AlertDescription>Fill the blanks.</AlertDescription>
        </Alert>
      ) : null}
    </Box>
  )
}

export default MatchInputRow
