import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls, Stage } from '@react-three/drei';
import { FurnitureItem, RoomSettings } from '../../types';
import { Chair } from '../../models/furniture/Chair';
import { Table } from '../../models/furniture/Table';
import { Sofa } from '../../models/furniture/Sofa';
import { Bookshelf } from '../../models/furniture/Bookshelf';
import { Desk } from '../../models/furniture/Desk';
import { CoffeeTable } from '../../models/furniture/CoffeeTable';
import { DiningTable } from '../../models/furniture/DiningTable';
import { Cabinet } from '../../models/furniture/Cabinet';

interface Room3DViewProps {
  roomSettings: RoomSettings;
  furniture: FurnitureItem[];
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
  onFurnitureMove: (id: string, position: { x: number; y: number; z: number }) => void;
  onFurnitureRotate: (id: string, rotation: { x: number; y: number; z: number }) => void;
}

const Room = ({ width, length, height, wallColor, floorColor }: RoomSettings) => {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[length / 2, 0, width / 2]}>
        <planeGeometry args={[length, width]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      
      {/* Walls */}
      {/* Back wall */}
      <mesh position={[length / 2, height / 2, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      
      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0, height / 2, width / 2]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      
      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[length, height / 2, width / 2]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      
      {/* Far wall */}
      <mesh rotation={[0, Math.PI, 0]} position={[length / 2, height / 2, width]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
    </group>
  );
};

const FurnitureModel: React.FC<{
  item: FurnitureItem;
  isSelected: boolean;
  onClick: () => void;
  onPositionChange: (position: { x: number; y: number; z: number }) => void;
  onRotationChange: (rotation: { x: number; y: number; z: number }) => void;
}> = ({ item, isSelected, onClick, onPositionChange, onRotationChange }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const handlePositionChange = () => {
    if (meshRef.current) {
      const position = meshRef.current.position;
      onPositionChange({ x: position.x, y: position.y, z: position.z });
    }
  };
  
  const handleRotationChange = () => {
    if (meshRef.current) {
      const rotation = meshRef.current.rotation;
      onRotationChange({ x: rotation.x, y: rotation.y, z: rotation.z });
    }
  };
  
  const renderModel = () => {
    switch (item.type) {
      case 'chair':
        return <Chair color={item.color} />;
      case 'table':
        return <Table color={item.color} />;
      case 'sofa':
        return <Sofa color={item.color} />;
      case 'bookshelf':
        return <Bookshelf color={item.color} />;
      case 'desk':
        return <Desk color={item.color} />;
      case 'coffeeTable':
        return <CoffeeTable color={item.color} />;
      case 'diningTable':
        return <DiningTable color={item.color} />;
      case 'cabinet':
        return <Cabinet color={item.color} />;
      default:
        // Fallback for any unrecognized furniture type
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={item.color} />
          </mesh>
        );
    }
  };
  
  return (
    <>
      <group
        position={[item.position.x, item.position.y, item.position.z]}
        rotation={[item.rotation.x, item.rotation.y, item.rotation.z]}
        scale={[item.scale.x, item.scale.y, item.scale.z]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <mesh ref={meshRef}>
          {renderModel()}
        </mesh>
      </group>
      
      {isSelected && (
        <TransformControls
          object={meshRef}
          mode="translate"
          onObjectChange={handlePositionChange}
          onMouseUp={handlePositionChange}
        />
      )}
    </>
  );
};

const Room3DView: React.FC<Room3DViewProps> = ({
  roomSettings,
  furniture,
  selectedItemId,
  setSelectedItemId,
  onFurnitureMove,
  onFurnitureRotate
}) => {
  const [transformMode, setTransformMode] = useState<'translate' | 'rotate'>('translate');
  
  const handleBackgroundClick = () => {
    setSelectedItemId(null);
  };
  
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      {selectedItemId && (
        <div className="absolute top-2 left-2 z-10 bg-white rounded-md shadow-md p-2 flex space-x-2">
          <button
            className={`btn ${transformMode === 'translate' ? 'btn-primary' : 'btn-outline'} px-2 py-1 text-xs`}
            onClick={() => setTransformMode('translate')}
          >
            Move
          </button>
          <button
            className={`btn ${transformMode === 'rotate' ? 'btn-primary' : 'btn-outline'} px-2 py-1 text-xs`}
            onClick={() => setTransformMode('rotate')}
          >
            Rotate
          </button>
        </div>
      )}
      
      <Canvas
        shadows
        camera={{ position: [roomSettings.length, roomSettings.height, roomSettings.width], fov: 50 }}
        onClick={handleBackgroundClick}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[roomSettings.length / 2, roomSettings.height, roomSettings.width / 2]} intensity={1} castShadow />
        
        <Room {...roomSettings} />
        
        {furniture.map((item) => (
          <FurnitureModel
            key={item.id}
            item={item}
            isSelected={item.id === selectedItemId}
            onClick={() => setSelectedItemId(item.id)}
            onPositionChange={(position) => onFurnitureMove(item.id, position)}
            onRotationChange={(rotation) => onFurnitureRotate(item.id, rotation)}
          />
        ))}
        
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          target={[roomSettings.length / 2, roomSettings.height / 2, roomSettings.width / 2]}
        />
      </Canvas>
    </div>
  );
};

export default Room3DView;