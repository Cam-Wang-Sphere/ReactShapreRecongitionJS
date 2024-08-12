import React, { useState, useEffect } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Button, HStack, ButtonGroup } from "@chakra-ui/react";

interface NameEntryProps {
  inNetworkingManager: NetworkingManager;
}

const NameEntry = ({ inNetworkingManager }) => {
  const [name, setName] = useState("");

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const sendNameRequest = () => {
    inNetworkingManager.sendNameRequestString(name);
  };

  return (
    <section className="ipcon">
      <div>
        <div>
          <HStack spacing={4}>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name here"
            />

            <Button colorScheme="teal" onClick={sendNameRequest}>
              Send Name
            </Button>
          </HStack>
        </div>
      </div>
    </section>
  );
};

export default NameEntry;
