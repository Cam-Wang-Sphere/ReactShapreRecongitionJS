import React from "react";
import NameEntry from "./NameEntry";
import ConnectWidget from "./ConnectWidget";
import ConnectBigDomeWidget from "./ConnectBigDomeWidget";
import ConnectCDRWidget from "./ConnectCDRWidget";
import { NetworkingManager } from "../networking/NetworkingManager";
import { useState, useEffect } from "react";
import ConnectHardcodedWidget from "./ConnectHardcodedWidget";
import { NetworkingConstants } from "../constants/NetworkingConstants";

import {
  HStack,
  VStack,
  Grid,
  GridItem,
  ButtonGroup,
  Button,
  Box,
  Heading,
  Center,
  Spacer,
  Container,
} from "@chakra-ui/react";

interface ConnectionScreenProps {
  connectFunction: (address: string) => void;
  inConnectNetworkingManager: NetworkingManager | null;
}

const ConnectionScreen = ({ connectFunction, inConnectNetworkingManager }: ConnectionScreenProps) => {
  return (
    <Box mt={"2%"}>
      <VStack alignItems={"left"} p={"10px"}>
        <ConnectWidget connectFunction={connectFunction} />
        <NameEntry inNetworkingManager={inConnectNetworkingManager} />
        {/* {<AddTemplateWidget AddTemplateFunction={AddTemplate} />} */}
        <br></br>
        <ConnectBigDomeWidget connectFunction={connectFunction} />
        <ConnectCDRWidget connectFunction={connectFunction} />
        <ConnectHardcodedWidget inEndpoint={NetworkingConstants.NEW_VM_BIG_DOME_IP} inPort={NetworkingConstants.MINIMUM_LINUX_REPEATER_PORT} 
        inAcceptCertText="Accept Linux VM cert" inConnectText="Connect to Big Dome Linux" inConnectFunction={connectFunction} />
      </VStack>
    </Box>
  );
};

export default ConnectionScreen;
