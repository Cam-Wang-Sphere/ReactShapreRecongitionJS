import React, { useState, useEffect, useRef } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
import { ETriggerEvent, FTIMInputEvent } from "../TIM/TIMInputEvent";
import { Vector2 } from "../TIM/Vector2";
import { FTIMMappedAreaHandle } from "../TIM/TIMMappedAreaHandle";
import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";

interface TapnSlashProps {
  inNetworkingManager: NetworkingManager | null;
}

const canvasWidth = window.innerHeight;
const canvasHeight = window.innerHeight;

const TapnSlashInput = ({ inNetworkingManager }: TapnSlashProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasRect = useRef<DOMRect | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const resizeEvent = window.addEventListener("resize", () => {
    const orientationType = window.screen.orientation.type;
    // console.log(orientationType);
    orientationType === "landscape-primary"
      ? setIsLandscape(true)
      : setIsLandscape(false);
  });

  let astSpeed = [0, 0, 0, 0, 0];
  let speed = 6;
  let radius = 40;
  let opacity = 0.5;
  let pos = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];
  let enemyOpacity = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctxRef.current = ctx;
        canvasRect.current = canvas.getBoundingClientRect();

        // random location
        for (var i = 0; i < 5; i++) {
          pos[i].x = Math.floor(Math.random() * canvas.width);
          pos[i].y = Math.floor(Math.random() * canvas.height);
          astSpeed[i] = Math.random() * 2;
          enemyOpacity[i] = 0.1;
        }

        const render = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          //Ship bottom hemisphere
          ctx.beginPath();
          ctx.globalAlpha = 1;
          ctx.arc(canvas.width / 2, canvas.height, 40, 0, 2 * Math.PI);
          ctx.fillStyle = "#39D7B9";
          ctx.fill();
          ctx.closePath();

          //Radar Waves
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height, radius, 0, 2 * Math.PI);
          ctx.fillStyle = "#39D7B9";
          ctx.globalAlpha = opacity;
          ctx.fill();
          ctx.closePath();

          for (var i = 0; i < 5; i++) {
            //draw enemy
            ctx.beginPath();
            ctx.globalAlpha = enemyOpacity[i];
            ctx.arc(pos[i].x, pos[i].y, 20, 0, Math.PI * 2);
            ctx.fillStyle = "orange";
            ctx.fill();
            ctx.closePath();

            //detect and light up enemy
            if (pos[i].y >= canvas.height - radius) {
              enemyOpacity[i] = 0.6;
            }

            //update enemy speed
            pos[i].y += astSpeed[i];

            //reset enemy pos
            if (pos[i].y >= canvas.height) {
              pos[i].y -= canvas.height;
              enemyOpacity[i] = 0.1;
              pos[i].x = Math.floor(Math.random() * canvas.width);
            }
          }

          // change radius and opacity;
          radius += speed;
          opacity >= 0.01 && (opacity -= 0.004);

          //reset radius and opacity
          if (radius >= 900) {
            for (var i = 0; i < 5; i++) {
              enemyOpacity[i] = 0.1;
            }
            radius = 40;
          }
          //   radius >= 900 && (radius = 40) &&( for (var i = 0; i < 5; i++) { enemyOpacity[i] = 0;} );
          radius === 40 && (opacity = 0.5);
          requestAnimationFrame(render);
        };

        render();
      }
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

    // // canvas drawing------------------------------------------------
    // const img = new Image();
    // img.src = "https://k3no.com/Meetup/hang-in-there.jpg";
    // // img.src = "../assets/Icons/asteroid.png";
    // // ctxRef.current.fillRect(x, y, 100, 100);
    // ctxRef.current.drawImage(img, 50, 50, 50, 50);
    // console.log(img);

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
        area="UIOverlay"
        // bg={"pink"}
        bg="#1f1c1e"
        // borderColor="#FF0099"
        // borderWidth="5px"
        style={{
          position: "relative",
        }}
        h="98%"
        w="100%"
        rowStart={1}
        colStart={1}
      >
        <HStack justifyContent="space-between">
          <Text fontSize="xl" color="#39D7B9" p="20px">
            Name
          </Text>
          <Text fontSize="xl" color="#39D7B9" p="20px">
            Score
          </Text>
        </HStack>
      </GridItem>
      <GridItem
        area="TapRegion"
        style={{
          position: "relative",
          // background: "blue",
        }}
        h="100%"
        w="100%"
        rowStart={1}
        colStart={1}
      >
        <canvas
          style={{
            position: "relative",
            // background: "#1f1c1e",
            // opacity: "0.5",
            borderStyle: "solid",
            borderColor: "#39D7B9",
            borderWidth: "5px",
            // height: "100%",
            // width: "100%",
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
          // height={isLandscape ? 370 : 570} // dynamic resize
          // width={isLandscape ? 870 : 330}
        />
        {/* <Box
          bg={"pink"}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        ></Box> */}
      </GridItem>
    </Grid>
  );
};

export default TapnSlashInput;
