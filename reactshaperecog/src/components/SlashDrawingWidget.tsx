import { background } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { NetworkingManager } from "../networking/NetworkingManager";
import { Message } from "../schema/wsschema/message";
import { Box } from "@chakra-ui/react";
import { Result, Point, DollarRecognizer } from "../Template/Recognizer";
import { GridItem } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { Vec2 } from "../schema/WSSchema";

interface SlashProps {
  inNetworkingManager: NetworkingManager | null;
}

const UserInputKey = "UserInput";

function storageAvailable(type: "localStorage" | "sessionStorage") {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function AddNewInput(X: number, Y: number) {
  let newInput = {
    Input: [{ x: X, y: Y }],
  };

  let newInputString = JSON.stringify(newInput);
  localStorage.setItem(UserInputKey, newInputString);
}

function AppendNexInput(X: number, Y: number) {
  let existingInputString = localStorage.getItem(UserInputKey);

  if (typeof existingInputString === "string") {
    let existingInputObj = JSON.parse(existingInputString);
    existingInputObj["Input"].push({ x: X, y: Y });

    let newInputString = JSON.stringify(existingInputObj);

    localStorage.setItem(UserInputKey, newInputString);
  }
}

const canvasWidth = window.innerHeight;
const canvasHeight = window.innerHeight;

const SlashDrawingWidget = ({inNetworkingManager}: SlashProps) => 
{
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasRect = useRef<DOMRect | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth /*setLineWidth*/] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity /*setLineOpacity*/] = useState(1.0);
  const [drawResult, setDrawResult] = useState("No Match.");
  const [textColor, setTextColor] = useState("red.500");

  const setLineColorFromTeamId = (teamId: number) => {
    switch (teamId) {
      case 0: {
        setLineColor("red");
        break;
      }
      case 1: {
        setLineColor("blue");
        break;
      }
      default: {
        setLineColor("black");
        break;
      }
    }
  };

  // Slash enums are labeled as degree anti-clockwise from polar origin <1,0>.
  // So, Slash_E points east at 0/360 degrees, Slash_N points north at 90^d, 
  // and Slash_SW points diagonally south-west at 225^d.
  enum SlashEnum {
    Slash_W    = 0, // ←    ±180
    Slash_NW   = 1, // ↖    -135
    Slash_N    = 2, // ↑     -90
    Slash_NE   = 3, // ↗     -45
    Slash_E    = 4, // →       0
    Slash_SE   = 5, // ↘     +45
    Slash_S    = 6, // ↓     +90
    Slash_SW   = 7, // ↙    +135
    Slash_MAX  = 8,
    Slash_NONE = 9
  }

  function GetAngleFromPoints(points: Point[]) {
    if (points.length < 2)
    {
      return NaN;
    }

    let p1 = points[0];
    let p2 = points[points.length - 1];

    let dir = new Point(p2.X - p1.X, p2.Y - p1.Y);
    let angle = (Math.atan2(dir.Y, dir.X) * 180.0) / Math.PI
    return angle;
  }

  // Return the appropriate slash enum given an angle in the range [-180,+180] degrees.
  function GetSlashTypeFromAngle(angle: number): string {
    if (angle < 0)
    {
      // Do some error check here.
    }
    if (angle > 359)
    {
      // Do some error check here.
    }

    let step = 45.0;
    let step_half = step / 2.0;
    
    let currentAngle = -180.0;
    for (let i = 0; i <= SlashEnum.Slash_MAX; i++) 
    {
      if ((currentAngle - step_half) <= angle && angle < (currentAngle + step_half))
      {
        // Quick check for +180 where we loop back around to -180.
        if (i == SlashEnum.Slash_MAX)
        {
          return SlashEnum[0];
        }
        return SlashEnum[i];
      }
      currentAngle += step;
    }

    return SlashEnum[SlashEnum.Slash_NONE];
  }

  useEffect(() => {
    // inNetworkingManager?.on(
    //   Message.MediaPlaneToMobileLoginResponse.toString(),
    //   setLineColorFromTeamId
    // );

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
        canvasRect.current = canvas.getBoundingClientRect();
      }
    }

    return () => {
      // inNetworkingManager?.off(
      //   Message.MediaPlaneToMobileLoginResponse.toString(),
      //   setLineColorFromTeamId
      // );
    };
  }, [lineColor, lineOpacity, lineWidth, inNetworkingManager]);

  // Function for starting the drawing
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!ctxRef.current || !canvasRect.current) {
      return;
    }

    // Reseting all the info
    if (canvasRef.current) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    if (storageAvailable("localStorage")) {
      localStorage.removeItem(UserInputKey);
    }

    let x =
      "touches" in e
        ? (e as React.TouchEvent<HTMLCanvasElement>).touches[0].clientX -
          canvasRect.current.left
        : (e.nativeEvent as MouseEvent).offsetX;
    let y =
      "touches" in e
        ? (e as React.TouchEvent<HTMLCanvasElement>).touches[0].clientY -
          canvasRect.current.top
        : (e.nativeEvent as MouseEvent).offsetY;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current?.closePath();
    setIsDrawing(false);

    drawEndFunction();
  };

  // Function for ending the drawing
  const drawEndFunction = () => {
    let pointArray = new Array();

    if (storageAvailable("localStorage")) {
      if (!localStorage.getItem(UserInputKey)) {
        return;
      }
      let existingInputString = localStorage.getItem(UserInputKey);

      if (!existingInputString) {
        return;
      }
      let existingInputObj = JSON.parse(existingInputString);

      for (let i = 0; i < existingInputObj["Input"].length; i++) {
        let X = existingInputObj["Input"][i]["x"];
        let Y = existingInputObj["Input"][i]["y"];

        let newPoint = new Point(X, Y);
        pointArray.push(newPoint);
      }
    }

    let angle = GetAngleFromPoints(pointArray);
    let slashTypeName:string = GetSlashTypeFromAngle(angle);
    let slashTypeVal:number = SlashEnum[slashTypeName]

    if (slashTypeVal != SlashEnum.Slash_NONE) 
    {
      inNetworkingManager?.sendSlashRequest(slashTypeVal);
      setDrawResult(slashTypeName);
    } else {
      setDrawResult("No Match.");
    }
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing || !ctxRef.current || !canvasRect.current) {
      return;
    }

    let x =
      "touches" in e
        ? (e as React.TouchEvent<HTMLCanvasElement>).touches[0].clientX -
          canvasRect.current.left
        : (e.nativeEvent as MouseEvent).offsetX;
    let y =
      "touches" in e
        ? (e as React.TouchEvent<HTMLCanvasElement>).touches[0].clientY -
          canvasRect.current.top
        : (e.nativeEvent as MouseEvent).offsetY;

    if (storageAvailable("localStorage")) {
      // If no user input exists create a new one
      if (!localStorage.getItem(UserInputKey)) {
        AddNewInput(x, y);
      }
      // If it exists append to existing data
      else {
        AppendNexInput(x, y);
      }
    }

    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  return (
    <div>
      <GridItem rowStart={2} rowEnd={3} colSpan={5} alignItems={"center"}>
        <VStack>
          <span color={textColor} className="resultText">
            {drawResult}
          </span>
        </VStack>
      </GridItem>
      <Box
      mb="20px"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
      h="88%"
      w="100%"
      bg="white"
    >
      {/* <div className="draw-area"> */}
      <canvas
        style={{
          position: "relative",
          overflow: "hidden",
        }}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={endDrawing}
        onTouchMove={draw}
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
      {/* </div> */}
    </Box>
    </div>
    
  );
};

export default SlashDrawingWidget;
