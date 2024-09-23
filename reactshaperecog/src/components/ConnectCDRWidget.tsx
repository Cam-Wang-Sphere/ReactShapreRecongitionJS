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

interface ConnectCDRWidgetProps {
  connectFunction: (address: string) => void;
}

const ConnectCDRWidget = ({ connectFunction }: ConnectCDRWidgetProps) => {

  const fullAddress: string = "wss://" + NetworkingConstants.CDR_IP + ":" + NetworkingConstants.MINIMUM_REPEATER_PORT;
  const certAddress: string = "https://" + NetworkingConstants.CDR_IP + ":" + NetworkingConstants.MINIMUM_REPEATER_PORT;

  const tryConnectToCDR = () => {
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
              onClick={tryConnectToCDR}
            >
              Connect To CDR
            </Button>
          </HStack>

          <AcceptCertButton inURL={certAddress} inButtonText="Accept CDR Cert" />
        </div>
      </div>
    </section>
  );
};

export default ConnectCDRWidget;
