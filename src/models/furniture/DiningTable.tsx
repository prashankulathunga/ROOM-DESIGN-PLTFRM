import React from 'react';

interface DiningTableProps {
  color: string;
}

export const DiningTable: React.FC<DiningTableProps> = ({ color }) => {
  return (
    <group>
      {/* Table top */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.5, 0.1, 1.0]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Center stand */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 0.3, 16]} />
        <meshStandardMaterial color={adjustColor(color, -10)} />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 16]} />
        <meshStandardMaterial color={adjustColor(color, -15)} />
      </mesh>
    </group>
  );
};

// Helper function to darken/lighten colors
function adjustColor(color: string, amount: number): string {
  return color; // In a real implementation, this would adjust the color
}