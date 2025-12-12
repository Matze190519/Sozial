import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function CoreMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // React to mouse
      const mouseX = state.mouse.x * 0.5;
      const mouseY = state.mouse.y * 0.5;
      
      meshRef.current.rotation.x += mouseY;
      meshRef.current.rotation.y += mouseX;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} ref={meshRef} scale={2.2}>
        <MeshDistortMaterial
          color="#C49BFF" // Electric Purple
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#6D28D9" // Deep Purple Glow
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

function ParticleRing() {
    const ref = useRef<THREE.Points>(null);
    
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z = state.clock.getElapsedTime() * 0.05;
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={ref}>
            <sphereGeometry args={[3.5, 64, 64]} />
            <pointsMaterial
                size={0.02}
                color="#00FFFF" // Neon Cyan
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

export default function AICore() {
  return (
    <div className="w-full h-full min-h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00FFFF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C49BFF" />
        
        <CoreMesh />
        <ParticleRing />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
