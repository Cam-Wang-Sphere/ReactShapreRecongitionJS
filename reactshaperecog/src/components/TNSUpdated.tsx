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
import { TIMHitEvent } from "../schema/WSSchema";
import { forEach } from "lodash";
import canvasTintImage from "canvas-tint-image";

interface TapnSlashProps {
  inNetworkingManager: NetworkingManager | null;
  frameColor: {
    r: number;
    g: number;
    b: number;
  };
}

//global variables
let color = { r: 173, g: 179, b: 175 }; // color for the frame
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let reqAnimFrame = 0;
const asteroidImg = new Image();
let mouseX = 100;
let mouseY = 100;

const TNS = ({ inNetworkingManager, frameColor }: TapnSlashProps) => {
  //html canvases
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const ctxRef2 = useRef<CanvasRenderingContext2D | null>(null);
  const canvasRect = useRef<DOMRect | null>(null);
  const canvasRect2 = useRef<DOMRect | null>(null);
  // asteroidImg.src = "../assets/Icons/asteroid.png";
  color = frameColor;
  asteroidImg.src =
    "https://clipart-library.com/images_k/asteroid-transparent/asteroid-transparent-5.png";

  // react states
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  let updateCanvasSize = (HTMLcanvas: HTMLCanvasElement) => {
    canvasWidth = HTMLcanvas.width;
    canvasHeight = HTMLcanvas.height;
    // console.log(canvasWidth + " , " + canvasHeight);
  };

  useEffect(() => {
    //update canvas size when screen orientation changes----------------------------
    const resizeEvent = window.addEventListener("resize", () => {
      const orientationType = window.screen.orientation.type;
      orientationType === "landscape-primary"
        ? setIsLandscape(true)
        : setIsLandscape(false);

      if (canvasRef.current) {
        updateCanvasSize(canvasRef.current);
        canvasRect.current = canvasRef.current.getBoundingClientRect();
        canvasRect2.current = canvasRect.current;
      }
    });

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
      // let scale = inTIMInteractableData.scale;
      let handle = inTIMInteractableData.handle;
      let tag = inTIMInteractableData.tags.toString().substring(14);
      Asteroids.push(new Asteroid(-50, -50, tag, handle));
      console.log("New Asteroid Spawned. Total asteroids: " + Asteroids.length);
    };

    //if the handle of asteroid matches, update location
    const handleTIMInteractableUpdate = (
      inTIMInteractableUpdate: FTIMInteractableData
    ): void => {
      let handle = inTIMInteractableUpdate.handle;
      let location = inTIMInteractableUpdate.location;
      let radius = inTIMInteractableUpdate.normalized_radius;
      let distance = inTIMInteractableUpdate.distance;
      radius *= canvasWidth / 1.6;
      location.x = location.x * canvasWidth;
      location.y = location.y * canvasHeight;

      for (let asteroid of Asteroids) {
        asteroid.handle === handle &&
          asteroid.updateTransform(location, radius, distance);
      }
      sortAsteroidsByDistance(); //so that ones closer overlap the ones further away
    };

    //removing destroyed asteroid from array
    const handleTIMInteractableDestroyed = (
      inTIMInteractableDestroyed: TIMInteractableDestroyed
    ): void => {
      let handle: number = +inTIMInteractableDestroyed;
      Asteroids.forEach((asteroid, index) => {
        if (asteroid.handle === handle) {
          let newArr = Asteroids.filter((ele, ind) => ind !== index);
          Asteroids = newArr;
        }
      });
      console.log("Asteroid Destroyed. Total asteroids: " + Asteroids.length);
    };

    const handleTIMHitEvent = (inTIMHitEvent: TIMHitEvent): void => {
      let handle: number = +inTIMHitEvent.netHandle;
      for (let asteroid of Asteroids) {
        asteroid.handle === handle && asteroid.showTapState();
      }
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

    inNetworkingManager?.on(Message.TIMHitEvent.toString(), handleTIMHitEvent);

    //Asteroid class----------------------------------------------------------------
    class Asteroid {
      x: number;
      y: number;
      size: number; //radius
      originalSize: number;
      tag: string; //small, medium, large
      handle: number; //ID of asteroid
      tintOpacity: number;
      scaleFactor: number;
      distance: number;

      // color: { r: number; g: number; b: number };

      constructor(_x: number, _y: number, _tag: string, _handle: number) {
        this.x = _x;
        this.y = _y;
        this.size = 20;
        this.tag = _tag;
        _tag === "Small" && (this.size = 55);
        _tag === "Medium" && (this.size = 70);
        _tag === "Large" && (this.size = 95);
        this.handle = _handle;
        this.originalSize = this.size;
        this.tintOpacity = 0;
        this.scaleFactor = 0;
        this.distance = 0;
        // this.speedx = Math.random() * (3 - 1.2) + 1.2; //random in range
        // this.color = {
        //   r: Math.floor(Math.random() * 255),
        //   g: Math.floor(Math.random() * 255),
        //   b: Math.floor(Math.random() * 255),
        // };
      }
      updateTransform(pos: Vector2, radius: number, dist: number) {
        this.size = radius + this.scaleFactor;
        this.x = pos.x - this.size / 2;
        this.y = pos.y - this.size / 2;
        this.distance = dist;
      }

      showTapState() {
        this.scaleFactor = 20;
        this.tintOpacity = 0.7;
        setTimeout(() => {
          this.tintOpacity = 0;
          this.scaleFactor = 0;
        }, 500);
      }

      draw(_ctx: CanvasRenderingContext2D) {
        _ctx.beginPath();
        // asteroidImg.onload = () => {

        _ctx.drawImage(
          canvasTintImage(asteroidImg, "red", this.tintOpacity),
          this.x,
          this.y,
          this.size,
          this.size
        );
        // _ctx.drawImage(asteroidImg, this.x, this.y, this.size, this.size);
        _ctx.closePath();
      }
    }
    //End of asteroid class----------------------------------------------------------

    // canvas variables
    const canvas = canvasRef.current;
    const canvas2 = canvasRef2.current;
    let Asteroids: Asteroid[] = [];
    // Asteroids.push(new Asteroid(120, 100, "Medium", 2));
    // Asteroids.push(new Asteroid(110, 400, "Medium", 4));
    // Asteroids.push(new Asteroid(200, 200, "Medium", 1));
    // Asteroids.push(new Asteroid(100, 500, "Medium", 3));

    //sort asteroids by distance so that ones closer overlap the ones further away
    const sortAsteroidsByDistance = () => {
      Asteroids.sort((a, b) => {
        if (a.distance > b.distance) return -1;
        if (a.distance < b.distance) return 1;
        return 0;
      });
    };

    //canvas functions
    const update = () => {
      //updating all asteroid positions
      for (let asteroid of Asteroids) {
        // asteroid.showTapState();
      }
    };

    const draw = (_ctx: CanvasRenderingContext2D) => {
      //clear canvas every frame
      _ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      //draw all asteroids
      for (let asteroid of Asteroids) {
        asteroid.draw(_ctx);
      }

      //draw canvas frame/outline every frame
      _ctx.beginPath();
      _ctx.lineWidth = 10;
      _ctx.strokeStyle = `rgb(${color.r} ${color.g} ${color.b})`;
      _ctx.rect(0, 0, canvasWidth, canvasHeight);
      _ctx.stroke();
      _ctx.closePath();
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
      const ctx2 = canvas2?.getContext("2d");
      if (ctx && ctx2) {
        ctxRef.current = ctx;
        ctxRef2.current = ctx2;
        canvasRect.current = canvas.getBoundingClientRect();
        canvasRect2.current = canvas.getBoundingClientRect();
        updateCanvasSize(canvas);
        // updateCanvasSize(canvas2);
        loop(ctx);
      }
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

      inNetworkingManager?.off(
        Message.TIMHitEvent.toString(),
        handleTIMHitEvent
      );
    };
  }, [inNetworkingManager]);

  let startX: number;
  let startY: number;

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

    startX = x;
    startY = y;

    x /= canvasRect.current.width;
    y /= canvasRect.current.height;

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

    ctxRef2.current?.clearRect(0, 0, canvasWidth, canvasHeight);
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

    mouseX = x;
    mouseY = y;

    if (ctxRef2.current) {
      ctxRef2.current.beginPath();
      ctxRef2.current.globalAlpha = 1;
      ctxRef2.current.lineCap = "round";
      ctxRef2.current.lineJoin = "round";
      ctxRef2.current.strokeStyle = "grey";
      ctxRef2.current.lineWidth = 8;
      ctxRef2.current.moveTo(startX, startY);
      ctxRef2.current.lineTo(mouseX, mouseY);
      ctxRef2.current.stroke();
      ctxRef2.current.closePath();
    }
    startX = mouseX;
    startY = mouseY;

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
      <GridItem area="TapRegion" rowStart={1} colStart={1} bg="pink">
        <canvas
          style={{
            position: "relative",
            background: "#1f1c1e",
            // background: "pink",
          }}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={endDrawing}
          onTouchMove={draw}
          ref={canvasRef}
          height={window.innerHeight * 0.9}
          width={window.innerWidth * 0.9}
        />
      </GridItem>

      <GridItem area="TapRegion" rowStart={1} colStart={1}>
        <canvas
          style={{
            position: "relative",
            background: "rgba(255,0,0,0)",
          }}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={endDrawing}
          onTouchMove={draw}
          ref={canvasRef2}
          height={window.innerHeight * 0.9}
          width={window.innerWidth * 0.9}
        />
      </GridItem>
    </Grid>
  );
};

export default TNS;
