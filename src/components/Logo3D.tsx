import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Center, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.3
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.1
    }
  })

  return (
    <Center>
      <Text
        ref={textRef}
        fontSize={1.5}
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        anchorX="center"
        anchorY="middle"
      >
        Mekann
        <meshBasicMaterial color="#ffffff" />
      </Text>
    </Center>
  )
}

interface Logo3DProps {
  width?: string
  height?: string
}

export default function Logo3D({ width = "300px", height = "150px" }: Logo3DProps) {
  return (
    <div style={{ width, height }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <AnimatedText />
        
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  )
} 