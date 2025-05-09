import React from 'react';

interface CabinetProps {
  color: string;
}

export const Cabinet: React.FC<CabinetProps> = ({ color }) => {
  return (
    <group>
      {/* Main cabinet body */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.2, 1.2, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Cabinet doors */}
      <mesh position={[-0.3, 0.6, 0.26]}>
        <boxGeometry args={[0.55, 1.1, 0.05]} />
        <meshStandardMaterial color={adjustColor(color, 10)} />
      </mesh>
      <mesh position={[0.3, 0.6, 0.26]}>
        <boxGeometry args={[0.55, 1.1, 0.05]} />
        <meshStandardMaterial color={adjustColor(color, 10)} />
      </mesh>
      
      {/* Door handles */}
      <mesh position={[-0.05, 0.6, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[0.05, 0.6, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} rotation={[Math.PI/2, 0, 0]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      
      {/* Cabinet feet */}
      <mesh position={[0.5, 0.05, 0.2]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color={adjustColor(color, -20)} />
      </mesh>
      <mesh position={[-0.5, 0.05, 0.2]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color={adjustColor(color, -20)} />
      </mesh>
      <mesh position={[0.5, 0.05, -0.2]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color={adjustColor(color, -20)} />
      </mesh>
      <mesh position={[-0.5, 0.05, -0.2]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color={adjustColor(color, -20)} />
      </mesh>
    </group>
  );
};

// Helper function to darken/lighten colors
function adjustColor(color: string, amount: number): string {
  return color; // In a real implementation, this would adjust the color
}