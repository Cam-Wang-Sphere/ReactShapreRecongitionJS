import React, { useState, useEffect } from 'react';
import { NetworkingManager } from "./../networking/NetworkingManager";

interface ConnectWidgetProps
{
    connectFunction: (address: string) => void;
}

const ConnectWidget = ({ connectFunction }: ConnectWidgetProps ) =>
{
    const [address, setAddress] = useState('');

    const handleSetAddress = (event: any) => 
    {
        setAddress(event.target.value);
    }

    const tryConnect = () => 
    {
        const fullAddress ="wss://" + address + ":3004";
        connectFunction(fullAddress);
    }

    return (
        <section className="ipcon">   
        <div>
			<div>
                <input type="text" value={address} onChange={handleSetAddress} placeholder="Enter ip address here"/>
				<button onClick={tryConnect}>Connect To Server</button>
			</div>
        </div>  
        </section>
    )
}

export default ConnectWidget;
