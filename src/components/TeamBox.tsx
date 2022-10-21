import { Box, Text, VStack } from "@chakra-ui/react";

import React from "react";
import { ITeamBoxProps } from "../interfaces/ITeamBoxProps";

export const TeamBox: React.FC<ITeamBoxProps> = ({
  isDefault,
  team,
  isCorrectBox,
  onClick,
  isResultTicket,
}) => {
  return (
    <VStack
      minW="65px"
      h="40px"
      textOverflow="ellipsis"
      overflow="hidden"
      textAlign="center"
      textColor={team?.selected ? "white" : "black"}
      background={
        team?.selected ? (isResultTicket ? "#1d9c2a" : "#c42b2b") : ""
      }
      border={isDefault ? " 1px solid #b4be7b" : ""}
      onClick={onClick}
      cursor="pointer"
      rounded={6}
      position="relative"
      pt={1}
      color="white"
    >
      <Text fontSize="11px" lineHeight={1}>
        {team?.name}
      </Text>
      <Text fontSize="12px" lineHeight={1}>
        {team?.score}
      </Text>
      {isCorrectBox === true && !isResultTicket && (
        <div className="absolute bottom-[0px] right-[0px] rounded-full bg-green-400 w-[10px] h-[10px]"></div>
      )}
    </VStack>
  );
};
