import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the sphere
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Pulse effect based on time (simulating voice activity)
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} ref={meshRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
        <MeshDistortMaterial
          color={hovered ? "#00FFFF" : "#C49BFF"} // Secondary (Cyan) on hover, Primary (Purple) default
          attach="material"
          distort={0.6} // Strength of distortion
          speed={2} // Speed of distortion
          roughness={0.2}
          metalness={0.8}
          emissive={hovered ? "#00FFFF" : "#C49BFF"}
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#C49BFF" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#00FFFF" />
      
      <AnimatedSphere />
      
      <Sparkles count={100} scale={6} size={2} speed={0.4} opacity={0.5} color="#C49BFF" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

export default function VoiceOrb({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
