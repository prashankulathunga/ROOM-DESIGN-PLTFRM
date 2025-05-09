import React from 'react';

interface BookshelfProps {
  color: string;
}

export const Bookshelf: React.FC<BookshelfProps> = ({ color }) => {
  return (
    <group>
      {/* Back panel */}
      <mesh position={[0, 1, -0.15]}>
        <boxGeometry args={[1, 2, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Left side */}
      <mesh position={[-0.475, 1, 0]}>
        <boxGeometry args={[0.05, 2, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Right side */}
      <mesh position={[0.475, 1, 0]}>
        <boxGeometry args={[0.05, 2, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Bottom */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[1, 0.05, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Top */}
      <mesh position={[0, 1.975, 0]}>
        <boxGeometry args={[1, 0.05, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Shelves */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.95, 0.02, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[0.95, 0.02, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.95, 0.02, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};