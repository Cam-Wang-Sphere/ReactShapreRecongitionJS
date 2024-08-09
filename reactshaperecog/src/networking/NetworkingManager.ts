import * as flatbuffers from 'flatbuffers';
import { ShapeRequest } from './../schema/dot-dschema/shape-request';
import { FlatBufferType } from '../schema/dot-dschema/flat-buffer-type';
import { Message } from '../schema/dot-dschema/message';
import { PingServerRequest } from '../schema/dot-dschema/ping-server-request';
import { EventEmitter } from 'events';
import { MediaPlaneLoginRequest } from '../schema/dot-dschema/media-plane-login-request';
import { MediaPlaneToMobileLoginResponse } from '../schema/dot-dschema/media-plane-to-mobile-login-response';
import { ClientLoginResponse } from '../schema/dot-dschema/client-login-response';

export class NetworkingManager extends EventEmitter {

    protected socket: WebSocket | null = null;
    protected sessionId: number = -1;

    constructor(private url: string)
    {
        super();
    }

    connect = (): Promise<void> =>
    {
        return new Promise((resolve, reject) =>
        {
            this.socket = new WebSocket(this.url);

            // setting the binary type to an array buffer
            this.socket.binaryType = 'arraybuffer';

            // socket bindings
            this.socket.onopen = () => 
            {
                alert("Connected to websocket with ip = " + this.url);
                resolve();
            };
            this.socket.onerror = (error) => 
            {
                alert("Could not connect to ip = " + this.url);
                reject(error);
            };
            this.socket.onmessage = (event) => 
            {
                this.handleMessage(event.data);
            };
            this.socket.onclose = () =>
            {
                console.log('websocket connection closed');
            };
        })
    };

    // senders
    sendNameRequestString = (inName: string) => 
    {
        const message = { id: this.sessionId, type: "name", value: inName};
        console.log("inside send name request string");
		if (this.socket)
		{
            console.log("sent message = ", message);
			this.socket.send(JSON.stringify(message));
		};
    };

    sendShapeRequest = (shapeInt : number) => 
    {
        const builder = new flatbuffers.Builder(256);

        ShapeRequest.startShapeRequest(builder);
        ShapeRequest.addShapeType(builder, shapeInt);
        ShapeRequest.addSessionId(builder, this.sessionId);
        const builtShapeRequest = ShapeRequest.endShapeRequest(builder);

        FlatBufferType.startFlatBufferType(builder);
        FlatBufferType.addMessageType(builder, Message.ShapeRequest);
        FlatBufferType.addMessage(builder, builtShapeRequest);
        const BuiltTypeWrapper = FlatBufferType.endFlatBufferType(builder);

        builder.finish(BuiltTypeWrapper);
        const buf = builder.asUint8Array();
        
        this.socket?.send(buf);
    }

    sendPingServerRequest = () =>
    {
        const builder = new flatbuffers.Builder(256);

        PingServerRequest.startPingServerRequest(builder);
        PingServerRequest.addSessionId(builder, this.sessionId);
        const pingServerRequest = PingServerRequest.endPingServerRequest(builder);

        FlatBufferType.startFlatBufferType(builder);
        FlatBufferType.addMessageType(builder, Message.PingServerRequest);
        FlatBufferType.addMessage(builder, pingServerRequest);
        const typeWrapper = FlatBufferType.endFlatBufferType(builder);

        builder.finish(typeWrapper);

        const buf = builder.asUint8Array();

        this.socket?.send(buf);
    }

    sendShapeRequestString = (shapeInt: number) =>
    {
        const message = { id: this.sessionId, type: "shape", value: shapeInt };
        this.socket?.send(JSON.stringify(message));
    }

    sendOrientationRequestString = (inPitch: number, inYaw: number) => {
		const message = { id: this.sessionId, type: "orientation", pitch: inPitch, yaw: inYaw};
		this.socket?.send(JSON.stringify(message));
	}

    sendResetOrientationRequestString = () => {
        const message = { id: this.sessionId, type: 'resetOrientation'};
        this.socket?.send(JSON.stringify(message));
    }

    protected handleMessage = (data: any) =>
    {
        if (typeof data === 'string')
        {
            console.log('received string message');
            this.handleStringMessage(data);
        }
        else  // @TODO NATHAN: handle this better. could be ping opcode or pong opcode...
        {
            console.log('received binary message');
            this.handleBinaryMessage(data);
        }
    };

    protected handleBinaryMessage = (data: ArrayBuffer) =>
    {
        console.log('Received binary message: ', data);

        // might be unnecessary copy...
        const myBuf = new Uint8Array(data);
        const buf = new flatbuffers.ByteBuffer(myBuf);

        const root = FlatBufferType.getRootAsFlatBufferType(buf);
        const messageType = root.messageType();

        console.log('message type = ', messageType);
        switch (messageType)
        {
            case Message.MediaPlaneToMobileLoginResponse:
            {
                this.handleMediaPlaneToMobileLoginResponse(root);
                break;
            }
            case Message.ClientLoginResponse:
            {
                this.handleClientLoginResponse(root);
                break;
            }
        }
    };

    protected handleStringMessage = (data: string) =>
    {
        console.log('Received string message: ', data);

        // @TODO NATHAN: extend this class and put message handlers there... for now just gonna shove into one class...
        const obj = JSON.parse(data);
        if (obj.type == "login")
        {
            this.sessionId = obj.value;
            console.log("set sessionId to = " + this.sessionId);
        }
        else if (obj.type == "team")
        {
            console.log("received team message");
        }
    };

    // binary handlers
    protected handleMediaPlaneToMobileLoginResponse = (typeWrapper: FlatBufferType) =>
    {
        const MediaPlaneToMobileLoginResponseMessage = new MediaPlaneToMobileLoginResponse();
        typeWrapper.message(MediaPlaneToMobileLoginResponseMessage);

        const correspondingSessionId = MediaPlaneToMobileLoginResponseMessage.sessionId;
        const correspondingTeamId = MediaPlaneToMobileLoginResponseMessage.teamId;

        console.log('received teamId = ', correspondingTeamId, 'for sessionId = ', correspondingSessionId);

        // @NOTE NATHAN: this is actually awesome... we need something like this in Unreal !
        this.emit(Message.MediaPlaneToMobileLoginResponse, correspondingSessionId, correspondingTeamId);
    }

    protected handleClientLoginResponse = (typeWrapper: FlatBufferType) =>
    {
        const clientLoginResponseMessage = new ClientLoginResponse();
        typeWrapper.message(clientLoginResponseMessage);

        this.sessionId = clientLoginResponseMessage.assignedSessionId();

        console.log('received sessionId = ', this.sessionId);

        this.emit(Message.ClientLoginResponse, this.sessionId);
    }
}