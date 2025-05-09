import { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { RoomSettings } from '../../types';

interface RoomSetupProps {
  roomSettings: RoomSettings;
  onUpdate: (settings: RoomSettings) => void;
}

const RoomSetup: React.FC<RoomSetupProps> = ({ roomSettings, onUpdate }) => {
  const [width, setWidth] = useState(roomSettings.width.toString());
  const [length, setLength] = useState(roomSettings.length.toString());
  const [height, setHeight] = useState(roomSettings.height.toString());
  const [wallColor, setWallColor] = useState(roomSettings.wallColor);
  const [floorColor, setFloorColor] = useState(roomSettings.floorColor);
  const [activeColorPicker, setActiveColorPicker] = useState<'wall' | 'floor' | null>(null);

  useEffect(() => {
    setWidth(roomSettings.width.toString());
    setLength(roomSettings.length.toString());
    setHeight(roomSettings.height.toString());
    setWallColor(roomSettings.wallColor);
    setFloorColor(roomSettings.floorColor);
  }, [roomSettings]);

  const handleUpdate = () => {
    const parsedWidth = parseFloat(width);
    const parsedLength = parseFloat(length);
    const parsedHeight = parseFloat(height);

    if (isNaN(parsedWidth) || isNaN(parsedLength) || isNaN(parsedHeight)) {
      return;
    }

    onUpdate({
      width: Math.max(5, Math.min(50, parsedWidth)),
      length: Math.max(5, Math.min(50, parsedLength)),
      height: Math.max(7, Math.min(20, parsedHeight)),
      wallColor,
      floorColor,
    });
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setter(e.target.value);
  };

  const toggleColorPicker = (picker: 'wall' | 'floor') => {
    setActiveColorPicker(activeColorPicker === picker ? null : picker);
  };

  const handleWallColorChange = (color: string) => {
    setWallColor(color);
  };

  const handleFloorColorChange = (color: string) => {
    setFloorColor(color);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Room Settings</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700">
              Width (ft)
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="width"
                value={width}
                onChange={handleInputChange(setWidth)}
                onBlur={handleUpdate}
                min="5"
                max="50"
                step="0.5"
                className="input"
              />
            </div>
          </div>
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">
              Length (ft)
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="length"
                value={length}
                onChange={handleInputChange(setLength)}
                onBlur={handleUpdate}
                min="5"
                max="50"
                step="0.5"
                className="input"
              />
            </div>
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
              Height (ft)
            </label>
            <div className="mt-1">
              <input
                type="number"
                id="height"
                value={height}
                onChange={handleInputChange(setHeight)}
                onBlur={handleUpdate}
                min="7"
                max="20"
                step="0.5"
                className="input"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="wallColor" className="block text-sm font-medium text-gray-700">
              Wall Color
            </label>
            <div className="mt-1 relative">
              <div
                className="input flex items-center cursor-pointer"
                onClick={() => toggleColorPicker('wall')}
              >
                <div
                  className="w-6 h-6 rounded mr-2 border border-gray-300"
                  style={{ backgroundColor: wallColor }}
                ></div>
                <span>{wallColor}</span>
              </div>
              {activeColorPicker === 'wall' && (
                <div className="absolute z-10 mt-1">
                  <HexColorPicker color={wallColor} onChange={handleWallColorChange} />
                  <button
                    className="mt-2 w-full px-2 py-1 bg-primary-600 text-white text-sm rounded"
                    onClick={() => {
                      setActiveColorPicker(null);
                      handleUpdate();
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <label htmlFor="floorColor" className="block text-sm font-medium text-gray-700">
              Floor Color
            </label>
            <div className="mt-1 relative">
              <div
                className="input flex items-center cursor-pointer"
                onClick={() => toggleColorPicker('floor')}
              >
                <div
                  className="w-6 h-6 rounded mr-2 border border-gray-300"
                  style={{ backgroundColor: floorColor }}
                ></div>
                <span>{floorColor}</span>
              </div>
              {activeColorPicker === 'floor' && (
                <div className="absolute z-10 mt-1">
                  <HexColorPicker color={floorColor} onChange={handleFloorColorChange} />
                  <button
                    className="mt-2 w-full px-2 py-1 bg-primary-600 text-white text-sm rounded"
                    onClick={() => {
                      setActiveColorPicker(null);
                      handleUpdate();
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSetup;