import React, { useState, useEffect } from 'react';


const Gyroscope = () => {

    const [orientation, setOrientation] = useState({ yaw: 0, pitch: 0, roll: 0});
    const [hasStarted, setHasStarted] = useState(false);

    const sendOrientationRequest = (inPitch, inYaw) => {
		const message = { id: window.sessionId, type: "orientation", pitch: inPitch, yaw: inYaw};
		if (window.currentSocket)
		{
			window.currentSocket.send(JSON.stringify(message));
		}
	}

    const sendResetOrientationRequest = () => {
        const message = { id: window.sessionId, type: 'resetOrientation'};
        if (window.currentSocket)
        {
            window.currentSocket.send(JSON.stringify(message));
        }
    }

    const handleOrientationEvent = (event) => {
        setOrientation({
            yaw: event.alpha ? event.alpha.toFixed(2) : 0,
            pitch: event.beta ? event.beta.toFixed(2) : 0,
            roll: event.gamma ? event.gamma.toFixed(2) : 0,
        });
        sendOrientationRequest(event.beta, event.alpha);
    };

    const startRecording = () => {
        if (!hasStarted) {
            window.addEventListener('deviceorientation', handleOrientationEvent);
            setHasStarted(true);
            alert('Started gyroscope recording');

            // this is to request permission for IMU access on IOS
            if (
                DeviceMotionEvent &&
                typeof DeviceMotionEvent.requestPermission === "function"
              ) {
                DeviceMotionEvent.requestPermission();
              }
        };
    };

    const stopRecording = () => {
        if (hasStarted) {
            window.removeEventListener('deviceorientation', handleOrientationEvent);
            setHasStarted(false);
            alert('Stopped gyroscope recording');
        };
    };

    const textColor = {
        color: 'white'
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('deviceorientation', handleOrientationEvent);
        };
    }, []);

    return (
        <section class="ipcon">   
        <div>
			<div>
				<button onClick={startRecording}>Start IMU Readings</button>
				<button onClick={stopRecording}>Stop IMU Readings</button>
				<p style={textColor}>
                    Pitch: {orientation.pitch} Yaw: {orientation.yaw}  Roll: {orientation.roll} 
                </p>
			</div>
            
            <div>
                <button onClick={sendResetOrientationRequest}>Reset Pointer</button>
            </div>
        </div>  
        </section>
    )
}

export default Gyroscope;
