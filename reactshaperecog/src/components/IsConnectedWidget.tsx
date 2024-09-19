import React, { useState, useEffect, useRef } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
import { BaseNetworkingManager } from "../networking/BaseNetworkingManager";
import { Message } from "../schema/WSSchema";
import { Heading } from "@chakra-ui/react";


interface IsConnectedWidgetProps {
    inNetworkingManager: NetworkingManager | null;
}

const IsConnectedWidget = ({inNetworkingManager} : IsConnectedWidgetProps) => {

    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() =>
        {
            const handleWebsocketConnectionStatus = (inWebsocketConnectionStatus: boolean) =>
            {
                setIsConnected(inWebsocketConnectionStatus);
                console.log('in websocket connection status in IsConnectedWidget = ', inWebsocketConnectionStatus);
            };
    
            inNetworkingManager?.on(NetworkingManager.websocketStatusEventName, handleWebsocketConnectionStatus);
            console.log('connected manager message = ', NetworkingManager.websocketStatusEventName);

            if (inNetworkingManager)
            {
                setIsConnected(inNetworkingManager.isConnected());
            }
    
            // cleaning up
            return () =>
            {
                inNetworkingManager?.off(NetworkingManager.websocketStatusEventName, handleWebsocketConnectionStatus);
            };
        }, [inNetworkingManager]);


    return (
        <div>
            {/* <p style={{ color: 'white'}}>Connection Status: <span style={{ color: isConnected ? 'green' : 'red'}}>{isConnected ? 'Connected' : 'Disconnected'} </span> </p> */}
            <Heading color={isConnected ? 'green' : 'red'}>PreFE</Heading>
        </div>
    )
};

export default IsConnectedWidget;