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

  function generateRandFloat() {
    var min = 0.3,
      max = 0.5,
      RandomNumber = Math.random() * (max - min) + min;

    return RandomNumber;
  }

  const randomNum = (min: number, max: number) => {
    var RandomNumber = Math.random() * (max - min) + min;

    return RandomNumber;
  };

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
  let enemyColor = [];
  let mouse = {
    x: 0,
    y: 0,
  };

  //different shapes
  let asteroids = [
    {
      type: "circle",
      x: 50,
      y: 10,
      speed: 0.4,
      color: "orange",
      opacity: 0.1,
      size: 27,
      isDestroyed: false,
    },
    {
      type: "square",
      x: 130,
      y: -10,
      speed: 0.5,
      color: "orange",
      opacity: 0.1,
      size: 50,
      isDestroyed: false,
    },
    {
      type: "triangle",
      x: 260,
      y: 0,
      speed: 0.6,
      color: "orange",
      opacity: 0.1,
      size: 38,
      isDestroyed: false,
    },
    {
      type: "circle",
      x: 50,
      y: 10,
      speed: 0.4,
      color: "orange",
      opacity: 0.1,
      size: 27,
      isDestroyed: false,
    },
    {
      type: "square",
      x: 130,
      y: -10,
      speed: 0.5,
      color: "orange",
      opacity: 0.1,
      size: 50,
      isDestroyed: false,
    },
    {
      type: "triangle",
      x: 260,
      y: 0,
      speed: 0.6,
      color: "orange",
      opacity: 0.1,
      size: 38,
      isDestroyed: false,
    },
  ];

  let yDist = 300;
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

        //mouse position
        window.addEventListener("touchstart", (e) => {
          mouse.x = e.touches[0].clientX;
          mouse.y = e.touches[0].clientY;
        });

        // random location
        for (var i = 0; i < 5; i++) {
          pos[i].x = Math.floor(Math.random() * canvas.width);
          pos[i].y = Math.floor(Math.random() * canvas.height);
          astSpeed[i] = Math.random() * 2;
          enemyOpacity[i] = 0.1;
          enemyColor[i] = "orange";
        }

        for (var i = 0; i < asteroids.length; i++) {
          // asteroids[i].x = Math.floor(Math.random() * canvas.width);
          // asteroids[i].y = ;
          asteroids[i].speed = generateRandFloat();
        }

        asteroids[3].x = asteroids[0].x;
        asteroids[4].x = asteroids[1].x;
        asteroids[5].x = asteroids[2].x;

        asteroids[3].y = asteroids[0].y - yDist;
        asteroids[4].y = asteroids[1].y - yDist;
        asteroids[5].y = asteroids[2].y - yDist;

        const render = () => {
          //clear canavs
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

          //shape asteroids

          //circle 1
          ctx.beginPath();
          ctx.globalAlpha = asteroids[0].opacity;
          ctx.arc(
            asteroids[0].x,
            asteroids[0].y,
            asteroids[0].size,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = asteroids[0].color;
          ctx.fill();
          ctx.closePath();

          //circle 2
          ctx.beginPath();
          ctx.globalAlpha = asteroids[3].opacity;
          ctx.arc(
            asteroids[3].x,
            asteroids[3].y,
            asteroids[3].size,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = asteroids[3].color;
          ctx.fill();
          ctx.closePath();

          //square1
          ctx.beginPath();
          ctx.globalAlpha = asteroids[1].opacity;
          ctx.fillRect(
            asteroids[1].x,
            asteroids[1].y,
            asteroids[1].size,
            asteroids[1].size
          );
          ctx.fillStyle = asteroids[1].color;
          ctx.fill();
          ctx.closePath();

          //square2
          ctx.beginPath();
          ctx.globalAlpha = asteroids[4].opacity;
          ctx.fillRect(
            asteroids[4].x,
            asteroids[4].y,
            asteroids[4].size,
            asteroids[4].size
          );
          ctx.fillStyle = asteroids[4].color;
          ctx.fill();
          ctx.closePath();

          //triangle1
          ctx.beginPath();
          ctx.globalAlpha = asteroids[2].opacity;
          ctx.moveTo(asteroids[2].x, asteroids[2].y);
          ctx.lineTo(
            asteroids[2].x - asteroids[2].size,
            asteroids[2].y + asteroids[2].size + 4
          );
          ctx.lineTo(
            asteroids[2].x + asteroids[2].size,
            asteroids[2].y + asteroids[2].size + 4
          );
          ctx.fillStyle = asteroids[2].color;
          ctx.fill();
          ctx.closePath();

          //triangle2
          ctx.beginPath();
          ctx.globalAlpha = asteroids[5].opacity;
          ctx.moveTo(asteroids[5].x, asteroids[5].y);
          ctx.lineTo(
            asteroids[5].x - asteroids[5].size,
            asteroids[5].y + asteroids[5].size + 4
          );
          ctx.lineTo(
            asteroids[5].x + asteroids[5].size,
            asteroids[5].y + asteroids[5].size + 4
          );
          ctx.fillStyle = asteroids[5].color;
          ctx.fill();
          ctx.closePath();

          for (var i = 0; i < asteroids.length; i++) {
            //update speed
            asteroids[i].y += asteroids[i].speed;

            //reset asteroids
            if (asteroids[i].y > canvas.height) {
              asteroids[i].y = -10;
              asteroids[i].color = "orange";
              asteroids[i].opacity = 0.1;
              asteroids[i].isDestroyed = false;
              //reset mouse
              mouse.x = 0;
              mouse.y = 0;
            }

            if (
              !asteroids[i].isDestroyed &&
              asteroids[i].y >= canvas.height - radius
            ) {
              //   //detect and light up enemy -----------
              // asteroids[i].opacity = 0.6;
            }

            //fadeway asteroids
            // asteroids[i].opacity > 0.1 && (asteroids[i].opacity -= 0.01);

            //tapping on asteeoids
            if (
              mouse.x >= asteroids[i].x &&
              mouse.x < asteroids[i].x + 100 &&
              mouse.y >= asteroids[i].y &&
              mouse.y < asteroids[i].y + 100
            ) {
              // let newSize = asteroids[i].size;
              // asteroids[i].size *= 0.5;
              asteroids[i].opacity = 0;
              asteroids[i].isDestroyed = true;
            }
          }

          // for (var i = 0; i < 5; i++) {
          //   //draw enemy
          //   ctx.beginPath();
          //   ctx.globalAlpha = enemyOpacity[i];
          //   ctx.arc(pos[i].x, pos[i].y, 20, 0, Math.PI * 2);
          //   ctx.fillStyle = enemyColor[i];
          //   // i === 0 ? (ctx.fillStyle = "red") : (ctx.fillStyle = "orange");
          //   ctx.fill();
          //   ctx.closePath();

          //   //detect and light up enemy
          //   if (pos[i].y >= canvas.height - radius) {
          //     enemyOpacity[i] = 0.6;
          //   }

          //   //update enemy speed
          //   pos[i].y += astSpeed[i];

          //   //reset enemy pos
          //   if (pos[i].y >= canvas.height) {
          //     pos[i].y -= canvas.height;
          //     enemyOpacity[i] = 0.1;
          //     pos[i].x = Math.floor(Math.random() * canvas.width);
          //     enemyColor[i] = "orange";
          //   }

          //   //mouse press
          //   if (
          //     mouse.x >= pos[i].x &&
          //     mouse.x < pos[i].x + 60 &&
          //     mouse.y >= pos[i].y &&
          //     mouse.y < pos[i].y + 60
          //   ) {
          //     //   enemyOpacity[i] = 0;
          //     enemyColor[i] = "red";
          //   }
          // }

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
          requestAnimationFrame(animate);
        };

        render();
      }
    }
  }, [inNetworkingManager]);

  var startTime = 0;

  let index = false;
  var colors = [0, 0.6];

  function animate(time: number) {
    requestAnimationFrame(animate);
    var interval = randomNum(400, 600);
    if (startTime === 0) {
      startTime = time;
    }
    var elapsed = time - startTime;
    if (elapsed > interval) {
      startTime = time;
      index = !index;
      for (var i = 0; i < asteroids.length; i++) {
        if (index) {
          !asteroids[i].isDestroyed && (asteroids[i].opacity = colors[0]);
        } else !asteroids[i].isDestroyed && (asteroids[i].opacity = colors[1]);
      }
    }
  }

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
      mt="-8%"
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
        {/* <HStack justifyContent="space-between">
          <Text fontSize="xl" color="#39D7B9" p="20px">
            Name
          </Text>
          <Text fontSize="xl" color="#39D7B9" p="20px">
            Score
          </Text>
        </HStack> */}
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
