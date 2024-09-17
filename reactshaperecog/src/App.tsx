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
import NavMenu from "./components/NavMenu";
import { WSPlayerData } from "./player/WSPlayerData";
import GameState from "./components/GameState";
import ScreenSwitcher from "./components/ScreenSwitcher";

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
  const [score, setScore] = useState(0);
  const [scoreText, setScoreText] = useState("Score: ");
  const [Recognizer] = useState<DollarRecognizer>(new DollarRecognizer());
  const templateManager = new TemplateManager();

  // networking stuff
  const [networkingManager, setNetworkingManager] =
    useState<NetworkingManager | null>(null);

  // player data
  const [playerData, setPlayerData] = useState<WSPlayerData | null>(null);

  // function to set the player data
  const initPlayerData = () => {
    const newPlayerData = new WSPlayerData();
    setPlayerData(newPlayerData);
    console.log("player data initialized");
  };

  // networking function
  // to be passed in as a prop to a component
  const connectToServer = (address: string) => 
  {
    if (!networkingManager)
    {
      const newNetworkingManager = new NetworkingManager(address);
      newNetworkingManager
      .connect()
      .then(() => {
        setNetworkingManager(newNetworkingManager);
        console.log("set networking manager");
      })
      .catch(() => {
        console.log("failed to connect");
      });
    }
    else
    {
      networkingManager.connect()
      .then(() => {
        console.log("reconnected");
      })
      .catch(() => {
        console.log("failed to connect since already connected");
      });
    }
  };

  // @TODO NATHAN: componentmentalize
  const namesArray = [
    "Testing",
    "Connection/Name",
    "Tap n Slash",
    "Draw",
    "Tiles",
    "Radar View",
    "Point Tap",
    "Slash"
  ];

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
  const [_index, setIndex] = useState(1);

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
              Names={namesArray}
              onSelect={selectHandle}
              inSelectedIndex={_index}
            />
            <GameState
              inNetworkingManager={networkingManager}
              inPlayerData={playerData}
            />
          </GridItem>
        )}
        {!isLandscape && (
          <GridItem rowSpan={1} colStart={2} colEnd={5} area="Heading" mt="1%">
            <Center>
              <Heading color={"red.500"}>PreFE</Heading>
            </Center>
          </GridItem>
        )}

        {/* Main content------------------------------ */}
        <GridItem
          area="Main"
          rowStart={_index === 2 ? 2 : 3}
          // rowEnd={14}
          colSpan={5}
          alignItems={"center"}
          // h="75vh"
          h={isLandscape ? "80vh" : "75vh"}
          w={isLandscape ? "95vw" : "100%"}
          mt={isLandscape ? "-2%" : "0"}
        >
          <ScreenSwitcher
            inPlayerData={playerData}
            inConnectFunction={connectToServer}
            inNetworkingManager={networkingManager}
            inSSDollarRecognizer={Recognizer}
            inSelectHandle={selectHandle}
            inSelectedIndex={_index}
          />
        </GridItem>
      </Grid>
    </Container>
  );

  // <button type="button" onClick={AddSetScore}>Add Template</button>
};

export default App;
