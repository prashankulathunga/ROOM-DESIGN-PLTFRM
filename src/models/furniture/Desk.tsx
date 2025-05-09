import React from 'react';

interface DeskProps {
  color: string;
}

export const Desk: React.FC<DeskProps> = ({ color }) => {
  return (
    <group>
      {/* Table top */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.75]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.7, 0.2, 0.325]}>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.7, 0.2, 0.325]}>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.7, 0.2, -0.325]}>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.7, 0.2, -0.325]}>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Drawers */}
      <mesh position={[0.4, 0.25, 0]}>
        <boxGeometry args={[0.6, 0.3, 0.7]} />
        <meshStandardMaterial color={adjustColor(color, -10)} />
      </mesh>
      
      {/* Drawer handles */}
      <mesh position={[0.4, 0.3, 0.36]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[0.4, 0.2, 0.36]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
    </group>
  );
};

// Helper function to darken/lighten colors
function adjustColor(color: string, amount: number): string {
  return color; // In a real implementation, this would adjust the color
}