"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebClientLogoutRequest = exports.WebClientLoginResponse = exports.WebClientLoginRequest = exports.Vec2 = exports.TypeWrapper = exports.TIMPlayerInput = exports.TIMMappedAreaUpdate = exports.TIMMappedAreaRemoved = exports.TIMMappedAreaAdd = exports.TIMInteractableUpdate = exports.TIMInteractableData = exports.TIMInputEvent = exports.TIMHitEvent = exports.ShapeResponse = exports.ShapeRequest = exports.RepeaterLoginRequest = exports.RepeaterBroadcastBinaryResponse = exports.RepeaterBinaryResponse = exports.PlayerNameResponse = exports.PlayerNameRequest = exports.PingServerUnreliableResponse = exports.PingServerUnreliableRequest = exports.PingServerResponse = exports.PingServerRequest = exports.PingMediaPlaneUnreliableResponse = exports.PingMediaPlaneUnreliableRequest = exports.PingMediaPlaneResponse = exports.PingMediaPlaneRequest = exports.PhaseResponse = exports.PhaseEnums = exports.MobileToMediaPlaneLogoutRequest = exports.MobileToMediaPlaneLoginRequest = exports.Message = exports.MediaPlaneLoginRequest = exports.LinearColor = exports.LateConnectPayloadResponse = exports.LateConnectPayloadRequest = exports.JsonToBinaryResponse = exports.JsonToBinaryRequest = exports.GlobalInputResponse = exports.GlobalInputEnums = exports.GenericBinaryWrapper = exports.GenericBatchResponse = exports.GenericBatchRequest = exports.ETriggerState = exports.ETIMInteractAreaShapeType = exports.ETIMInteractAreaOrientation = exports.ClientLoginResponse = void 0;
var client_login_response_js_1 = require("./wsschema/client-login-response.js");
Object.defineProperty(exports, "ClientLoginResponse", { enumerable: true, get: function () { return client_login_response_js_1.ClientLoginResponse; } });
var etiminteract_area_orientation_js_1 = require("./wsschema/etiminteract-area-orientation.js");
Object.defineProperty(exports, "ETIMInteractAreaOrientation", { enumerable: true, get: function () { return etiminteract_area_orientation_js_1.ETIMInteractAreaOrientation; } });
var etiminteract_area_shape_type_js_1 = require("./wsschema/etiminteract-area-shape-type.js");
Object.defineProperty(exports, "ETIMInteractAreaShapeType", { enumerable: true, get: function () { return etiminteract_area_shape_type_js_1.ETIMInteractAreaShapeType; } });
var etrigger_state_js_1 = require("./wsschema/etrigger-state.js");
Object.defineProperty(exports, "ETriggerState", { enumerable: true, get: function () { return etrigger_state_js_1.ETriggerState; } });
var generic_batch_request_js_1 = require("./wsschema/generic-batch-request.js");
Object.defineProperty(exports, "GenericBatchRequest", { enumerable: true, get: function () { return generic_batch_request_js_1.GenericBatchRequest; } });
var generic_batch_response_js_1 = require("./wsschema/generic-batch-response.js");
Object.defineProperty(exports, "GenericBatchResponse", { enumerable: true, get: function () { return generic_batch_response_js_1.GenericBatchResponse; } });
var generic_binary_wrapper_js_1 = require("./wsschema/generic-binary-wrapper.js");
Object.defineProperty(exports, "GenericBinaryWrapper", { enumerable: true, get: function () { return generic_binary_wrapper_js_1.GenericBinaryWrapper; } });
var global_input_enums_js_1 = require("./wsschema/global-input-enums.js");
Object.defineProperty(exports, "GlobalInputEnums", { enumerable: true, get: function () { return global_input_enums_js_1.GlobalInputEnums; } });
var global_input_response_js_1 = require("./wsschema/global-input-response.js");
Object.defineProperty(exports, "GlobalInputResponse", { enumerable: true, get: function () { return global_input_response_js_1.GlobalInputResponse; } });
var json_to_binary_request_js_1 = require("./wsschema/json-to-binary-request.js");
Object.defineProperty(exports, "JsonToBinaryRequest", { enumerable: true, get: function () { return json_to_binary_request_js_1.JsonToBinaryRequest; } });
var json_to_binary_response_js_1 = require("./wsschema/json-to-binary-response.js");
Object.defineProperty(exports, "JsonToBinaryResponse", { enumerable: true, get: function () { return json_to_binary_response_js_1.JsonToBinaryResponse; } });
var late_connect_payload_request_js_1 = require("./wsschema/late-connect-payload-request.js");
Object.defineProperty(exports, "LateConnectPayloadRequest", { enumerable: true, get: function () { return late_connect_payload_request_js_1.LateConnectPayloadRequest; } });
var late_connect_payload_response_js_1 = require("./wsschema/late-connect-payload-response.js");
Object.defineProperty(exports, "LateConnectPayloadResponse", { enumerable: true, get: function () { return late_connect_payload_response_js_1.LateConnectPayloadResponse; } });
var linear_color_js_1 = require("./wsschema/linear-color.js");
Object.defineProperty(exports, "LinearColor", { enumerable: true, get: function () { return linear_color_js_1.LinearColor; } });
var media_plane_login_request_js_1 = require("./wsschema/media-plane-login-request.js");
Object.defineProperty(exports, "MediaPlaneLoginRequest", { enumerable: true, get: function () { return media_plane_login_request_js_1.MediaPlaneLoginRequest; } });
var message_js_1 = require("./wsschema/message.js");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return message_js_1.Message; } });
var mobile_to_media_plane_login_request_js_1 = require("./wsschema/mobile-to-media-plane-login-request.js");
Object.defineProperty(exports, "MobileToMediaPlaneLoginRequest", { enumerable: true, get: function () { return mobile_to_media_plane_login_request_js_1.MobileToMediaPlaneLoginRequest; } });
var mobile_to_media_plane_logout_request_js_1 = require("./wsschema/mobile-to-media-plane-logout-request.js");
Object.defineProperty(exports, "MobileToMediaPlaneLogoutRequest", { enumerable: true, get: function () { return mobile_to_media_plane_logout_request_js_1.MobileToMediaPlaneLogoutRequest; } });
var phase_enums_js_1 = require("./wsschema/phase-enums.js");
Object.defineProperty(exports, "PhaseEnums", { enumerable: true, get: function () { return phase_enums_js_1.PhaseEnums; } });
var phase_response_js_1 = require("./wsschema/phase-response.js");
Object.defineProperty(exports, "PhaseResponse", { enumerable: true, get: function () { return phase_response_js_1.PhaseResponse; } });
var ping_media_plane_request_js_1 = require("./wsschema/ping-media-plane-request.js");
Object.defineProperty(exports, "PingMediaPlaneRequest", { enumerable: true, get: function () { return ping_media_plane_request_js_1.PingMediaPlaneRequest; } });
var ping_media_plane_response_js_1 = require("./wsschema/ping-media-plane-response.js");
Object.defineProperty(exports, "PingMediaPlaneResponse", { enumerable: true, get: function () { return ping_media_plane_response_js_1.PingMediaPlaneResponse; } });
var ping_media_plane_unreliable_request_js_1 = require("./wsschema/ping-media-plane-unreliable-request.js");
Object.defineProperty(exports, "PingMediaPlaneUnreliableRequest", { enumerable: true, get: function () { return ping_media_plane_unreliable_request_js_1.PingMediaPlaneUnreliableRequest; } });
var ping_media_plane_unreliable_response_js_1 = require("./wsschema/ping-media-plane-unreliable-response.js");
Object.defineProperty(exports, "PingMediaPlaneUnreliableResponse", { enumerable: true, get: function () { return ping_media_plane_unreliable_response_js_1.PingMediaPlaneUnreliableResponse; } });
var ping_server_request_js_1 = require("./wsschema/ping-server-request.js");
Object.defineProperty(exports, "PingServerRequest", { enumerable: true, get: function () { return ping_server_request_js_1.PingServerRequest; } });
var ping_server_response_js_1 = require("./wsschema/ping-server-response.js");
Object.defineProperty(exports, "PingServerResponse", { enumerable: true, get: function () { return ping_server_response_js_1.PingServerResponse; } });
var ping_server_unreliable_request_js_1 = require("./wsschema/ping-server-unreliable-request.js");
Object.defineProperty(exports, "PingServerUnreliableRequest", { enumerable: true, get: function () { return ping_server_unreliable_request_js_1.PingServerUnreliableRequest; } });
var ping_server_unreliable_response_js_1 = require("./wsschema/ping-server-unreliable-response.js");
Object.defineProperty(exports, "PingServerUnreliableResponse", { enumerable: true, get: function () { return ping_server_unreliable_response_js_1.PingServerUnreliableResponse; } });
var player_name_request_js_1 = require("./wsschema/player-name-request.js");
Object.defineProperty(exports, "PlayerNameRequest", { enumerable: true, get: function () { return player_name_request_js_1.PlayerNameRequest; } });
var player_name_response_js_1 = require("./wsschema/player-name-response.js");
Object.defineProperty(exports, "PlayerNameResponse", { enumerable: true, get: function () { return player_name_response_js_1.PlayerNameResponse; } });
var repeater_binary_response_js_1 = require("./wsschema/repeater-binary-response.js");
Object.defineProperty(exports, "RepeaterBinaryResponse", { enumerable: true, get: function () { return repeater_binary_response_js_1.RepeaterBinaryResponse; } });
var repeater_broadcast_binary_response_js_1 = require("./wsschema/repeater-broadcast-binary-response.js");
Object.defineProperty(exports, "RepeaterBroadcastBinaryResponse", { enumerable: true, get: function () { return repeater_broadcast_binary_response_js_1.RepeaterBroadcastBinaryResponse; } });
var repeater_login_request_js_1 = require("./wsschema/repeater-login-request.js");
Object.defineProperty(exports, "RepeaterLoginRequest", { enumerable: true, get: function () { return repeater_login_request_js_1.RepeaterLoginRequest; } });
var shape_request_js_1 = require("./wsschema/shape-request.js");
Object.defineProperty(exports, "ShapeRequest", { enumerable: true, get: function () { return shape_request_js_1.ShapeRequest; } });
var shape_response_js_1 = require("./wsschema/shape-response.js");
Object.defineProperty(exports, "ShapeResponse", { enumerable: true, get: function () { return shape_response_js_1.ShapeResponse; } });
var timhit_event_js_1 = require("./wsschema/timhit-event.js");
Object.defineProperty(exports, "TIMHitEvent", { enumerable: true, get: function () { return timhit_event_js_1.TIMHitEvent; } });
var timinput_event_js_1 = require("./wsschema/timinput-event.js");
Object.defineProperty(exports, "TIMInputEvent", { enumerable: true, get: function () { return timinput_event_js_1.TIMInputEvent; } });
var timinteractable_data_js_1 = require("./wsschema/timinteractable-data.js");
Object.defineProperty(exports, "TIMInteractableData", { enumerable: true, get: function () { return timinteractable_data_js_1.TIMInteractableData; } });
var timinteractable_update_js_1 = require("./wsschema/timinteractable-update.js");
Object.defineProperty(exports, "TIMInteractableUpdate", { enumerable: true, get: function () { return timinteractable_update_js_1.TIMInteractableUpdate; } });
var timmapped_area_add_js_1 = require("./wsschema/timmapped-area-add.js");
Object.defineProperty(exports, "TIMMappedAreaAdd", { enumerable: true, get: function () { return timmapped_area_add_js_1.TIMMappedAreaAdd; } });
var timmapped_area_removed_js_1 = require("./wsschema/timmapped-area-removed.js");
Object.defineProperty(exports, "TIMMappedAreaRemoved", { enumerable: true, get: function () { return timmapped_area_removed_js_1.TIMMappedAreaRemoved; } });
var timmapped_area_update_js_1 = require("./wsschema/timmapped-area-update.js");
Object.defineProperty(exports, "TIMMappedAreaUpdate", { enumerable: true, get: function () { return timmapped_area_update_js_1.TIMMappedAreaUpdate; } });
var timplayer_input_js_1 = require("./wsschema/timplayer-input.js");
Object.defineProperty(exports, "TIMPlayerInput", { enumerable: true, get: function () { return timplayer_input_js_1.TIMPlayerInput; } });
var type_wrapper_js_1 = require("./wsschema/type-wrapper.js");
Object.defineProperty(exports, "TypeWrapper", { enumerable: true, get: function () { return type_wrapper_js_1.TypeWrapper; } });
var vec2_js_1 = require("./wsschema/vec2.js");
Object.defineProperty(exports, "Vec2", { enumerable: true, get: function () { return vec2_js_1.Vec2; } });
var web_client_login_request_js_1 = require("./wsschema/web-client-login-request.js");
Object.defineProperty(exports, "WebClientLoginRequest", { enumerable: true, get: function () { return web_client_login_request_js_1.WebClientLoginRequest; } });
var web_client_login_response_js_1 = require("./wsschema/web-client-login-response.js");
Object.defineProperty(exports, "WebClientLoginResponse", { enumerable: true, get: function () { return web_client_login_response_js_1.WebClientLoginResponse; } });
var web_client_logout_request_js_1 = require("./wsschema/web-client-logout-request.js");
Object.defineProperty(exports, "WebClientLogoutRequest", { enumerable: true, get: function () { return web_client_logout_request_js_1.WebClientLogoutRequest; } });
//# sourceMappingURL=WSSchema.js.map