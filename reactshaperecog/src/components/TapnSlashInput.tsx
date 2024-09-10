import React, { useState, useEffect, useRef } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
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

  let pos = [0, 10];
  let speed = [1, 1.2];
  const heartImage = new Image();
  const img = new Image();
  let color = { r: 173, g: 179, b: 175 };

  // class Ball {
  //   constructor(x: number, y: number, size: number) {
  //     this.x = x;
  //     this.y = y;
  //     this.size = size;
  //   }

  //   draw(_ctx: CanvasRenderingContext2D) {
  //     _ctx.beginPath();
  //     _ctx.fillStyle = `rgb(255,0,0)`;
  //     _ctx.rect(this.x, this,y, this.size, this.size);
  //     _ctx.closePath();
  //   }
  // }

  // let newBall = new Ball(100, 100, 50);

  useEffect(() => {
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
        heartImage.src = "../assets/Icons/asteroid.png";
        img.src = "https://k3no.com/Meetup/hang-in-there.jpg";
        // heartImage.onload = () => {
        //   ctx.drawImage(heartImage, pos[0], pos[1], 50, 50);
        // };

        const render = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          ctx.lineWidth = 10;
          ctx.strokeStyle = `rgb(${color.r} ${color.g} ${color.b})`;
          ctx.rect(0, 0, canvas.width, canvas.height);
          ctx.stroke();
          ctx.closePath();

          // newBall.draw(ctx);

          ctx.fillStyle = `rgb(${color.r} ${color.g} ${color.b})`;
          ctx.fillRect(pos[0], pos[1], 50, 50);
          // ctx.drawImage(img, pos[0], pos[1], 50, 50);
          pos[0] += speed[0];
          pos[1] += speed[1];

          (pos[0] >= canvas.width || pos[0] < 0) && (speed[0] *= -1);
          (pos[1] >= canvas.height || pos[1] < 0) && (speed[1] *= -1);
          requestAnimationFrame(render);
        };

        inNetworkingManager?.on(
          Message.TIMMappedAreaAdd.toString(),
          handleTIMMappedAreaAdd
        );
        inNetworkingManager?.on(
          Message.TIMInteractableData.toString(),
          handleTIMInteractableData
        );

        render();
      }

      return () => {
        // inNetworkingManager?.off(Message.TIMMappedAreaAdd.toString(), handleMessage);
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
      {/* UI Elements overlayed */}
      {/* <GridItem
        area="UIOverlay"
        // // bg="gray.700"
        // borderColor="#FF0099"
        // borderWidth="5px"
        style={{
          position: "relative",
        }}
        h="100%"
        w="100%"
        rowStart={1}
        colStart={1}
      >
        <HStack justifyContent="space-between">
          <Text fontSize="xl" color="#FF0099" p="20px">
            Name
          </Text>
          <Text fontSize="xl" color="#FF0099" p="20px">
            Score
          </Text>
        </HStack>
      </GridItem> */}

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
            background: "#1f1c1e",
            // borderStyle: "solid",
            // borderColor: `rgb(${color.r} ${color.g} ${color.b})`,
            // borderWidth: "5px",
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
      </GridItem>
    </Grid>
  );
};

export default TapnSlashInput;
