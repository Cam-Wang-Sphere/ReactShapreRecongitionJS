/* eslint-disable */
import * as THREE from "three";
import * as React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, GridItem } from "@chakra-ui/react";
import {
  RenderTexture,
  OrbitControls,
  PerspectiveCamera,
  Text,
  ContactShadows,
} from "@react-three/drei";
import { suspend } from "suspend-react";
import tunnel from "tunnel-rat";

const status = tunnel();

const MODELS = {
  Beech:
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-beech/model.gltf",
  Lime: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf",
  Spruce:
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf",
};

function Box(props: JSX.IntrinsicElements["mesh"]) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.3 : 1}
      onClick={(event) => click(!clicked)}
      // onPointerOver={(event) => hover(true)}
      // onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={clicked ? "green" : "orange"} />
    </mesh>
  );
}

export default function ThreeApp() {
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
      <GridItem area="TapRegion" rowStart={1} colStart={1}>
        <Canvas
          style={{
            position: "relative",
            // background: "pink",
            height: "70vh",
            width: "100vw",
          }}
        >
          <ambientLight intensity={0.9} />
          <spotLight position={[0, 1, 1]} angle={0.9} penumbra={10} />
          <pointLight position={[-0.5, 1, 1]} />
          <Box position={[-1.2, 2, 0]} />
        </Canvas>
      </GridItem>
    </Grid>
  );
}
