import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Flickering Diya Component
function Diya({ position, scale = 1, flameColor = '#FF9900' }: { position: [number, number, number]; scale?: number; flameColor?: string }) {
  const flameRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (flameRef.current) {
      flameRef.current.scale.y = scale * (1 + Math.sin(t * 12 + position[0]) * 0.15);
      flameRef.current.scale.x = scale * (1 + Math.cos(t * 10 + position[1]) * 0.1);
      flameRef.current.rotation.z = Math.sin(t * 8) * 0.08;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + Math.sin(t * 15 + position[0]) * 0.6;
    }
  });

  return (
    <group position={position}>
      {/* Terracotta/Brass Base Bowl */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7 * scale, 0.4 * scale, 0.35 * scale, 32]} />
        <meshStandardMaterial
          color="#92400E"
          roughness={0.3}
          metalness={0.7}
          emissive="#78350F"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Decorative Golden Rim */}
      <mesh position={[0, 0.18 * scale, 0]}>
        <torusGeometry args={[0.7 * scale, 0.06 * scale, 16, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.2}
          emissive="#D97706"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Oil surface */}
      <mesh position={[0, 0.12 * scale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.65 * scale, 32]} />
        <meshStandardMaterial color="#451A03" roughness={0.1} />
      </mesh>

      {/* Flame Cone */}
      <mesh ref={flameRef} position={[0, 0.42 * scale, 0]}>
        <coneGeometry args={[0.22 * scale, 0.65 * scale, 16]} />
        <meshBasicMaterial color={flameColor} />
      </mesh>

      {/* Inner White-Hot Flame Core */}
      <mesh position={[0, 0.35 * scale, 0]}>
        <coneGeometry args={[0.1 * scale, 0.35 * scale, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Point Light Casting Warm Flicker */}
      <pointLight
        ref={lightRef}
        position={[0, 0.5 * scale, 0]}
        color="#FFA500"
        distance={6 * scale}
        decay={2}
      />
    </group>
  );
}

// 3D Hanging Diwali Lantern (Akash Kandil)
function HangingLantern({ position, color, delay = 0 }: { position: [number, number, number]; color: string; delay?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 1.5) * 0.12;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Hanging Cord */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 2.4, 8]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      {/* Lantern Main Body (Octahedron / Star Lantern) */}
      <mesh position={[0, 0, 0]} castShadow>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Golden Accents / Trim */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.68, 0.04, 16, 24]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Hanging Frills / Tassels */}
      {[ -0.2, 0, 0.2 ].map((xOffset, idx) => (
        <mesh key={idx} position={[xOffset, -0.85, 0]}>
          <cylinderGeometry args={[0.02, 0.04, 0.6, 8]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
      ))}

      {/* Interior Lantern Glow Light */}
      <pointLight color={color} intensity={2.0} distance={4} />
    </group>
  );
}

// 3D Swirling Flower Petals
function FloatingPetals({ count = 90 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = Math.random() * 8;
      const z = (Math.random() - 0.5) * 12;
      const rotX = Math.random() * Math.PI;
      const rotY = Math.random() * Math.PI;
      const speed = 0.4 + Math.random() * 0.6;
      const isMarigold = Math.random() > 0.4;
      temp.push({ x, y, z, rotX, rotY, speed, isMarigold });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      p.y -= p.speed * 0.02;
      p.x += Math.sin(t + i) * 0.01;
      p.rotX += 0.02;
      p.rotY += 0.015;

      if (p.y < -0.5) {
        p.y = 8;
        p.x = (Math.random() - 0.5) * 16;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, 0);
      dummy.scale.set(0.18, 0.12, 0.06);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#FF9900"
        roughness={0.6}
        emissive="#FF4500"
        emissiveIntensity={0.3}
      />
    </instancedMesh>
  );
}

// 3D Rangoli Base Disc with Concentric Mandala Radiance
function RangoliFloor() {
  const rangoliRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (rangoliRef.current) {
      rangoliRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={rangoliRef} position={[0, -0.05, 0]}>
      {/* Outer Rangoli Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[2.5, 4.2, 48]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#7C3AED"
          emissiveIntensity={0.4}
          roughness={0.4}
        />
      </mesh>

      {/* Middle Petal Ring - Magenta / Pink */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.5, 2.5, 48]} />
        <meshStandardMaterial
          color="#EC4899"
          emissive="#DB2777"
          emissiveIntensity={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Inner Golden Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[1.5, 48]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#FFD700"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* 8 Ornamental Flower Dots around the perimeter */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const radius = 3.3;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, 0.03, Math.sin(angle) * radius]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.25, 16]} />
            <meshStandardMaterial
              color="#06B6D4"
              emissive="#22D3EE"
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// 3D Golden Indian Archway
function GoldenArch() {
  return (
    <group position={[0, 0, -3]}>
      {/* Left Pillar */}
      <mesh position={[-4.5, 2, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.35, 4.5, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.85} roughness={0.2} emissive="#B45309" emissiveIntensity={0.2} />
      </mesh>

      {/* Right Pillar */}
      <mesh position={[4.5, 2, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.35, 4.5, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.85} roughness={0.2} emissive="#B45309" emissiveIntensity={0.2} />
      </mesh>

      {/* Arch Curve (Torus Segment) */}
      <mesh position={[0, 3.8, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[4.5, 0.22, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.15} emissive="#D97706" emissiveIntensity={0.3} />
      </mesh>

      {/* Hanging Golden Bells from Arch */}
      {[-3, -1.5, 0, 1.5, 3].map((x, i) => (
        <group key={i} position={[x, 3.8 - Math.abs(x) * 0.18, 0]}>
          <mesh position={[0, -0.4, 0]}>
            <coneGeometry args={[0.15, 0.28, 16]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Fairy lights string hanging across the sky
function FairyLights() {
  const lightColors = ['#06B6D4', '#EC4899', '#10B981', '#F59E0B', '#A855F7', '#FFD700'];

  return (
    <group position={[0, 4.2, 0]}>
      {Array.from({ length: 18 }).map((_, i) => {
        const x = (i - 8.5) * 0.8;
        const sag = Math.sin((i / 17) * Math.PI) * -0.6;
        const color = lightColors[i % lightColors.length];
        return (
          <group key={i} position={[x, sag, 0]}>
            <mesh>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshBasicMaterial color={color} />
            </mesh>
            <pointLight color={color} intensity={0.8} distance={1.8} />
          </group>
        );
      })}
    </group>
  );
}

export const Diwali3DScene: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 2.6, 6.5], fov: 52 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Ambient & Cinematic Rim Lighting */}
        <ambientLight intensity={0.4} color="#3B0764" />
        <directionalLight
          position={[5, 8, 4]}
          intensity={1.2}
          color="#FEF08A"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-6, 4, -2]} intensity={1.5} color="#D946EF" distance={12} />
        <pointLight position={[6, 4, -2]} intensity={1.5} color="#06B6D4" distance={12} />

        {/* 3D Elements */}
        <GoldenArch />
        <FairyLights />
        <RangoliFloor />

        {/* Central Grand Diya */}
        <Diya position={[0, 0, 0]} scale={1.5} flameColor="#FFD700" />

        {/* Surrounding Ring of Diyas */}
        <Diya position={[-2.4, 0, -1]} scale={0.85} flameColor="#FF6B00" />
        <Diya position={[2.4, 0, -1]} scale={0.85} flameColor="#FF6B00" />
        <Diya position={[-1.8, 0, 1.6]} scale={0.9} flameColor="#EC4899" />
        <Diya position={[1.8, 0, 1.6]} scale={0.9} flameColor="#10B981" />

        {/* Hanging Akash Kandils (Diwali Lanterns) */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <HangingLantern position={[-3.8, 3.2, -1.2]} color="#D946EF" delay={0.2} />
          <HangingLantern position={[3.8, 3.2, -1.2]} color="#06B6D4" delay={0.8} />
          <HangingLantern position={[-2.2, 3.8, -2.5]} color="#F59E0B" delay={1.4} />
          <HangingLantern position={[2.2, 3.8, -2.5]} color="#10B981" delay={2.0} />
        </Float>

        {/* Swirling Flower Petals */}
        <FloatingPetals count={80} />

        {/* Interactive Orbit Controls with constrained angles */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 6}
          minAzimuthAngle={-Math.PI / 6}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};
