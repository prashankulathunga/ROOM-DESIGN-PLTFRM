import React from 'react';

interface TableProps {
  color: string;
}

export const Table: React.FC<TableProps> = ({ color }) => {
  return (
    <group>
      {/* Table top */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh position={[0.5, 0.2, 0.3]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.5, 0.2, 0.3]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.5, 0.2, -0.3]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.5, 0.2, -0.3]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};