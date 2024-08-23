import * as flatbuffers from 'flatbuffers';
import { ShapeRequest } from './../schema/wsschema/shape-request';
import { TypeWrapper } from '../schema/wsschema/type-wrapper';
import { Message } from '../schema/wsschema/message';
import { PingServerRequest } from '../schema/wsschema/ping-server-request';
import { ClientLoginResponse } from '../schema/wsschema/client-login-response';
import { PhaseResponse } from '../schema/wsschema/phase-response';
import { PhaseEnums } from '../schema/wsschema/phase-enums'
import { PlayerNameRequest } from '../schema/wsschema/player-name-request';
import { BaseNetworkingManager } from './BaseNetworkingManager';
import { PlayerNameResponse } from '../schema/wsschema/player-name-response';
import { TIMInputEvent } from '../schema/wsschema/timinput-event';
import { FTIMInputEvent } from '../TIM/TIMInputEvent';
import { TIMPlayerInput } from '../schema/wsschema/timplayer-input';
import { ETriggerState } from '../schema/wsschema/etrigger-state';
import { TIMMappedAreaAdd } from '../schema/wsschema/timmapped-area-add';
import { FTIMMappedArea } from '../TIM/TIMMappedArea';
import { Vector2 } from '../TIM/Vector2';
import { Vec2 } from '../schema/wsschema/vec2';
import { FTIMMappedAreaHandle } from '../TIM/TIMMappedAreaHandle';
import { TIMMappedAreaUpdate } from '../schema/wsschema/timmapped-area-update';
import { TIMMappedAreaRemoved } from '../schema/wsschema/timmapped-area-removed';
import { TIMInteractableData } from '../schema/wsschema/timinteractable-data';
import { FTIMInteractableData } from '../TIM/TIMInteractableData';
import { TIMInteractableUpdate } from '../schema/wsschema/timinteractable-update';

// similar to ENET client overrides.
// just create the senders / message handlers here.
export class NetworkingManager extends BaseNetworkingManager {


    // START SENDERS
    public sendPlayerNameRequest = (inName: string) =>
    {
        const builder = new flatbuffers.Builder(256);

        const builtString = builder.createString(inName);

        PlayerNameRequest.startPlayerNameRequest(builder);
        PlayerNameRequest.addSessionId(builder, this.sessionId);
        PlayerNameRequest.addName(builder, builtString);
        const builtPlayerNameRequest = PlayerNameRequest.endPlayerNameRequest(builder);

        TypeWrapper.startTypeWrapper(builder);
        TypeWrapper.addMessageType(builder, Message.PlayerNameRequest);
        TypeWrapper.addMessage(builder, builtPlayerNameRequest);
        const BuiltTypeWrapper = TypeWrapper.endTypeWrapper(builder);

        builder.finish(BuiltTypeWrapper);
        const buf = builder.asUint8Array();
        
        this.socket?.send(buf);
    }

    public sendShapeRequest = (shapeInt : number) => 
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

    public sendTIMInputEvents = (inputEvents: FTIMInputEvent[]) =>
    {
        if(inputEvents.length === 0)
        {
            return;
        }

        const builder = new flatbuffers.Builder();

        TIMPlayerInput.startInputEventsVector(builder, inputEvents.length);

        inputEvents.forEach((ie: FTIMInputEvent)=>{ 
            const eventType = ie.EventType as number as ETriggerState;
            TIMInputEvent.createTIMInputEvent(builder, 
                ie.AreaHandle.ToInt(), 
                ie.Index, 
                ie.Location.x, 
                ie.Location.y, 
                eventType, 
                ie.Time);
        })
        const inputEventsOffset = builder.endVector();

        TIMPlayerInput.startTIMPlayerInput(builder);
        TIMPlayerInput.addSessionId(builder, this.sessionId);
        TIMPlayerInput.addInputEvents(builder, inputEventsOffset);
        const playerInputOffset = TIMPlayerInput.endTIMPlayerInput(builder);

        TypeWrapper.startTypeWrapper(builder);
        TypeWrapper.addMessageType(builder, Message.TIMPlayerInput);
        TypeWrapper.addMessage(builder, playerInputOffset);
        const wrapperOffset = TypeWrapper.endTypeWrapper(builder);

        builder.finish(wrapperOffset);
        const buff = builder.asUint8Array();

        this.socket?.send(buff);
    }

    public sendPingServerRequest = () =>
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

    public sendShapeRequestString = (shapeInt: number) =>
    {
        const message = { id: this.sessionId, type: "shape", value: shapeInt };
        this.socket?.send(JSON.stringify(message));
    }

    public sendOrientationRequestString = (inPitch: number, inYaw: number) => {
		const message = { id: this.sessionId, type: "orientation", pitch: inPitch, yaw: inYaw};
		this.socket?.send(JSON.stringify(message));
	}

    public sendResetOrientationRequestString = () => {
        const message = { id: this.sessionId, type: 'resetOrientation'};
        this.socket?.send(JSON.stringify(message));
    }

    public sendWillMessage = () => {
        const message = {id: this.sessionId, type: 'Will', value: 'hello'};
        this.socket?.send(JSON.stringify(message));
    }
    // END SENDERS

    

    // START MESSAGE HANDLERS:
    protected handleClientLoginResponse = (typeWrapper: TypeWrapper) =>
    {
        const clientLoginResponseMessage = new ClientLoginResponse();
        typeWrapper.message(clientLoginResponseMessage);

        this.sessionId = clientLoginResponseMessage.assignedSessionId();

        console.log('received sessionId = ', this.sessionId);

        this.emit(Message.ClientLoginResponse.toString(), this.sessionId);
    }

    protected handlePhaseResponse = (typeWrapper: TypeWrapper) =>
    {
        const phaseResponse = new PhaseResponse();
        typeWrapper.message(phaseResponse);

        console.log('received phase response = ', phaseResponse.phaseId());

        this.emit(Message.PhaseResponse.toString(),  PhaseEnums[phaseResponse.phaseId()]);
    }

    protected handlePlayerNameResponse = (typeWrapper: TypeWrapper) =>
    {
        const playerNameResponse = new PlayerNameResponse();
        typeWrapper.message(playerNameResponse);

        console.log('received player name response. name = ', playerNameResponse.name());

        this.emit(Message.PlayerNameResponse.toString(), playerNameResponse.name());
    }

    protected handleTIMMappedAreaAdded = (typeWrapper: TypeWrapper) =>
    {
        const mappedAreaAdded = new TIMMappedAreaAdd();
        typeWrapper.message(mappedAreaAdded);

        let mappedArea = new FTIMMappedArea();
        mappedArea.color = mappedAreaAdded.color()!;
        let dimensions = mappedAreaAdded.dimensions()!;
        mappedArea.dimensions = new Vector2(dimensions.x(), dimensions.y());
        mappedArea.distance = mappedAreaAdded.distance();
        mappedArea.handle = new FTIMMappedAreaHandle(mappedAreaAdded.handle());
        mappedArea.orientation = mappedAreaAdded.orientation();
        let rotation = mappedAreaAdded.rotation()!;
        mappedArea.pitch = rotation.x();
        mappedArea.yaw = rotation.y();
        mappedArea.shape = mappedAreaAdded.shape();

        this.emit(Message.TIMMappedAreaAdd.toString(), mappedArea);
    }

    protected handleTIMMappedAreaUpdated = (typeWrapper: TypeWrapper) =>
    {
        const mappedAreaUpdated = new TIMMappedAreaUpdate();
        typeWrapper.message(mappedAreaUpdated);

        let mappedArea = new FTIMMappedArea();
        mappedArea.color = mappedAreaUpdated.color()!;
        let dimensions = mappedAreaUpdated.dimensions()!;
        mappedArea.dimensions = new Vector2(dimensions.x(), dimensions.y());
        mappedArea.distance = mappedAreaUpdated.distance();
        mappedArea.handle = new FTIMMappedAreaHandle(mappedAreaUpdated.handle());
        mappedArea.orientation = mappedAreaUpdated.orientation();
        let rotation = mappedAreaUpdated.rotation()!;
        mappedArea.pitch = rotation.x();
        mappedArea.yaw = rotation.y();
        mappedArea.shape = mappedAreaUpdated.shape();

        this.emit(Message.TIMMappedAreaUpdate.toString(), mappedArea);

    }

    protected handleTIMMappedAreaRemoved = (typeWrapper: TypeWrapper) =>
    {
        const mappedAreaRemoved = new TIMMappedAreaRemoved();
        typeWrapper.message(mappedAreaRemoved);

        const handle = new FTIMMappedAreaHandle(mappedAreaRemoved.handle());

        this.emit(Message.TIMMappedAreaRemoved.toString(), handle);
    }

    protected handleTIMInteractableData = (typeWrapper: TypeWrapper) =>
    {
        const interactableData = new TIMInteractableData();
        typeWrapper.message(interactableData);

        const tags : string[] = [];
        for(let i = 0; i < interactableData.tagsLength(); i++)
        {
            tags.push(interactableData.tags(i));
        }
        const interactable = new FTIMInteractableData();
        interactable.tags = tags;
        interactable.scale = interactableData.scale();
        interactable.handle = interactableData.netHandle();

        this.emit(Message.TIMInteractableData.toString(), interactable);
    }

    protected handleTIMInteractableUpdate = (typeWrapper: TypeWrapper) =>
    {
        const interactableUpdate = new TIMInteractableUpdate();
        typeWrapper.message(interactableUpdate);

        const tags : string[] = [];
        for(let i = 0; i < interactableUpdate.tagsLength(); i++)
        {
            tags.push(interactableUpdate.tags(i));
        }
        const vec = interactableUpdate.location()!;
        const location = new Vector2(vec.x(), vec.y());

        const interactable = new FTIMInteractableData();
        interactable.tags = tags;
        interactable.distance = interactableUpdate.distance();
        interactable.location = location;
        interactable.rotation = interactableUpdate.rotation();
        interactable.handle = interactableUpdate.netHandle();

        this.emit(Message.TIMInteractableUpdate.toString(), interactable);
    }

    // END MESSAGE HANDLERS



    // START BASE CLASS OVERRIDE
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
            case Message.PhaseResponse:
            {
                this.handlePhaseResponse(root);
                break;
            }
            case Message.PlayerNameResponse:
            {
                this.handlePlayerNameResponse(root);
                break;
            }
            case Message.TIMMappedAreaAdd:
            {
                this.handleTIMMappedAreaAdded(root);
                break;
            }
            case Message.TIMMappedAreaRemoved:
            {
                this.handleTIMMappedAreaRemoved(root);
                break;
            }
            case Message.TIMInteractableData:
            {
                this.handleTIMInteractableData(root);
                break;
            }
            case Message.TIMInteractableUpdate:
            {
                this.handleTIMInteractableUpdate(root);
                break;
            }
            default:
            {
                super.handleBinaryMessage(data);
            }
        }
    }

    protected handleStringMessage(data: string)
    {
        console.log('Received string message: ', data);

        const obj = JSON.parse(data);
        if (obj.type === "team")
        {
            console.log("received team message");
        }
        else
        {
            super.handleStringMessage(data);
        }
    };
    // END BASE CLASS OVERIDE
}