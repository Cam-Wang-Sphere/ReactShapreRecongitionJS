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

interface ConnectWidgetProps {
  connectFunction: (address: string) => void;
}

const ConnectWidget = ({ connectFunction }: ConnectWidgetProps) => {
  const [address, setAddress] = useState("");

  const handleSetAddress = (event: any) => {
    setAddress(event.target.value);
  };

  // temporary workaround for no login service right now.
  // @TODO NATHAN: hook up to login service
  const getRandomPort = () => {
    return Math.floor(Math.random() * (NetworkingConstants.MAXIMUM_REPEATER_PORT - NetworkingConstants.MINIMUM_REPEATER_PORT + 1) + NetworkingConstants.MINIMUM_REPEATER_PORT);
  }

  const tryConnect = () => {

    let randomPort: number = NetworkingConstants.MINIMUM_REPEATER_PORT;
    
    if (!NetworkingConstants.ONLY_USE_DEFAULT_PORT)
    {
      randomPort = getRandomPort();
    }
    console.log('port chosen = ', randomPort);

    const fullAddress: string = "wss://" + address + ":" + randomPort;
    console.log('full address = ', fullAddress);
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
            <input
              type="text"
              value={address}
              onChange={handleSetAddress}
              placeholder="Enter IP Address"
              style={{ height: "38px", padding: "10px" }}
            />
            <Button
              colorScheme="teal"
              onClick={tryConnect}
              w={"200px"}
              bg={"#24a0ed"}
            >
              Connect
            </Button>
          </HStack>
        </div>
      </div>
    </section>
  );
};

export default ConnectWidget;
