"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

const detectors = [
  {
    name: "LIGO Hanford",
    lat: 46.455,
    lon: -119.408,
    location: "Washington, USA",
  },
  {
    name: "LIGO Livingston",
    lat: 30.563,
    lon: -90.774,
    location: "Louisiana, USA",
  },
  { name: "Virgo", lat: 43.6314, lon: 10.5045, location: "Pisa, Italy" },
  { name: "KAGRA", lat: 36.4125, lon: 137.3059, location: "Kamioka, Japan" },
  { name: "GEO600", lat: 52.2467, lon: 9.8083, location: "Hannover, Germany" },
];

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function DetectorMarker({ detector }: { detector: (typeof detectors)[0] }) {
  const position = latLonToVector3(detector.lat, detector.lon, 2.05);

  return (
    <group position={position}>
      <Sphere args={[0.05, 16, 16]}>
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Html distanceFactor={10}>
        <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/30 text-xs whitespace-nowrap pointer-events-none">
          <div className="font-semibold text-cyan-400">{detector.name}</div>
          <div className="text-slate-300">{detector.location}</div>
        </div>
      </Html>
    </group>
  );
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.0012;
    }
  });

  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#0f172a");
    gradient.addColorStop(0.3, "#1e293b");
    gradient.addColorStop(0.5, "#0ea5e9");
    gradient.addColorStop(0.7, "#22c55e");
    gradient.addColorStop(1, "#0f172a");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 20 + 5;

      ctx.fillStyle = Math.random() > 0.5 ? "#22c55e" : "#0ea5e9";
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <>
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>

      <Sphere ref={cloudRef} args={[2.02, 64, 64]}>
        <meshStandardMaterial
          transparent
          opacity={0.1}
          color="#ffffff"
          roughness={1}
        />
      </Sphere>

      {detectors.map((detector, index) => (
        <DetectorMarker key={index} detector={detector} />
      ))}
    </>
  );
}

export default function GlobeVisualization() {
  return (
    <div className="w-full h-[600px] bg-slate-950 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#22d3ee"
        />

        <Earth />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <Stars />
      </Canvas>
    </div>
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);

  const starPositions = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.6} />
    </points>
  );
}
