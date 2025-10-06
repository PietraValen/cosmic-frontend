"use client";

import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { AnomalyPoints } from "./AnomalyPoints";

export default function AnomalyMap() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#4FC3F7" />

      <Stars
        radius={300}
        depth={50}
        count={5000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />

      <AnomalyPoints />

      <OrbitControls
        enableZoom
        enablePan
        enableRotate
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
        minDistance={10}
        maxDistance={200}
      />
    </Suspense>
  );
}
