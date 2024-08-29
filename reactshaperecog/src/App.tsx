// App.js
import { useEffect, useRef, useState } from "react";
import React from "react";
// import Menu from "./components/Menu";
// import { flatbuffers } from 'flatbuffers';
import "./App.css";
// import Gyroscope from "./components/Gyroscope";
import InputSelect from "./components/InputSelect";
import TilesInput from "./components/TilesInput";
import ConnectionScreen from "./components/ConnectionScreen";
import TapnSlashInput from "./components/TapnSlashInput";
import SuccessOverlay from "./components/SuccessOverlay";
import ScoreWidget from "./components/ScoreWidget";
import { NetworkingManager } from "./networking/NetworkingManager";
import { Message } from "./schema/wsschema/message";
import { TemplateManager } from "./Template/TemplateManager";
import { Result, Point, DollarRecognizer } from "./Template/Recognizer";
import {
  HStack,
  VStack,
  Grid,
  GridItem,
  ButtonGroup,
  Button,
  Box,
  Heading,
  Center,
  Spacer,
  Container,
} from "@chakra-ui/react";
import AddTemplateWidget from "./components/AddTemplate";
import DrawingWidget from "./components/DrawingWidget";
import RandomPlayerDataWidget from "./components/RandomPlayerDataWidget";
import NavMenu from "./components/NavMenu";
import { WSPlayerData } from "./player/WSPlayerData";
import GameState from "./components/GameState";

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

const App = () => {
  const [drawResult, setDrawResult] = useState("No Match.");
  const [score, setScore] = useState(0);
  const [scoreText, setScoreText] = useState("Score: ");
  const [textColor, setTextColor] = useState("red.500");
  const [Recognizer] = useState<DollarRecognizer>(new DollarRecognizer());
  const templateManager = new TemplateManager();

  // networking stuff
  const [networkingManager, setNetworkingManager] =
    useState<NetworkingManager | null>(null);

  // player data
  const [playerData, setPlayerData] = useState<WSPlayerData | null>(null);

  // function to set the player data
  const initPlayerData = () =>
  {
    const newPlayerData = new WSPlayerData();
    setPlayerData(newPlayerData);
    console.log('player data initialized');
  }

  // networking function
  // to be passed in as a prop to a component
  const connectToServer = (address: string) => {
    const newNetworkingManager = new NetworkingManager(address);
    newNetworkingManager
      .connect()
      .then(() => {
        setNetworkingManager(newNetworkingManager);
        console.log('set networking manager');
      })
      .catch(() => {
        console.log("failed to connect");
      });
  };

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    initPlayerData();
    templateManager.LoadTemplates().then((result) => {
      for (let i = 0; i < result.length; i++) {
        Recognizer.AddGesture(result[i]);
      }
    });
  }, []);

  // TODO maybe look into a more robust way to handle this...
  enum ShapeToEnum {
    Arrow = 0,
    Parenthesis = 1,
    Check = 2,
    Triangle = 3,
    Pigtail = 4,
    Circle = 5,
  }

  // Function for ending the drawing
  const endDrawing = () => {
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

    let DrawResult = Recognizer.Recognize(pointArray, false);

    if (DrawResult.Score >= 0.5) {
      let enumResult = ShapeToEnum[DrawResult.Name as keyof typeof ShapeToEnum];
      // sendShapeRequest(enumResult);
      console.log('ended shape request');
      if (networkingManager)
      {
        console.log('inNetworkingManager is valid');
      }
      networkingManager?.sendShapeRequest(enumResult);
      setDrawResult(DrawResult.Name);
    } else {
      setDrawResult("No Match.");
    }
  };

  const AddTemplate = (TemplateName: string) => {
    templateManager.SaveTemplate(TemplateName);
  };

  const AddScore = (x: number) => {
    setScore(score + x);
    setScoreText("Score: " + score);
  };

  const AddSetScore = () => {};

  const selectHandle = (index: number) => {
    setIndex(index);
  };
  const [_index, setIndex] = useState(0);
  const inputTypes = [
    <ConnectionScreen connectFunction={connectToServer} inConnectNetworkingManager={networkingManager}/>,
    <DrawingWidget
      drawEndFunction={endDrawing}
      inNetworkingManager={networkingManager}
    />,
    <TilesInput inNetworkingManager={networkingManager} />,
    <TapnSlashInput inNetworkingManager={networkingManager} />,
  ];

  const [isLandscape, setIsLandscape] = useState(false);

  const resizeEvent = window.addEventListener("resize", () => {
    const orientationType = window.screen.orientation.type;
    // console.log(orientationType);
    orientationType === "landscape-primary"
      ? setIsLandscape(true)
      : setIsLandscape(false);
  });

  return (
    <Container
      className="App"
      // maxW={"sm"}
      // h="100vh"
      maxW={isLandscape ? "150vw" : "sm"}
      h="100vh"
      style={{
        position: "relative",
      }}
    >
      <Grid
        // className="landscape"
        templateRows="repeat(10, 1fr)"
        templateColumns="repeat(5, 1fr)"
        templateAreas={`"Heading" "Score" "Main"`}
        gap={4}
        pt={"10px"}
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Heading------------------------------ */}
        {!isLandscape && (
          <GridItem rowSpan={1} colSpan={1} area="Heading">
            <NavMenu
              Names={["Connection/Name", "Draw", "Tiles", "Tap n Slash"]}
              onSelect={selectHandle}
            />
            <GameState inNetworkingManager={networkingManager} inPlayerData={playerData} />
          </GridItem>
        )}
        {!isLandscape && (
          <GridItem rowSpan={1} colStart={2} colEnd={5} area="Heading" mt="1%">
            <Center>
              <Heading color={textColor}>PreFE</Heading>
            </Center>
          </GridItem>
        )}

        {/* Score+ Feedback------------------------------ */}
        {_index === 1 && (
          <GridItem rowStart={2} rowEnd={3} colSpan={5} alignItems={"center"}>
            <VStack>
              <span color={textColor} className="resultText">
                {drawResult}
              </span>
              <HStack justifyContent="space-evenly">
                <SuccessOverlay inNetworkingManager={networkingManager} />

                <ScoreWidget inNetworkingManager={networkingManager} />
                <RandomPlayerDataWidget
                  inNetworkingManager={networkingManager}
                />
              </HStack>
            </VStack>
          </GridItem>
        )}

        {/* Main content------------------------------ */}
        <GridItem
          area="Main"
          rowStart={_index === 3 ? 2 : 3}
          // rowEnd={14}
          colSpan={5}
          alignItems={"center"}
          // h="75vh"
          h={isLandscape ? "80vh" : "75vh"}
          w={isLandscape ? "95vw" : "100%"}
          mt={isLandscape ? "-2%" : "0"}
        >
          {inputTypes[_index]}
        </GridItem>
      </Grid>
    </Container>
  );

  // <button type="button" onClick={AddSetScore}>Add Template</button>
};

export default App;
