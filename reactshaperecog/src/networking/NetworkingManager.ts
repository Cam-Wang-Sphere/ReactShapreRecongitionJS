import * as flatbuffers from 'flatbuffers';
import { ShapeRequest } from './../schema/wsschema/shape-request';
import { TypeWrapper } from '../schema/wsschema/type-wrapper';
import { Message } from '../schema/wsschema/message';
import { PingServerRequest } from '../schema/wsschema/ping-server-request';
import { EventEmitter } from 'events';
import { ClientLoginResponse } from '../schema/wsschema/client-login-response';

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
        ShapeRequest.addShapeId(builder, shapeInt);
        ShapeRequest.addSessionId(builder, this.sessionId);
        const builtShapeRequest = ShapeRequest.endShapeRequest(builder);

        TypeWrapper.startTypeWrapper(builder);
        TypeWrapper.addMessageType(builder, Message.ShapeRequest);
        TypeWrapper.addMessage(builder, builtShapeRequest);
        const BuiltTypeWrapper = TypeWrapper.endTypeWrapper(builder);

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

        TypeWrapper.startTypeWrapper(builder);
        TypeWrapper.addMessageType(builder, Message.PingServerRequest);
        TypeWrapper.addMessage(builder, pingServerRequest);
        const typeWrapper = TypeWrapper.endTypeWrapper(builder);

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

    sendWillMessage = () => {
        const message = {id: this.sessionId, type: 'Will', value: 'hello'};
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

        const root = TypeWrapper.getRootAsTypeWrapper(buf);
        const messageType = root.messageType();

        console.log('message type = ', messageType);
        switch (messageType)
        {
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
    // protected handleMediaPlaneToMobileLoginResponse = (typeWrapper: FlatBufferType) =>
    // {
    //     const MediaPlaneToMobileLoginResponseMessage = new MediaPlaneToMobileLoginResponse();
    //     typeWrapper.message(MediaPlaneToMobileLoginResponseMessage);

    //     const correspondingSessionId = MediaPlaneToMobileLoginResponseMessage.sessionId();
    //     const correspondingTeamId = MediaPlaneToMobileLoginResponseMessage.teamId();

    //     console.log('received teamId = ', correspondingTeamId, 'for sessionId = ', correspondingSessionId);

    //     // @NOTE NATHAN: this is actually awesome... we need something like this in Unreal !
    //     console.log('emit string = ', Message.MediaPlaneToMobileLoginResponse.toString());
    //     this.emit(Message.MediaPlaneToMobileLoginResponse.toString(), correspondingTeamId);
    // }

    protected handleClientLoginResponse = (typeWrapper: TypeWrapper) =>
    {
        const clientLoginResponseMessage = new ClientLoginResponse();
        typeWrapper.message(clientLoginResponseMessage);

        this.sessionId = clientLoginResponseMessage.assignedSessionId();

        console.log('received sessionId = ', this.sessionId);

        this.emit(Message.ClientLoginResponse.toString(), this.sessionId);
    }

    // protected handleScoreUpdateResponse = (typeWrapper: FlatBufferType) =>
    // {
    //     const scoreUpdateResponse = new ScoreUpdateResponse();
    //     typeWrapper.message(scoreUpdateResponse);

    //     const receivedScore = scoreUpdateResponse.score();
    //     console.log('received score update response. ' + scoreUpdateResponse.score());

    //     this.emit(Message.ScoreUpdateResponse.toString(), receivedScore);
    // }

    // protected handleClientDataResponse = (typeWrapper: FlatBufferType) =>
    // {
    //     const clientDataResponse = new ClientDataResponse();
    //     typeWrapper.message(clientDataResponse);

    //     const receivedDataString = clientDataResponse.stringData();
    //     console.log('received client data response with string data = ', receivedDataString);

    //     this.emit(Message.ClientDataResponse.toString(), receivedDataString);
    // }
}