import React from 'react';

interface CoffeeTableProps {
  color: string;
}

export const CoffeeTable: React.FC<CoffeeTableProps> = ({ color }) => {
  return (
    <group>
      {/* Table top */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.0, 0.05, 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.4, 0.1, 0.25]}>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.4, 0.1, 0.25]}>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.4, 0.1, -0.25]}>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.4, 0.1, -0.25]}>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Optional lower shelf */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.9, 0.02, 0.5]} />
        <meshStandardMaterial color={adjustColor(color, -15)} />
      </mesh>
    </group>
  );
};

// Helper function to darken/lighten colors
function adjustColor(color: string, amount: number): string {
  return color; // In a real implementation, this would adjust the color
}