import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function FloatingObjects({ isDark = true }: { isDark?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  // ランダムな位置と色を生成
  const objects = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const baseHue = (i * 137.5) % 360 / 360
      const saturation = isDark ? 0.5 + Math.random() * 0.3 : 0.4 + Math.random() * 0.2
      const lightness = isDark ? 0.4 + Math.random() * 0.4 : 0.6 + Math.random() * 0.3
      
      return {
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        ] as [number, number, number],
        color: new THREE.Color().setHSL(baseHue, saturation, lightness),
        scale: 0.3 + Math.random() * 0.7,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      }
    })
  }, [isDark])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
      groupRef.current.children.forEach((child, i) => {
        const obj = objects[i]
        child.rotation.x += obj.rotationSpeed
        child.rotation.z += obj.rotationSpeed * 0.5
        child.position.y += Math.sin(clock.getElapsedTime() + i) * 0.01
      })
    }
  })

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <Sphere key={i} args={[obj.scale, 16, 16]} position={obj.position}>
          <meshStandardMaterial 
            color={obj.color} 
            emissive={obj.color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  )
}

function ParticleField({ isDark = true }: { isDark?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null)
  
  const particlesCount = 200
  const particles = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        color={isDark ? "#667eea" : "#4f46e5"} 
        transparent 
        opacity={isDark ? 0.6 : 0.4} 
      />
    </points>
  )
}

interface AnimatedBackgroundProps {
  isDark?: boolean
}

export default function AnimatedBackground({ isDark = true }: AnimatedBackgroundProps) {
  const darkGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  const lightGradient = 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      background: isDark ? darkGradient : lightGradient,
      transition: 'background 0.3s ease'
    }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <ambientLight intensity={isDark ? 0.5 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 0.6} />
        <pointLight 
          position={[-10, -10, -10]} 
          intensity={isDark ? 0.5 : 0.3} 
          color={isDark ? "#764ba2" : "#6366f1"} 
        />
        
        <FloatingObjects isDark={isDark} />
        <ParticleField isDark={isDark} />
        
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
} 