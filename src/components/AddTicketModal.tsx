import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import { MatchRow } from "./MatchRow";
import IBaseProps from "../interfaces/IBaseProps";
import {
  ICurrentLeagueStore,
  useAddTicketModal,
  useCurrentLeagueStore,
  useCurrentTicketStore,
} from "../store/store";
import { getIMatchRowFrom, IMatchRow } from "../interfaces/IMatchRow";
import {
  getPickTeamsForMatchFrom,
  ICreatePickTeam,
  ICreateTicket,
  ILeague,
  ITicket,
} from "../interfaces";
import Api from "../services/api";
import LiveLink from "./LiveLink";
import { useRoleStore } from "../store";

const AddTicketModal: React.FC<IBaseProps> = (props) => {
  const isOpen = useAddTicketModal((store) => store.isOpen);

  const currentLeague: ILeague | undefined = useCurrentLeagueStore(
    (state) => state.league
  );
  const isAdmin = useRoleStore((store) => store.isAdmin);

  const setCurrentLeague = useCurrentLeagueStore((state) => state.setLeague);
  const currentTicket = useCurrentTicketStore((state) => state.ticket);
  const clearCurTicket = useCurrentTicketStore((state) => state.clear);

  const setCurrentTicket = useCurrentTicketStore((state) => state.setTicket);

  const [ticketMatches, setTicketMatches] = useState<IMatchRow[]>([]);
  const [remainCount, setRemainCount] = useState<number>(20);

  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!currentLeague) {
      setTicketMatches([]);
      return;
    }
    let matchrows = currentLeague.matches.map((one) => getIMatchRowFrom(one));

    if (currentTicket) {
      setUserName(currentTicket.user_name);
      matchrows = matchrows.map((match) => {
        const newMatch = { ...match };
        const pickTeams = getPickTeamsForMatchFrom(currentTicket, match.id);

        for (const pick of pickTeams) {
          if (pick.team_index == 0) {
            newMatch.team1 = { ...newMatch.team1, selected: true };
          } else if (pick.team_index == 1) {
            newMatch.draw = { ...newMatch.draw, selected: true };
          } else if (pick.team_index == 2) {
            newMatch.team2 = { ...newMatch.team2, selected: true };
          }
        }

        return newMatch;
      });
    }

    setTicketMatches(matchrows);
  }, [currentLeague, currentTicket]);

  useEffect(() => {
    setRemainCount(20 - getSelectedCount(ticketMatches));
  }, [ticketMatches]);

  const setIsOpen = useAddTicketModal((store) => store.setIsOpen);
  const onClose = () => {
    setUserName("");
    clearCurTicket();
    setIsOpen(false);
  };

  const onSubmit = async () => {
    if (!isAdmin) {
      if (remainCount > 0) {
        alert(`You can select ${20 - remainCount} options more.`);
        return;
      }
      if (remainCount < 0) {
        alert("You selected more than 20 options.");
        return;
      }
      if (!userName) {
        alert("User name must be filled.");
        return;
      }
    }

    setIsLoading(true);

    const picks: ICreatePickTeam[] = [];

    for (const match of ticketMatches) {
      if (match.team1?.selected) {
        picks.push({
          team_index: 0,
          match_id: match.id,
        });
      }

      if (match.draw?.selected) {
        picks.push({
          team_index: 1,
          match_id: match.id,
        });
      }

      if (match.team2?.selected) {
        picks.push({
          team_index: 2,
          match_id: match.id,
        });
      }
    }

    const createTicket: ICreateTicket = {
      league_id: currentLeague!.id,
      user_name: userName,
      pickTeams: picks,
    };

    if (currentTicket) {
      //* update
      const res: ITicket = await Api.updateTicket(
        currentTicket.id,
        createTicket
      );
      setCurrentTicket(res);
    } else {
      const res: ITicket = await Api.addTicket(createTicket);

      setCurrentTicket(res);
    }

    const newLeague: ILeague = await Api.getOneLeague(currentLeague!.id);
    setCurrentLeague(newLeague);

    setIsLoading(false);

    onClose();
  };

  const onTeamClick = (
    matchId: number,
    teamIndex: number,
    willSelect: boolean
  ) => {
    if (remainCount === undefined) return;

    if (remainCount <= 0 && willSelect) {
      alert("Already selected all options");
      return;
    }
    const newMatches: IMatchRow[] = [...ticketMatches];
    for (let i = 0; i < newMatches.length; i++) {
      if (newMatches[i].id == matchId) {
        switch (teamIndex) {
          case 0:
            newMatches[i].team1 = {
              ...newMatches[i].team1,
              selected: !newMatches[i].team1!.selected,
            };
            break;
          case 1:
            newMatches[i].draw = {
              ...newMatches[i].draw,
              selected: !newMatches[i].draw!.selected,
            };
            break;
          case 2:
            newMatches[i].team2 = {
              ...newMatches[i].team2,
              selected: !newMatches[i].team2!.selected,
            };
            break;
        }
      }
    }

    setTicketMatches(newMatches);
  };

  const getSelectedCount = (matches: IMatchRow[]) => {
    let count = 0;
    for (const one of matches) {
      if (one.team1?.selected) ++count;
      if (one.team2?.selected) ++count;
      if (one.draw?.selected) ++count;
    }
    return count;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="#020a0f">
        <ModalHeader>
          {currentTicket ? "Edit" : "Add"} Ticket
          <div className="text-sm inline-block float-right  mr-5">
            <LiveLink />
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack my={5}>
            {!currentLeague && (
              <Text>Please select current league or add new league first.</Text>
            )}
            <Text>Reamining count: {remainCount}</Text>
            <Input
              placeholder="User name"
              size="sm"
              rounded={5}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {ticketMatches.map((match, index) => {
              return (
                <MatchRow
                  key={`match_row_ticket_${index}`}
                  resultTeamIndex={null}
                  match={match}
                  rowIndex={index}
                  onTeamClick={onTeamClick}
                />
              );
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            colorScheme="blue"
            mr={3}
            onClick={onSubmit}
            isLoading={isLoading}
          >
            Submit
          </Button>
          <Button colorScheme="orange" size="sm" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTicketModal;
