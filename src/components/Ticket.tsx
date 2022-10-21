import React, { useEffect, useState } from "react";

import { IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import { MatchRow } from "./MatchRow";
import IBaseProps from "../interfaces/IBaseProps";
import { ILeague, ITicket } from "../interfaces";
import {
  useAddTicketModal,
  useCurrentLeagueStore,
  useCurrentTicketStore,
} from "../store/store";
import { getIMatchRowFrom, IMatchRow } from "../interfaces/IMatchRow";
import Api from "../services/api";
import { useRoleStore } from "../store";

export interface ITicketProps extends IBaseProps {
  ticket: ITicket;
}

const Ticket: React.FC<ITicketProps> = ({ ticket }) => {
  const currentLeague = useCurrentLeagueStore((state) => state.league);
  const getResultTeamIndex = useCurrentLeagueStore((state) => state.getResultTeamIndex);
  const setCurLeague = useCurrentLeagueStore((state) => state.setLeague);
  const setCurTicket = useCurrentTicketStore((state) => state.setTicket);
  const clearCurTicket = useCurrentTicketStore((state) => state.clear);
  const showAddTicketModal = useAddTicketModal((state) => state.setIsOpen);

  const [rowData, setRowData] = useState<IMatchRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isAdmin = useRoleStore((store) => store.isAdmin);

  useEffect(() => {
    const matches = currentLeague?.matches.map((one: any) =>
      getIMatchRowFrom(one, ticket.pickTeams)
    );
    setRowData(matches || []);
  }, [ticket]);

  const onEdit = () => {
    setCurTicket(ticket);
    showAddTicketModal(true);
  };

  const onDelete = async () => {
    if (window.confirm("Are you sure to  remove this?")) {
      setIsLoading(true);

      await Api.deleteTicket(ticket.id);

      clearCurTicket();

      const league: ILeague = await Api.getOneLeague(currentLeague!.id);

      setCurLeague(league);

      setIsLoading(false);
    }
  };

  return (
    <div className="py-3 border border-gray-400 w-[350px] mx-auto">
      <div className="flex flex-row px-3 py-0 w-[100%] justify-between items-center">
        <div>User: {ticket.user_name}</div>
        <div className="flex flex-row items-center">
          {(isAdmin || ticket.user_name != 'Boss' ) && (
            <>
              <IconButton
                aria-label="edit"
                size="xs"
                mr={1}
                colorScheme="blue"
                icon={<EditIcon />}
                onClick={onEdit}
              />
              <IconButton
                aria-label="delete"
                size="xs"
                colorScheme="red"
                icon={<DeleteIcon />}
                onClick={onDelete}
              />
            </>
          )}
        </div>
      </div>
      {rowData.map((row, index) => {
        const resultTeamIndex = getResultTeamIndex(row)
        return (
          <MatchRow match={row} key={`mathc_row_${index}`} resultTeamIndex={resultTeamIndex} isResultTicket={ticket.user_name.toLowerCase() == 'result'} rowIndex={index} />
        );
      })}
    </div>
  );
};

export default Ticket;
