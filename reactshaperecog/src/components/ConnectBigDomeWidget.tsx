import React, { useState, useEffect } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Button, HStack, ButtonGroup } from "@chakra-ui/react";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import { NetworkingConstants } from "../constants/NetworkingConstants";
import AcceptCertButton from "./AcceptCertButton";

interface ConnectBigDomeWidgetProps {
  connectFunction: (address: string) => void;
}

const ConnectWidget = ({ connectFunction }: ConnectBigDomeWidgetProps) => {

  const fullAddress: string = "wss://" + NetworkingConstants.NEW_VM_BIG_DOME_IP + ":" + NetworkingConstants.MINIMUM_REPEATER_PORT;
  const certAddress: string = "https://" + NetworkingConstants.NEW_VM_BIG_DOME_IP + ":" + NetworkingConstants.MINIMUM_REPEATER_PORT;

  const tryConnectToBigDome = () => {
    
    connectFunction(fullAddress);
  };

  return (
    <section className="ipcon">
      <div>
        <div>
          <HStack spacing={4}>
            {/* <Editable
              defaultValue="Enter IP Address"
              bg="white"
              onChange={handleSetAddress}
              width="200px"
            >
              <EditablePreview />
              <EditableInput />
            </Editable> */}
            <Button
              w={"100%"}
              h={"50px"}
              colorScheme="teal"
              onClick={tryConnectToBigDome}
            >
              Connect To Big Dome
            </Button>
          </HStack>

          <AcceptCertButton inURL={certAddress} inButtonText="Accept Big Dome Cert" />
        </div>
      </div>
    </section>
  );
};

export default ConnectWidget;
