import React, { useState, useEffect, useRef } from "react";
import { NetworkingManager } from "../networking/NetworkingManager";
import { ETriggerEvent, FTIMInputEvent } from "../TIM/TIMInputEvent";
import { FTIMInputInteractable } from "../TIM/TIMInputInteractable";
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
let mappedAreaDist = 0;
let asteroidSpawnDist = 0;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let reqAnimFrame = 0;
const asteroidImg = new Image();
let mouse = new Vector2(0, 0);
let tappedAsteroidHandle: number;

const RemapInRange = (
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const RadarView = ({ inNetworkingManager, frameColor }: TapnSlashProps) => {
  //html canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasRect = useRef<DOMRect | null>(null);
  color = frameColor;
  // asteroidImg.src = "../assets/Icons/asteroid.png";
  asteroidImg.src =
    "https://clipart-library.com/images_k/asteroid-transparent/asteroid-transparent-5.png";

  // react states
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  let updateCanvasSize = (HTMLcanvas: HTMLCanvasElement) => {
    canvasWidth = HTMLcanvas.width;
    canvasHeight = HTMLcanvas.height;
  };

  useEffect(() => {
    //update canvas size when screen orientation changes---------------------------------------------------------------------------------------------------------------
    const resizeEvent = window.addEventListener("resize", () => {
      const orientationType = window.screen.orientation.type;
      orientationType === "landscape-primary"
        ? setIsLandscape(true)
        : setIsLandscape(false);

      if (canvasRef.current) {
        updateCanvasSize(canvasRef.current);
        canvasRect.current = canvasRef.current.getBoundingClientRect();
      }
    });

    //networking message handlers----------------------------------------------------------------------------------------------------------------------------------------

    //assign color of the frame
    const handleTIMMappedAreaAdd = (inTIMMappedArea: FTIMMappedArea): void => {
      color.r = inTIMMappedArea.color.r() * 255;
      color.g = inTIMMappedArea.color.g() * 255;
      color.b = inTIMMappedArea.color.b() * 255;
      mappedAreaDist = inTIMMappedArea.distance;
    };

    // spawn new asteroid, add asteroid to array, assign tag and handle
    const handleTIMInteractableData = (
      inTIMInteractableData: FTIMInteractableData
    ): void => {
      // let scale = inTIMInteractableData.scale;
      asteroidSpawnDist = inTIMInteractableData.distance;
      let handle = inTIMInteractableData.handle;
      let tag = inTIMInteractableData.tags.toString().substring(14);
      Asteroids.push(new Asteroid(-50, -50, 1, tag, handle));
      console.log("New Asteroid Spawned. Total asteroids: " + Asteroids.length);
    };

    //if the handle of asteroid matches, update location
    const handleTIMInteractableUpdate = (
      inTIMInteractableUpdate: FTIMInteractableData
    ): void => {
      let distance = inTIMInteractableUpdate.distance;
      let handle = inTIMInteractableUpdate.handle;
      let location = inTIMInteractableUpdate.location;
      location.x *= canvasWidth;
      let distanceFromFrame = distance - mappedAreaDist;
      distanceFromFrame = RemapInRange(
        distanceFromFrame,
        mappedAreaDist,
        7000,
        canvasHeight,
        0
      );

      for (let asteroid of Asteroids) {
        asteroid.handle === handle &&
          asteroid.updatePosition(new Vector2(location.x, distanceFromFrame));
      }
      // sortAsteroidsByDistance();
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
      // for (let asteroid of Asteroids) {
      // asteroid.handle === handle && asteroid.showTapState();
      // }
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

    //Asteroid class-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    class Asteroid {
      x: number;
      y: number;
      size: number; //radius
      tag: string; //small, medium, large
      handle: number; //ID of asteroid
      tintOpacity: number;
      scaleFactor: number;
      distance: number;
      shape: number;
      color: string;
      originalSize: number;
      // color: { r: number; g: number; b: number };

      constructor(
        _x: number,
        _y: number,
        _shape: number,
        _tag: string,
        _handle: number
      ) {
        this.x = _x;
        this.y = _y;
        this.size = 20;
        this.shape = _shape;
        this.tag = _tag;
        _tag === "Small" && (this.size = 10);
        _tag === "Medium" && (this.size = 25);
        _tag === "Large" && (this.size = 40);
        this.handle = _handle;
        this.tintOpacity = 1;
        this.scaleFactor = 0;
        this.distance = 0;
        this.color = "orange";
        this.originalSize = this.size;
      }
      updatePosition(pos: Vector2) {
        this.x = pos.x;
        this.y = pos.y;
        this.size += this.scaleFactor;
      }

      showTapState() {
        this.size += 5;
        this.color = "red";
        setTimeout(() => {
          this.size = this.originalSize;
          this.color = "orange";
        }, 200);
      }

      flash() {
        let flashTimes = [100, 300, 500, 700, 900, 1100];
        let switchColor = true;

        for (let time of flashTimes) {
          setTimeout(() => {
            switchColor ? (this.color = "white") : (this.color = "orange");
            switchColor ? (this.size += 3) : (this.size -= 3);
            this.shape === 2 &&
              (switchColor
                ? (this.y += this.size / 2)
                : (this.y -= this.size / 2));
            switchColor = !switchColor;
          }, time);
        }
      }

      draw(_ctx: CanvasRenderingContext2D) {
        _ctx.beginPath();
        _ctx.globalAlpha = this.tintOpacity;
        switch (this.shape) {
          case 1: {
            // console.log("Draw Cirlce");
            _ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            break;
          }
          case 2: {
            // console.log("Draw Triangle");
            _ctx.beginPath();
            _ctx.moveTo(this.x, this.y);
            _ctx.lineTo(this.x - this.size - 5, this.y + this.size + 15);
            _ctx.lineTo(this.x + this.size + 5, this.y + this.size + 15);
            _ctx.closePath();
            break;
          }
          case 3: {
            // console.log("Draw Square");
            _ctx.rect(
              this.x - (this.size + 20) / 2,
              this.y - (this.size + 20) / 2,
              this.size + 20,
              this.size + 20
            );
            break;
          }
          case 4: {
            // console.log("Draw Cross");
            _ctx.beginPath();
            _ctx.moveTo(this.x - 23, this.y - 23);
            _ctx.lineTo(this.x + 23, this.y + 23);
            _ctx.stroke();

            _ctx.moveTo(this.x + 23, this.y - 23);
            _ctx.lineTo(this.x - 23, this.y + 23);
            _ctx.stroke();
            _ctx.closePath();
            break;
          }
        }
        _ctx.strokeStyle = this.color;
        _ctx.fillStyle = this.color;
        _ctx.fill();
        _ctx.closePath();
      }
    }
    //End of asteroid class---------------------------------------------------------------------------------------------------------------------------------------------------------------

    //Radar Pulse class-------------------------------------------------------------------------------------------------------------------------------------------------------------------
    class RadarPulse {
      x: number;
      y: number;
      radius: number; //radius
      speed: number;
      fillOpacity: number;
      scaleFactor: number;
      // color: { r: number; g: number; b: number };
      color: { r: number; g: number; b: number };

      constructor(
        _x: number,
        _y: number,
        _speed: number,
        _color: { r: number; g: number; b: number }
      ) {
        this.x = _x;
        this.y = _y;
        this.radius = 20;
        this.speed = _speed;
        this.fillOpacity = 0.5;
        this.scaleFactor = 0;
        this.color = _color;
        // this.speedx = Math.random() * (3 - 1.2) + 1.2; //random in range
      }
      radiate() {
        this.radius += this.speed;
        this.fillOpacity >= 0.01 && (this.fillOpacity -= 0.004);
        if (this.radius / 2 > canvasHeight) {
          this.radius = 20;
          this.fillOpacity = 0.5;
        }
      }

      draw(_ctx: CanvasRenderingContext2D) {
        _ctx.beginPath();
        _ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // _ctx.fillStyle = `rgb(${color.r} ${color.g} ${color.b})`;
        _ctx.fillStyle = "grey";
        _ctx.globalAlpha = this.fillOpacity;
        _ctx.fill();
        _ctx.closePath();
      }
    }
    //End of Radar Pulse class---------------------------------------------------------------------------------------------------------------------------------------------------------------

    // canvas variables
    const canvas = canvasRef.current;
    let Asteroids: Asteroid[] = [];
    let RadarPulses: RadarPulse[] = [];
    RadarPulses.push(new RadarPulse(canvasWidth / 2, canvasHeight, 14, color));

    // Asteroids.push(new Asteroid(110, 400, 1, "Medium", 4));
    // Asteroids.push(new Asteroid(200, 200, 2, "Medium", 1));
    // Asteroids.push(new Asteroid(100, 500, 4, "Medium", 3));

    //sort asteroids by distance so that ones closer overlap the ones further away
    const sortAsteroidsByDistance = () => {
      Asteroids.sort((a, b) => {
        if (a.distance > b.distance) return -1;
        if (a.distance < b.distance) return 1;
        return 0;
      });
    };

    //canvas functions------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const update = () => {
      //check if player taps on an asteroid
      let tapArea = 50;
      for (let asteroid of Asteroids) {
        if (
          mouse.x >= asteroid.x - tapArea &&
          mouse.x <= asteroid.x + tapArea &&
          mouse.y >= asteroid.y - tapArea &&
          mouse.y <= asteroid.y + tapArea
        ) {
          asteroid.showTapState();
          tappedAsteroidHandle = asteroid.handle;
        }
      }

      //updating all asteroid positions
      for (let radarPulse of RadarPulses) {
        radarPulse.radiate();
      }
    };

    const draw = (_ctx: CanvasRenderingContext2D) => {
      //clear canvas every frame------------------------
      _ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      //draw all asteroids------------------------------
      for (let asteroid of Asteroids) {
        asteroid.draw(_ctx);
      }

      //draw all Radar pulses-------------------------
      for (let radarPulse of RadarPulses) {
        radarPulse.draw(_ctx);
      }

      // Player Ship-----------------------------------
      _ctx.beginPath();
      _ctx.globalAlpha = 1;
      _ctx.arc(canvasWidth / 2, canvasHeight, 40, 0, 2 * Math.PI);
      _ctx.fillStyle = `rgb(${color.r} ${color.g} ${color.b})`;
      _ctx.fill();
      _ctx.closePath();

      //draw canvas frame/mapped area -----------------
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
      if (ctx) {
        ctxRef.current = ctx;
        canvasRect.current = canvas.getBoundingClientRect();
        updateCanvasSize(canvas);
        loop(ctx);
      }
    }

    return () => {
      //cancel requested animation
      cancelAnimationFrame(reqAnimFrame);

      //deregister networking messages------------------------------------------------------------------------------------------------------------------------------------------------------------
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

    mouse.x = x;
    mouse.y = y;

    x /= canvasRect.current.width;
    y /= canvasRect.current.height;

    // console.log("X: " + x + "Y: " + y);

    let Event: ETriggerEvent = ETriggerEvent.Started;
    let Pos: Vector2 = new Vector2(x, y);
    let DateTime: Date = new Date();
    let Time: number = DateTime.getTime();
    let Handle: FTIMMappedAreaHandle = new FTIMMappedAreaHandle(0);

    console.log("tapped asteroid handle is.... " + tappedAsteroidHandle);

    let NewInput: FTIMInputInteractable = new FTIMInputInteractable(
      tappedAsteroidHandle
    );
    let Inputs: FTIMInputInteractable[] = [];

    if (tappedAsteroidHandle) {
      Inputs.push(NewInput);
      inNetworkingManager?.sendTIMInputInteractableEvents(Inputs);
    }

    // let NewInput: FTIMInputEvent = new FTIMInputEvent(
    //   Handle,
    //   0,
    //   Pos,
    //   Event,
    //   Time
    // );

    // let Inputs: FTIMInputEvent[] = [];
    // Inputs.push(NewInput);
    // inNetworkingManager?.sendTIMInputEvents(Inputs);
  };

  const endDrawing = () => {
    setIsDrawing(false);

    let Event: ETriggerEvent = ETriggerEvent.Completed;
    let Pos: Vector2 = new Vector2(0, 0);
    let DateTime: Date = new Date();
    let Time: number = DateTime.getTime();
    let Handle: FTIMMappedAreaHandle = new FTIMMappedAreaHandle(0);
    mouse.x = 0;
    mouse.y = 0;

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
      pt="10px"
      h="100%"
      mt={isLandscape ? "-12%" : "-38%"}
      style={{
        position: "relative",
      }}
    >
      <GridItem area="TapRegion" rowStart={1} colStart={1}>
        <Text color="white">Radar View </Text>
        <canvas
          style={{
            position: "relative",
            background: "#1f1c1e",
          }}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          // onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={endDrawing}
          // onTouchMove={draw}
          ref={canvasRef}
          height={window.innerHeight * 0.9}
          width={window.innerWidth * 0.9}
        />
      </GridItem>
    </Grid>
  );
};

export default RadarView;
