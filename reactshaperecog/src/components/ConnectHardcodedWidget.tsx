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

interface ConnectHardcodedWidgetProps {
  inConnectFunction: (address: string) => void;
  inEndpoint: string;
  inPort: number;
  inConnectText: string;
  inAcceptCertText: string;
}

const ConnectHardcodedWidget = ({ inConnectFunction, inEndpoint, inPort, inConnectText, inAcceptCertText }: ConnectHardcodedWidgetProps) => {

  const fullAddress: string = "wss://" + inEndpoint + ":" + inPort;
  const certAddress: string = "https://" + inEndpoint + ":" + inPort;

  const tryConnectToBigDome = () => {
    
    inConnectFunction(fullAddress);
  };

  return (
    <section className="ipcon">
      <div>
        <div>
          <HStack spacing={4}>
            <Button
              w={"100%"}
              h={"50px"}
              colorScheme="teal"
              onClick={tryConnectToBigDome}
            >
              {inConnectText}
            </Button>
          </HStack>

          <AcceptCertButton inURL={certAddress} inButtonText={inAcceptCertText} />
        </div>
      </div>
    </section>
  );
};

export default ConnectHardcodedWidget;
