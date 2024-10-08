import { SVGProps } from "react";
import * as React from "react";
import { NetworkingManager } from "../../networking/NetworkingManager";
import { Message } from "../../schema/wsschema/message";
import { useEffect, useRef, useState } from "react";

// interface Props {
//   isActive: boolean;
// }

const arrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
    <path d="M0 0h1024v1024H0V0z" fill="white" opacity="0" />
    <path d="M0 0H1024V1024H0V0Z" fill="white" opacity="0" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M314.947 570.9H293.705V729.825H497.625V848H518.867V709.45H314.947V570.9ZM845.989 513.85H710.042V709.45H561.35V729.825H731.283V534.225H845.989V513.85ZM518.867 196H497.625V334.55H705.793V469.025H722.787V314.175H518.867V196ZM455.142 314.175H293.705V509.775H179V530.15H314.947V330.475H455.142V314.175ZM616.579 680.925H404.162V697.225H616.579V680.925ZM693.049 420.125H676.056V623.875H693.049V420.125ZM340.437 420.125H327.692V623.875H340.437V420.125ZM612.331 346.775H404.162V359H612.331V346.775ZM518.867 574.975H501.874V652.4H518.867V574.975ZM642.069 517.925H561.351V530.15H642.069V517.925ZM455.142 517.925H374.424V530.15H455.142V517.925ZM514.619 395.675H501.874V469.025H514.619V395.675ZM518.867 513.85H497.625V530.15H518.867V513.85Z"
      // fill={isActive ? "white" : "#FEE202"}
      fill="#FEE202"
    />
  </svg>
);

export default arrow;
