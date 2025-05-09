import { useRef, useEffect } from 'react';
import { FurnitureItem } from '../../types';

interface Room2DViewProps {
  width: number;
  length: number;
  wallColor: string;
  floorColor: string;
  furniture: FurnitureItem[];
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
  onFurnitureMove: (id: string, position: { x: number; y: number; z: number }) => void;
}

const Room2DView: React.FC<Room2DViewProps> = ({
  width,
  length,
  wallColor,
  floorColor,
  furniture,
  selectedItemId,
  setSelectedItemId,
  onFurnitureMove
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const dragItemIdRef = useRef<string | null>(null);
  
  // Scale factor to convert from feet/meters to pixels
  const scaleFactor = 20; // 20 pixels per foot/meter
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = length * scaleFactor;
    canvas.height = width * scaleFactor;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw floor
    ctx.fillStyle = floorColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw walls (just a border in 2D)
    ctx.strokeStyle = wallColor;
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = scaleFactor; x < canvas.width; x += scaleFactor) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = scaleFactor; y < canvas.height; y += scaleFactor) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw furniture
    furniture.forEach((item) => {
      const { position, scale, color, type } = item;
      const x = position.x * scaleFactor;
      const y = position.z * scaleFactor; // Use Z for 2D top-down view
      const itemWidth = scale.x * scaleFactor;
      const itemLength = scale.z * scaleFactor;
      
      ctx.fillStyle = color;
      
      // Draw highlighted outline for selected item
      if (item.id === selectedItemId) {
        ctx.strokeStyle = '#3B82F6'; // Primary blue
        ctx.lineWidth = 2;
        ctx.strokeRect(x - itemWidth / 2, y - itemLength / 2, itemWidth, itemLength);
      }
      
      // Draw furniture based on type
      ctx.fillRect(x - itemWidth / 2, y - itemLength / 2, itemWidth, itemLength);
      
      // Add furniture type label for clarity
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      let displayName = type;
      if (displayName.length > 8) {
        displayName = displayName.substring(0, 8) + '..';
      }
      
      ctx.fillText(displayName, x, y);
    });
    
  }, [width, length, wallColor, floorColor, furniture, selectedItemId, scaleFactor]);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Check if the user clicked on a furniture item
    for (let i = furniture.length - 1; i >= 0; i--) {
      const item = furniture[i];
      const itemX = item.position.x * scaleFactor;
      const itemY = item.position.z * scaleFactor; // Using Z for 2D top-down view
      const itemWidth = item.scale.x * scaleFactor;
      const itemHeight = item.scale.z * scaleFactor;
      
      const halfWidth = itemWidth / 2;
      const halfHeight = itemHeight / 2;
      
      if (
        mouseX >= itemX - halfWidth && 
        mouseX <= itemX + halfWidth && 
        mouseY >= itemY - halfHeight && 
        mouseY <= itemY + halfHeight
      ) {
        setSelectedItemId(item.id);
        isDraggingRef.current = true;
        dragStartPosRef.current = { x: mouseX, y: mouseY };
        dragItemIdRef.current = item.id;
        break;
      }
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || !dragItemIdRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const deltaX = mouseX - dragStartPosRef.current.x;
    const deltaY = mouseY - dragStartPosRef.current.y;
    
    dragStartPosRef.current = { x: mouseX, y: mouseY };
    
    const item = furniture.find(item => item.id === dragItemIdRef.current);
    if (!item) return;
    
    // Update item position (convert from pixels back to units)
    const newX = item.position.x + deltaX / scaleFactor;
    const newZ = item.position.z + deltaY / scaleFactor;
    
    // Ensure the item stays within room boundaries
    const boundedX = Math.max(item.scale.x / 2, Math.min(length - item.scale.x / 2, newX));
    const boundedZ = Math.max(item.scale.z / 2, Math.min(width - item.scale.z / 2, newZ));
    
    onFurnitureMove(dragItemIdRef.current, { 
      x: boundedX, 
      y: item.position.y, // Keep Y position the same (height)
      z: boundedZ 
    });
  };
  
  const handleMouseUp = () => {
    isDraggingRef.current = false;
    dragItemIdRef.current = null;
  };
  
  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    dragItemIdRef.current = null;
  };
  
  return (
    <div className="relative w-full overflow-auto border border-gray-200 bg-white rounded-lg">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="mx-auto cursor-move"
      />
    </div>
  );
};

export default Room2DView;