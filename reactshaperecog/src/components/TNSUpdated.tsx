import React, { useState, useEffect, useRef } from "react";
import { NetworkingManager } from "../networking/NetworkingManager";
import { ETriggerEvent, FTIMInputEvent } from "../TIM/TIMInputEvent";
import { Vector2 } from "../TIM/Vector2";
import { FTIMMappedAreaHandle } from "../TIM/TIMMappedAreaHandle";
import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { FTIMMappedArea } from "../TIM/TIMMappedArea";
import { Message } from "../schema/WSSchema";
import { FTIMInteractableData } from "../TIM/TIMInteractableData";
import { TIMInteractableDestroyed } from "../schema/WSSchema";
import { forEach } from "lodash";

interface TapnSlashProps {
  inNetworkingManager: NetworkingManager | null;
}

//global variables
let color = { r: 173, g: 179, b: 175 }; // color for the frame
let canvasWidth = window.innerHeight;
let canvasHeight = window.innerHeight;
const borderWidth = 20;
let reqAnimFrame = 0;

const TNS = ({ inNetworkingManager }: TapnSlashProps) => {
  //html canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasRect = useRef<DOMRect | null>(null);

  // react states
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
    //networking message handlers---------------------------------------------------

    //assign color of the frame
    const handleTIMMappedAreaAdd = (inTIMMappedArea: FTIMMappedArea): void => {
      color.r = inTIMMappedArea.color.r() * 255;
      color.g = inTIMMappedArea.color.g() * 255;
      color.b = inTIMMappedArea.color.b() * 255;
    };

    // spawn new asteroid, add asteroid to array, assign tag and handle
    const handleTIMInteractableData = (
      inTIMInteractableData: FTIMInteractableData
    ): void => {
      let handle = inTIMInteractableData.handle;
      let tag = inTIMInteractableData.tags.toString().substring(14);
      Asteroids.push(new Asteroid(100, 100, tag, handle));
      console.log(
        "New Asteroid Spawned (handle: " +
          handle +
          "). Total asteroids: " +
          Asteroids.length
      );
    };

    //if the handle of asteroid matches, update location
    const handleTIMInteractableUpdate = (
      inTIMInteractableUpdate: FTIMInteractableData
    ): void => {
      let handle = inTIMInteractableUpdate.handle;
      let location = inTIMInteractableUpdate.location;

      console.log("asteroid (handle: " + handle + ") location:");
      console.log(location);
      location.x *= canvasWidth;
      location.y *= canvasHeight;
      // location.x = location.x * -1 * canvasWidth;
      // location.y = location.y * -1 * canvasHeight;
      for (let asteroid of Asteroids) {
        asteroid.handle === handle && asteroid.updatePosition(location);
        // console.log(handle, ": ", location);
      }
    };

    //removing destroyed asteroid from array
    const handleTIMInteractableDestroyed = (
      inTIMInteractableDestroyed: TIMInteractableDestroyed
    ): void => {
      let handle: number = +inTIMInteractableDestroyed;
      Asteroids.forEach((asteroid, index) => {
        if (asteroid.handle === handle) {
          //check destroyed
          // let newArr = Asteroids.filter((ele, ind) => ind !== index);
          // Asteroids = newArr;
        }
      });
      // console.log(
      //   "Asteroid (handle: " +
      //     handle +
      //     ") Destroyed. Total asteroids: " +
      //     Asteroids.length
      // );
    };

    inNetworkingManager?.on(
      Message.TIMMappedAreaAdd.toString(),
      handleTIMMappedAreaAdd
    );
    inNetworkingManager?.on(
      Message.TIMInteractableData.toString(),
      handleTIMInteractableData
    );

    inNetworkingManager?.on(
      Message.TIMInteractableUpdate.toString(),
      handleTIMInteractableUpdate
    );

    inNetworkingManager?.on(
      Message.TIMInteractableDestroyed.toString(),
      handleTIMInteractableDestroyed
    );

    //Asteroid class----------------------------------------------------------------
    class Asteroid {
      x: number;
      y: number;
      size: number; //radius
      tag: string; //small, medium, large
      handle: number; //ID of asteroid
      // speedx: number;
      // speedy: number;
      color: { r: number; g: number; b: number };

      constructor(_x: number, _y: number, _tag: string, _handle: number) {
        this.x = _x;
        this.y = _y;
        this.size = 20;
        this.tag = _tag;
        _tag === "Small" && (this.size = 20);
        _tag === "Medium" && (this.size = 35);
        _tag === "Large" && (this.size = 50);
        this.handle = _handle;

        // this.speedx = Math.random() * (3 - 1.2) + 1.2; //random in range
        // this.speedy = Math.random() * (3 - 1.2) + 1.2;
        this.color = {
          r: Math.floor(Math.random() * 255),
          g: Math.floor(Math.random() * 255),
          b: Math.floor(Math.random() * 255),
        };
      }
      updatePosition(pos: Vector2) {
        this.x = pos.x;
        this.y = pos.y;
        // this.x += this.speedx;
        // this.y += this.speedy;
        // (this.x >= canvasWidth - borderWidth || this.x < borderWidth) &&
        //   (this.x = borderWidth); //border width
        // (this.y >= canvasHeight - borderWidth || this.y < borderWidth) &&
        //   (this.y = Math.floor(Math.random() * canvasHeight));
      }
      draw(_ctx: CanvasRenderingContext2D) {
        _ctx.beginPath();
        _ctx.fillStyle = `rgb(${this.color.r} ${this.color.g} ${this.color.b})`;
        _ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        _ctx.fill();
        _ctx.closePath();
      }
    }
    //End of asteroid class----------------------------------------------------------

    // canvas variables
    const canvas = canvasRef.current;
    let Asteroids: Asteroid[] = [];

    // for (let i = 0; i < 10; i++) {
    //   Asteroids.push(new Asteroid(20, 20, "small"));
    // }

    //canvas functions
    const update = () => {
      //updating all asteroid positions
      // for (let asteroid of Asteroids) {
      //   asteroid.update();
      // }
    };

    const draw = (_ctx: CanvasRenderingContext2D) => {
      //clear canvas every frame
      _ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      //frame: canvas outline
      _ctx.beginPath();
      _ctx.lineWidth = 10;
      _ctx.strokeStyle = `rgb(${color.r} ${color.g} ${color.b})`;
      _ctx.rect(0, 0, canvasWidth, canvasHeight);
      _ctx.stroke();
      _ctx.closePath();

      //draw all asteroids
      for (let asteroid of Asteroids) {
        asteroid.draw(_ctx);
      }
    };

    //loop through canvas functions every frame
    const loop = (_ctx: CanvasRenderingContext2D) => {
      update();
      draw(_ctx);
      reqAnimFrame = requestAnimationFrame(() => {
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

      return () => {
        //cancel requested animation
        cancelAnimationFrame(reqAnimFrame);

        //deregister networking messages----------------------------------------------
        inNetworkingManager?.off(
          Message.TIMMappedAreaAdd.toString(),
          handleTIMMappedAreaAdd
        );

        inNetworkingManager?.off(
          Message.TIMInteractableData.toString(),
          handleTIMInteractableData
        );

        inNetworkingManager?.off(
          Message.TIMInteractableUpdate.toString(),
          handleTIMInteractableUpdate
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

    console.log("X: " + x + "Y: " + y);

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
