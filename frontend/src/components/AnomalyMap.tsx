"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import  {AnomalyPoints}  from "./AnomalyPoints";

export default function AnomalyMap() {
  return (
    <div className="w-full h-[600px] bg-slate-950 rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
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
      </Canvas>
    </div>
  );
}
