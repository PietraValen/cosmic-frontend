"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface AnomalyData {
  position: [number, number, number];
  isAnomaly: boolean;
  intensity: number;
  id: string;
  name?: string;
}

export const AnomalyPoints = () => {
  // Dados inventados
  const anomalies = generateMockData();

  return (
    <group>
      {/* Centro da galáxia */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Pontos renderizados */}
      {anomalies.map((point) => (
        <AnomalyPoint
          key={point.id}
          data={point}
        />
      ))}
    </group>
  );
};

interface AnomalyPointProps {
  data: AnomalyData;
}

const AnomalyPoint = ({ data }: AnomalyPointProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const textGroupRef = useRef<THREE.Group>(null);

  // Estado local para controlar hover deste ponto
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      if (data.isAnomaly) {
        const scale =
          1 + Math.sin(state.clock.elapsedTime * 2) * 0.2 * data.intensity;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(isHovered ? 3 : 2);
    }
    if (textGroupRef.current && isHovered) {
      textGroupRef.current.lookAt(state.camera.position);
    }
  });

  const color = data.isAnomaly ? "#FF4444" : "#00D9FF";
  const emissiveIntensity = data.isAnomaly ? data.intensity * 2 : 1;
  // const size = data.isAnomaly ? 0.3 + data.intensity * 0.3 : 0.2;
  const size =  0.2;

  return (
    <group position={data.position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>

      <mesh
        ref={meshRef}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Texto só aparece quando hover */}
      {isHovered && (
        <group ref={textGroupRef} position={[0, size + 1, 0]}>
          <Text
            fontSize={0.4}
            color="white"
            anchorX="right"
            anchorY="middle"
            outlineWidth={0.2}
            outlineColor="black"
            // pointerEvents="none" // evita o texto bloquear o mouse
          >
            {data.name || `Point ${data.id}`}
            {"\n"}
            {data.isAnomaly
              ? `Anomaly - Intensity: ${data.intensity.toFixed(2)}`
              : "Normal Region"}
            {"\n"}
            {`X: ${data.position[0].toFixed(2)}`}
            {"\n"}
            {`Y: ${data.position[1].toFixed(2)}`}
            {"\n"}
            {`Z: ${data.position[2].toFixed(2)}`}
          </Text>
        </group>
      )}
    </group>
  );
};

function generateMockData(): AnomalyData[] {
  const points: AnomalyData[] = [];

  for (let i = 0; i < 60; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 20 + Math.random() * 40;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    const isAnomaly = Math.random() > 0.7;

    points.push({
      id: `point-${i}`,
      position: [x, y, z],
      isAnomaly,
      intensity: isAnomaly ? 0.5 + Math.random() * 0.5 : 0,
      name: isAnomaly ? `Anomaly-${i}` : `Sector-${i}`,
    });
  }

  return points;
}
