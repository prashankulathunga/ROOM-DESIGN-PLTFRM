import React from 'react';

interface SofaProps {
  color: string;
}

export const Sofa: React.FC<SofaProps> = ({ color }) => {
  return (
    <group>
      {/* Base */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2, 0.4, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back */}
      <mesh position={[0, 0.7, -0.3]}>
        <boxGeometry args={[2, 1, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.95, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.95, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.6, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Cushions */}
      <mesh position={[-0.5, 0.45, 0.1]}>
        <boxGeometry args={[0.9, 0.1, 0.6]} />
        <meshStandardMaterial color={adjustColor(color, -20)} />
      </mesh>
      <mesh position={[0.5, 0.45, 0.1]}>
        <boxGeometry args={[0.9, 0.1, 0.6]} />
        <meshStandardMaterial color={adjustColor(color, -20)} />
      </mesh>
    </group>
  );
};

// Helper function to darken/lighten colors
function adjustColor(color: string, amount: number): string {
  return color; // In a real implementation, this would adjust the color
}