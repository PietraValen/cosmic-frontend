"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function WaveRings() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, index) => {
        // use a deterministic animation based on time from performance.now()
        const t = performance.now() / 1000;
        const scale = 1 + ((t * 0.5 + index * 0.3) % 3);
        ring.scale.set(scale, scale, 1);

        const opacity = 1 - ((t * 0.5 + index * 0.3) % 3) / 3;
        (ring as THREE.Mesh).material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0.5 + index * 0.1, 0.8, 0.5),
          transparent: true,
          opacity: opacity * 0.6,
          side: THREE.DoubleSide,
        });
      });
    }
  });

  return (
    <group ref={ringsRef}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1, 64]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function SpaceTimeGrid() {
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (gridRef.current) {
      const geometry = gridRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const distance = Math.sqrt(x * x + y * y);
        positions[i + 2] = Math.sin(distance * 0.5 - time * 2) * 0.3;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <meshStandardMaterial
        color="#1e293b"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function BlackHolePair() {
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const radius = 2;
    const speed = 0.5;

    if (group1Ref.current) {
      group1Ref.current.position.x = Math.cos(time * speed) * radius;
      group1Ref.current.position.z = Math.sin(time * speed) * radius;
    }

    if (group2Ref.current) {
      group2Ref.current.position.x = Math.cos(time * speed + Math.PI) * radius;
      group2Ref.current.position.z = Math.sin(time * speed + Math.PI) * radius;
    }
  });

  return (
    <>
      <group ref={group1Ref}>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#4f46e5"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshBasicMaterial color="#4f46e5" transparent opacity={0.3} />
        </mesh>
      </group>

      <group ref={group2Ref}>
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#7c3aed"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} />
        </mesh>
      </group>
    </>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    const colors = new Float32Array(1000 * 3);

    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color().setHSL(
        0.5 + Math.random() * 0.2,
        0.8,
        0.6
      );
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} />
    </points>
  );
}

export default function GravitationalWavesPropagation() {
  return (
    <div className="w-full h-[600px] bg-slate-950 rounded-2xl overflow-hidden">
      <Canvas camera={{ position: [0, 3, 8], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#22d3ee" />

        <WaveRings />
        <SpaceTimeGrid />
        <BlackHolePair />
        <ParticleField />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={3}
          maxDistance={20}
        />
      </Canvas>

    <div className="absolute bottom-20 bg-slate-900/80 backdrop-blur-sm px-4 py-3 rounded-tr-lg border border-cyan-500/30 shadow-lg z-1 ">
      <p className="text-sm text-cyan-400 font-semibold mb-1">
        Fusão de Buracos Negros
      </p>
      <p className="text-xs text-slate-300 leading-relaxed max-w-[250px]">
        Ondas gravitacionais distorcem o tecido do espaço-tempo,
        espalhando-se em anéis luminosos através do cosmos.
      </p>
    </div>

    </div>
  );
}
