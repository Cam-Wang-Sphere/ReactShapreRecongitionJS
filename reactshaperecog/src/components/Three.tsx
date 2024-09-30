import * as THREE from "three";
import * as React from "react";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, GridItem } from "@chakra-ui/react";
import { useGLTF, OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense, useDeferredValue } from "react";
import tunnel from "tunnel-rat";

const status = tunnel();

function Model(props: JSX.IntrinsicElements["mesh"]) {
  // useDeferredValue allows us to defer updates, the component is market by React
  // so that it does *not* run into the fallback when something new loads
  const deferred = useDeferredValue(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-beech/model.gltf"
  );
  // We can find out the loading state by comparing the current value with the deferred value
  // const isLoading = url !== deferred
  const { scene } = useGLTF(deferred);
  // <primitive object={...} mounts an already existing object
  return <primitive object={scene} {...props} />;
}

function Box(props: JSX.IntrinsicElements["mesh"]) {
  // This reference will give us direct access to the THREE.Mesh object
  const meshRef = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (meshRef.current.rotation.x += 0.0));

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 1.2 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <dodecahedronGeometry args={[8.75]} />
      <meshStandardMaterial color={clicked ? "red" : "#886356"} />
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
            height: "100vw",
            width: "90vw",
          }}
          camera={{ position: [-10, 10, 40], fov: 50 }}
        >
          <hemisphereLight color="white" groundColor="blue" intensity={2.5} />
          <spotLight position={[2, 2, 1]} angle={0.4} penumbra={1} />
          <group position={[0, 0, 0]}>
            <Suspense fallback={<status.In>Loading ...</status.In>}>
              {/* <Model position={[0, 0.25, 0]} /> */}
              <Box position={[0, 0, 0]} />
            </Suspense>
            {/* <ContactShadows scale={20} blur={10} far={20} /> */}
          </group>
          <OrbitControls />
        </Canvas>
      </GridItem>
    </Grid>
  );
}
