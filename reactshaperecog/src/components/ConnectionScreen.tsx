import React from "react";
import NameEntry from "./NameEntry";
import ConnectWidget from "./ConnectWidget";
import ConnectBigDomeWidget from "./ConnectBigDomeWidget";
import { NetworkingManager } from "../networking/NetworkingManager";
import { useState, useEffect } from "react";

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

const ConnectionScreen = () => {
  const [networkingManager, setNetworkingManager] =
    useState<NetworkingManager | null>(null);

  const setupNetworkingBindings = (inNetworkingManager: NetworkingManager) => {
    if (networkingManager) {
      // networkingManager.addListener(
      //   Message.MediaPlaneToMobileLoginResponse.toString(),
      //   HandleLineColor
      // );
      console.log("setup bindings");
    }
  };

  const connectToServer = (address: string) => {
    const newNetworkingManager = new NetworkingManager(address);
    setupNetworkingBindings(newNetworkingManager);
    newNetworkingManager
      .connect()
      .then(() => {
        setNetworkingManager(newNetworkingManager);
      })
      .catch(() => {
        console.log("failed to connect");
      });
  };

  return (
    <Box mt={"2%"}>
      <VStack alignItems={"left"} p={"10px"}>
        <ConnectWidget connectFunction={connectToServer} />
        <NameEntry inNetworkingManager={networkingManager} />
        {/* {<AddTemplateWidget AddTemplateFunction={AddTemplate} />} */}
        <br></br>
        <ConnectBigDomeWidget connectFunction={connectToServer} />
      </VStack>
    </Box>
  );
};

export default ConnectionScreen;
