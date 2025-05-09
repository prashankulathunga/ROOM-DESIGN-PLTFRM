import React from 'react';

interface ChairProps {
  color: string;
}

export const Chair: React.FC<ChairProps> = ({ color }) => {
  return (
    <group>
      {/* Seat */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back */}
      <mesh position={[0, 0.75, -0.2]}>
        <boxGeometry args={[0.5, 0.9, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.2, 0.125, 0.2]}>
        <boxGeometry args={[0.05, 0.25, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.2, 0.125, 0.2]}>
        <boxGeometry args={[0.05, 0.25, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.2, 0.125, -0.2]}>
        <boxGeometry args={[0.05, 0.25, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.2, 0.125, -0.2]}>
        <boxGeometry args={[0.05, 0.25, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};