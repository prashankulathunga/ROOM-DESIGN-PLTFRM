import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { RotateCw, Minus, Plus, Trash2 } from 'lucide-react';
import { FurnitureItem } from '../../types';

interface FurnitureControlsProps {
  selectedItem: FurnitureItem | null;
  onUpdateItem: (updates: Partial<FurnitureItem>) => void;
  onRemoveItem: () => void;
}

const FurnitureControls: React.FC<FurnitureControlsProps> = ({
  selectedItem,
  onUpdateItem,
  onRemoveItem
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  if (!selectedItem) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-500 text-center">Select a furniture item to edit</p>
      </div>
    );
  }

  const handleColorChange = (color: string) => {
    onUpdateItem({ color });
  };

  const handleScaleChange = (axis: 'x' | 'y' | 'z', increment: number) => {
    const currentScale = selectedItem.scale[axis];
    const newScale = Math.max(0.1, currentScale + increment);
    
    onUpdateItem({
      scale: {
        ...selectedItem.scale,
        [axis]: parseFloat(newScale.toFixed(1))
      }
    });
  };

  const handleRotate = (angle: number) => {
    const currentRotation = selectedItem.rotation.y;
    const newRotation = currentRotation + angle;
    
    onUpdateItem({
      rotation: {
        ...selectedItem.rotation,
        y: newRotation
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          {selectedItem.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Type: {selectedItem.type}
        </p>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <div
            className="h-10 w-full rounded-md border border-gray-300 cursor-pointer flex items-center px-2"
            onClick={() => setShowColorPicker(!showColorPicker)}
            style={{ backgroundColor: selectedItem.color }}
          >
            <span className={`ml-2 ${parseInt(selectedItem.color.replace('#', ''), 16) > 0xffffff / 2 ? 'text-gray-800' : 'text-white'}`}>
              {selectedItem.color}
            </span>
          </div>
          {showColorPicker && (
            <div className="mt-1">
              <HexColorPicker color={selectedItem.color} onChange={handleColorChange} />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Width (X)</label>
              <div className="flex items-center">
                <button
                  className="p-1 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  onClick={() => handleScaleChange('x', -0.1)}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="px-2 py-1 border-t border-b border-gray-300 bg-white text-sm text-center flex-1">
                  {selectedItem.scale.x.toFixed(1)}
                </div>
                <button
                  className="p-1 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  onClick={() => handleScaleChange('x', 0.1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Height (Y)</label>
              <div className="flex items-center">
                <button
                  className="p-1 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  onClick={() => handleScaleChange('y', -0.1)}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="px-2 py-1 border-t border-b border-gray-300 bg-white text-sm text-center flex-1">
                  {selectedItem.scale.y.toFixed(1)}
                </div>
                <button
                  className="p-1 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  onClick={() => handleScaleChange('y', 0.1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Depth (Z)</label>
              <div className="flex items-center">
                <button
                  className="p-1 rounded-l-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  onClick={() => handleScaleChange('z', -0.1)}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="px-2 py-1 border-t border-b border-gray-300 bg-white text-sm text-center flex-1">
                  {selectedItem.scale.z.toFixed(1)}
                </div>
                <button
                  className="p-1 rounded-r-md border border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                  onClick={() => handleScaleChange('z', 0.1)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rotation
          </label>
          <div className="flex space-x-2">
            <button
              className="flex-1 flex items-center justify-center space-x-1 py-2 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => handleRotate(-Math.PI / 2)}
            >
              <RotateCw className="h-4 w-4 transform -rotate-90" />
              <span className="text-sm">-90°</span>
            </button>
            <button
              className="flex-1 flex items-center justify-center space-x-1 py-2 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => handleRotate(Math.PI / 2)}
            >
              <RotateCw className="h-4 w-4 transform rotate-90" />
              <span className="text-sm">+90°</span>
            </button>
          </div>
        </div>

        <button
          className="w-full flex items-center justify-center py-2 px-4 border border-red-300 text-red-700 bg-white hover:bg-red-50 rounded-md"
          onClick={onRemoveItem}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default FurnitureControls;