import * as flatbuffers from 'flatbuffers';
import { TypeWrapper } from '../schema/wsschema/type-wrapper';
import { Message } from '../schema/wsschema/message';
import { PingServerRequest } from '../schema/wsschema/ping-server-request';
import { EventEmitter } from 'events';
import { ClientLoginResponse } from '../schema/wsschema/client-login-response';
import { ClientLoginRequest } from '../schema/WSSchema';
import { GenericBatchResponse } from '../schema/WSSchema';
import { GenericBinaryWrapper } from '../schema/WSSchema';
import { LateConnectPayloadResponse } from '../schema/WSSchema';

export class BaseNetworkingManager extends EventEmitter {

    protected socket: WebSocket | null = null;
    protected sessionId: number = -1;
    protected playerGuid: string = crypto.randomUUID();
    protected playerSecret: string = "NathanLovesFood";

    constructor(private url: string)
    {
        super();
    }

    public sendPingServerRequest = (): void =>
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

    protected sendClientLoginRequest = (): void =>
    {
        const builder = new flatbuffers.Builder(256);

        const builtGuid = builder.createString(this.playerGuid);
        const builtSecret = builder.createString(this.playerSecret);

        ClientLoginRequest.startClientLoginRequest(builder);
        ClientLoginRequest.addPlayerId(builder, builtGuid);
        ClientLoginRequest.addSecret(builder, builtSecret);
        const clientLoginRequest = ClientLoginRequest.endClientLoginRequest(builder);

        TypeWrapper.startTypeWrapper(builder);
        TypeWrapper.addMessageType(builder, Message.ClientLoginRequest);
        TypeWrapper.addMessage(builder, clientLoginRequest);
        const typeWrapper = TypeWrapper.endTypeWrapper(builder);

        builder.finish(typeWrapper);

        const buf = builder.asUint8Array();

        this.socket?.send(buf);
    }

    public connect = (): Promise<void> =>
    {
        return new Promise((resolve, reject) =>
        {
            if (this.socket && (this.socket.OPEN || this.socket.CONNECTING))
            {
                alert('already connected to websocket with ip = ' + this.url);
                reject('already connected');
                return;
            }

            this.socket = new WebSocket(this.url);

            // setting the binary type to an array buffer
            this.socket.binaryType = 'arraybuffer';

            // socket bindings
            this.socket.onopen = () => 
            {
                this.sendClientLoginRequest();
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

    protected handleMessage = (data: any): void =>
    {
        if (typeof data === 'string')
        {
            this.handleStringMessage(data);
        }
        else 
        {
            this.handleBinaryMessage(data);
        }
    };

    protected handleClientLoginResponse = (typeWrapper: TypeWrapper): void =>
    {
        const clientLoginResponseMessage = new ClientLoginResponse();
        typeWrapper.message(clientLoginResponseMessage);

        this.sessionId = clientLoginResponseMessage.assignedSessionId();

        console.log('received sessionId = ', this.sessionId);

        this.emit(Message.ClientLoginResponse.toString(), this.sessionId);
    }

    protected handleGenericBatchResponse = (typeWrapper: TypeWrapper): void =>
    {
        const genericBatchResponseMessage = new GenericBatchResponse();
        typeWrapper.message(genericBatchResponseMessage);

        for (let i: number = 0; i < genericBatchResponseMessage.messagesLength(); i++)
        {
            const flatBufferMessage: GenericBinaryWrapper | null = genericBatchResponseMessage.messages(i);

            if (flatBufferMessage)
            {
                const rawData: Uint8Array | null = flatBufferMessage.rawDataArray();
                if (!rawData) continue;

                const rawArrayBuffer: ArrayBuffer = rawData.slice().buffer;
                if (rawArrayBuffer)
                {
                    this.handleBinaryMessage(rawArrayBuffer);
                }
            }
        }
    }

    protected handleLateConnectPayloadResponse = (typeWrapper: TypeWrapper): void =>
    {
        const lateConnectPayloadResponse = new LateConnectPayloadResponse();
        typeWrapper.message(lateConnectPayloadResponse);

        console.log('received late connect payload response');

        const rawData: Uint8Array | null = lateConnectPayloadResponse.messagesArray();
        if (rawData)
        {
            const rawArrayBuffer: ArrayBuffer = rawData.slice().buffer;
            if (rawArrayBuffer)
            {
                this.handleBinaryMessage(rawArrayBuffer);
            }
        }
    }

    protected handleBinaryMessage(data: ArrayBuffer): void
    {
        console.log('Received binary message: ', data);
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
            case Message.GenericBatchResponse:
            {
                this.handleGenericBatchResponse(root);
                break;
            }
            case Message.LateConnectPayloadResponse:
            {
                this.handleLateConnectPayloadResponse(root);
                break;
            }
            default:
            {
                console.log('unhandled binary message of type = ', messageType);
            }
        }
    };

    protected handleStringMessage(data: string): void
    {
        console.log('Received string message: ', data);

        const obj = JSON.parse(data);
        if (obj.type === "login")
        {
            this.sessionId = obj.value;
            console.log("set sessionId to = " + this.sessionId);
        }
    }; 
}