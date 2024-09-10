import React, { useState, useEffect, useRef } from "react";
import { NetworkingManager } from "../networking/NetworkingManager";
import { ETriggerEvent, FTIMInputEvent } from "../TIM/TIMInputEvent";
import { Vector2 } from "../TIM/Vector2";
import { FTIMMappedAreaHandle } from "../TIM/TIMMappedAreaHandle";
import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { FTIMMappedArea } from "../TIM/TIMMappedArea";
import { Message } from "../schema/WSSchema";
import { FTIMInteractableData } from "../TIM/TIMInteractableData";

interface TapnSlashProps {
  inNetworkingManager: NetworkingManager | null;
}

//global variables
let color = { r: 173, g: 179, b: 175 };
let canvasWidth = window.innerHeight;
let canvasHeight = window.innerHeight;
const borderWidth = 20;
let req: number = 0;

const TNS = ({ inNetworkingManager }: TapnSlashProps) => {
  //html canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasRect = useRef<DOMRect | null>(null);

  // states
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  //screen orientation
  const resizeEvent = window.addEventListener("resize", () => {
    const orientationType = window.screen.orientation.type;
    // console.log(orientationType);
    orientationType === "landscape-primary"
      ? setIsLandscape(true)
      : setIsLandscape(false);
  });

  useEffect(() => {
    //networking message handlers

    //update color of the frame
    const handleTIMMappedAreaAdd = (inTIMMappedArea: FTIMMappedArea): void => {
      color.r = inTIMMappedArea.color.r() * 255;
      color.g = inTIMMappedArea.color.g() * 255;
      color.b = inTIMMappedArea.color.b() * 255;
    };

    const handleTIMInteractableData = (
      inTIMInteractableData: FTIMInteractableData
    ): void => {
      console.log(inTIMInteractableData.tags);
    };

    //Asteroid class----------------------------------------------------------------
    class Asteroid {
      x: number;
      y: number;
      size: number;
      speedx: number;
      speedy: number;
      color: { r: number; g: number; b: number };

      constructor(_x: number, _y: number, _size: number) {
        this.x = _x;
        this.y = _y;
        this.size = _size;
        this.speedx = Math.random() * (3 - 1.2) + 1.2; //random in range
        this.speedy = Math.random() * (3 - 1.2) + 1.2;
        this.color = {
          r: Math.floor(Math.random() * 255),
          g: Math.floor(Math.random() * 255),
          b: Math.floor(Math.random() * 255),
        };
      }
      update() {
        this.x += this.speedx;
        this.y += this.speedy;

        (this.x >= canvasWidth - borderWidth || this.x < borderWidth) &&
          (this.x = borderWidth); //border width
        (this.y >= canvasHeight - borderWidth || this.y < borderWidth) &&
          (this.y = Math.floor(Math.random() * canvasHeight));
      }
      draw(_ctx: CanvasRenderingContext2D) {
        _ctx.beginPath();
        _ctx.fillStyle = `rgb(${this.color.r} ${this.color.g} ${this.color.b})`;
        _ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        _ctx.fill();
        _ctx.closePath();
      }
    }
    //End of asteroid class-----------------------------------------------------------

    // canvas variables
    const canvas = canvasRef.current;
    let Asteroids: Asteroid[] = [];

    for (let i = 0; i < 10; i++) {
      Asteroids.push(new Asteroid(20, 20, 25));
    }

    //canvas functions
    const update = () => {
      //updating all asteroid positions
      for (let asteroid of Asteroids) {
        asteroid.update();
      }
    };

    const draw = (_ctx: CanvasRenderingContext2D) => {
      //clear canvas every frame
      _ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      //frame - canvas outline
      _ctx.beginPath();
      _ctx.lineWidth = 10;
      _ctx.strokeStyle = `rgb(${color.r} ${color.g} ${color.b})`;
      _ctx.rect(0, 0, canvasWidth, canvasHeight);
      _ctx.stroke();
      _ctx.closePath();

      //drawing all asteroids
      for (let asteroid of Asteroids) {
        asteroid.draw(_ctx);
      }
    };

    //loop through canvas functions every frame
    const loop = (_ctx: CanvasRenderingContext2D) => {
      update();
      draw(_ctx);
      req = requestAnimationFrame(() => {
        loop(_ctx);
      });
    };

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctxRef.current = ctx;
        canvasRect.current = canvas.getBoundingClientRect();
        loop(ctx);
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
      }

      inNetworkingManager?.on(
        Message.TIMMappedAreaAdd.toString(),
        handleTIMMappedAreaAdd
      );
      inNetworkingManager?.on(
        Message.TIMInteractableData.toString(),
        handleTIMInteractableData
      );

      return () => {
        //cancel requested animation
        cancelAnimationFrame(req);

        //deregister networking messages
        inNetworkingManager?.off(
          Message.TIMMappedAreaAdd.toString(),
          handleTIMMappedAreaAdd
        );
      };
    }
  }, [inNetworkingManager]);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!ctxRef.current || !canvasRect.current) {
      return;
    }

    setIsDrawing(true);

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

    x /= canvasRect.current.width;
    y /= canvasRect.current.height;

    // console.log("X: " + x + "Y: " + y);

    let Event: ETriggerEvent = ETriggerEvent.Started;
    let Pos: Vector2 = new Vector2(x, y);
    let DateTime: Date = new Date();
    let Time: number = DateTime.getTime();
    let Handle: FTIMMappedAreaHandle = new FTIMMappedAreaHandle(0);

    let NewInput: FTIMInputEvent = new FTIMInputEvent(
      Handle,
      0,
      Pos,
      Event,
      Time
    );

    let Inputs: FTIMInputEvent[] = [];
    Inputs.push(NewInput);
    inNetworkingManager?.sendTIMInputEvents(Inputs);
  };

  const endDrawing = () => {
    setIsDrawing(false);

    let Event: ETriggerEvent = ETriggerEvent.Completed;
    let Pos: Vector2 = new Vector2(0, 0);
    let DateTime: Date = new Date();
    let Time: number = DateTime.getTime();
    let Handle: FTIMMappedAreaHandle = new FTIMMappedAreaHandle(0);

    let NewInput: FTIMInputEvent = new FTIMInputEvent(
      Handle,
      0,
      Pos,
      Event,
      Time
    );

    let Inputs: FTIMInputEvent[] = [];
    Inputs.push(NewInput);
    inNetworkingManager?.sendTIMInputEvents(Inputs);
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

    x /= canvasRect.current.width;
    y /= canvasRect.current.height;

    let Event: ETriggerEvent = ETriggerEvent.Ongoing;
    let Pos: Vector2 = new Vector2(x, y);
    let DateTime: Date = new Date();
    let Time: number = DateTime.getTime();
    let Handle: FTIMMappedAreaHandle = new FTIMMappedAreaHandle(0);

    let NewInput: FTIMInputEvent = new FTIMInputEvent(
      Handle,
      0,
      Pos,
      Event,
      Time
    );

    let Inputs: FTIMInputEvent[] = [];
    Inputs.push(NewInput);
    inNetworkingManager?.sendTIMInputEvents(Inputs);

    // console.log(x, " ", y);
  };

  return (
    <Grid
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(1, 1fr)"
      templateAreas={`"TapRegion" "UIOverlay"`}
      gap={4}
      pt={"10px"}
      h="100%"
      style={{
        position: "relative",
      }}
    >
      <GridItem
        area="TapRegion"
        style={{
          position: "relative",
        }}
        h="100%"
        w="100%"
        rowStart={1}
        colStart={1}
      >
        <canvas
          style={{
            position: "relative",
            background: "#1f1c1e",
          }}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={endDrawing}
          onTouchMove={draw}
          ref={canvasRef}
          height={window.innerHeight * 0.85}
          width={
            isLandscape ? window.innerWidth * 0.92 : window.innerWidth * 0.8
          }
        />
      </GridItem>
    </Grid>
  );
};

export default TNS;
