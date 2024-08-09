import React, { useState, useEffect } from 'react';
import { NetworkingManager } from "./../networking/NetworkingManager";

interface NameEntryProps
{
    inNetworkingManager: NetworkingManager;
}

const NameEntry = ({ inNetworkingManager }) => {

    const [name, setName] = useState('');

    const handleNameChange = (event : any) => {
        setName(event.target.value);
    }

    const sendNameRequest = () => {
        inNetworkingManager.sendNameRequestString(name);
    }

    return (
        <section className="ipcon">   
        <div>
			<div>
                <input type="text" value={name} onChange={handleNameChange} placeholder="Enter your name here"/>
				<button onClick={sendNameRequest}>Send Name</button>
			</div>
        </div>  
        </section>
    )
}

export default NameEntry;