import React, { useState, useEffect } from "react";
import { NetworkingManager } from "../networking/NetworkingManager";
import { Button, HStack, ButtonGroup } from "@chakra-ui/react";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";

interface AcceptCertButtonProps {
    inURL: string;
    inButtonText: string;
  }

const AcceptCertButton = ({ inURL, inButtonText }: AcceptCertButtonProps) => {

    const handleClick = () =>
    {
        window.open(inURL);
    }

    return (
    <section className="ipcon">
            <HStack spacing={4}>
            <Button style={{width: '365px', marginBottom: '5px', marginTop: '5px'}} colorScheme="teal" onClick={handleClick}>
                {inButtonText}
            </Button>
            </HStack>
    </section>
    );
};

export default AcceptCertButton;
