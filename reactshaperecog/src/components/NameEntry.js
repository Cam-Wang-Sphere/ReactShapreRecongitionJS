import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const NameEntry = ({ sessionId }) => {

    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const sendNameRequest = () => {
        const message = { id: sessionId, type: "name", value: name};
		if (window.currentSocket)
		{
			window.currentSocket.send(JSON.stringify(message));
		}
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

NameEntry.propTypes = {
    sessionId: PropTypes.number.isRequired,
}

export default NameEntry;