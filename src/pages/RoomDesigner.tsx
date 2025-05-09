import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Undo, Redo, Save, LayoutGrid, LayoutPanelTop, Layers } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useDesignStore } from '../store/designStore';
import { furnitureItems } from '../data/furnitureItems';
import Room2DView from '../components/room/Room2DView';
import Room3DView from '../components/room/Room3DView';
import RoomSetup from '../components/room/RoomSetup';
import FurnitureList from '../components/furniture/FurnitureList';
import FurnitureControls from '../components/furniture/FurnitureControls';
import { FurnitureItem, FurnitureTemplateItem, RoomSettings, ViewMode } from '../types';

const RoomDesigner = () => {
  const { designId } = useParams<{ designId: string }>();
  const { user } = useAuthStore();
  const { getDesign, createDesign, updateDesign, currentDesignId, setCurrentDesign } = useDesignStore();
  
  // State
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [roomSettings, setRoomSettings] = useState<RoomSettings>({
    width: 15,
    length: 20,
    height: 9,
    wallColor: '#FFFFFF',
    floorColor: '#EEEEEE'
  });
  const [furniture, setFurniture] = useState<FurnitureItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [designName, setDesignName] = useState('New Design');
  const [isEditingName, setIsEditingName] = useState(false);

  // Load design data
  useEffect(() => {
    if (designId && user) {
      const design = getDesign(designId);
      if (design) {
        setRoomSettings(design.roomSettings);
        setFurniture(design.furniture);
        setDesignName(design.name);
        setCurrentDesign(designId);
      } else {
        // Create new design if ID doesn't exist
        const newDesign = createDesign(
          user.id,
          'New Design',
          roomSettings
        );
        setDesignName(newDesign.name);
      }
    } else if (user && !currentDesignId) {
      // Create new design if no ID is provided
      const newDesign = createDesign(
        user.id,
        'New Design',
        roomSettings
      );
      setDesignName(newDesign.name);
    }
  }, [designId, user, getDesign, createDesign, setCurrentDesign, currentDesignId]);

  // Get the active design ID
  const activeDesignId = designId || currentDesignId;

  // Get the selected furniture item
  const selectedItem = furniture.find(item => item.id === selectedItemId) || null;

  // Save design changes
  const saveDesign = () => {
    if (activeDesignId && user) {
      setIsSaving(true);
      
      updateDesign(activeDesignId, {
        name: designName,
        roomSettings,
        furniture
      });
      
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
    }
  };

  // Update room settings
  const handleRoomUpdate = (newSettings: RoomSettings) => {
    setRoomSettings(newSettings);
    saveDesign();
  };

  // Add new furniture
  const handleAddFurniture = (templateItem: FurnitureTemplateItem) => {
    const newItem: FurnitureItem = {
      id: `item-${Date.now()}`,
      type: templateItem.type,
      name: templateItem.name,
      position: {
        x: roomSettings.length / 2,
        y: 0,
        z: roomSettings.width / 2
      },
      rotation: { x: 0, y: 0, z: 0 },
      scale: templateItem.defaultScale,
      color: templateItem.defaultColor
    };
    
    setFurniture([...furniture, newItem]);
    setSelectedItemId(newItem.id);
    saveDesign();
  };

  // Update furniture position
  const handleFurnitureMove = (itemId: string, position: { x: number; y: number; z: number }) => {
    setFurniture(
      furniture.map(item => 
        item.id === itemId 
          ? { ...item, position } 
          : item
      )
    );
  };

  // Update furniture rotation
  const handleFurnitureRotate = (itemId: string, rotation: { x: number; y: number; z: number }) => {
    setFurniture(
      furniture.map(item => 
        item.id === itemId 
          ? { ...item, rotation } 
          : item
      )
    );
  };

  // Update selected furniture item
  const handleUpdateItem = (updates: Partial<FurnitureItem>) => {
    if (!selectedItemId) return;
    
    setFurniture(
      furniture.map(item => 
        item.id === selectedItemId 
          ? { ...item, ...updates } 
          : item
      )
    );
    
    saveDesign();
  };

  // Remove selected furniture item
  const handleRemoveItem = () => {
    if (!selectedItemId) return;
    
    setFurniture(furniture.filter(item => item.id !== selectedItemId));
    setSelectedItemId(null);
    saveDesign();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          {isEditingName ? (
            <input
              type="text"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              onBlur={() => {
                setIsEditingName(false);
                saveDesign();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsEditingName(false);
                  saveDesign();
                }
              }}
              className="border-b border-gray-300 px-1 py-0.5 text-lg font-semibold text-gray-800 focus:outline-none focus:border-primary-500"
              autoFocus
            />
          ) : (
            <h1
              className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-primary-600"
              onClick={() => setIsEditingName(true)}
            >
              {designName}
            </h1>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 rounded-md p-1 flex">
            <button
              className={`p-1 rounded-md ${viewMode === '2d' ? 'bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
              onClick={() => setViewMode('2d')}
              title="2D View"
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              className={`p-1 rounded-md ${viewMode === '3d' ? 'bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
              onClick={() => setViewMode('3d')}
              title="3D View"
            >
              <Layers className="h-5 w-5" />
            </button>
            <button
              className={`p-1 rounded-md ${viewMode === 'split' ? 'bg-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
              onClick={() => setViewMode('split')}
              title="Split View"
            >
              <LayoutPanelTop className="h-5 w-5" />
            </button>
          </div>
          
          <button
            className="btn btn-primary"
            onClick={saveDesign}
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-1" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Room Controls */}
        <div className="w-80 p-4 border-r border-gray-200 bg-gray-50 overflow-y-auto">
          <div className="space-y-4">
            <RoomSetup roomSettings={roomSettings} onUpdate={handleRoomUpdate} />
            
            <FurnitureList 
              categories={furnitureItems} 
              onSelectItem={handleAddFurniture} 
            />
          </div>
        </div>
        
        {/* Center - Room View */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden p-4 flex flex-col">
            {viewMode === '2d' && (
              <Room2DView
                width={roomSettings.width}
                length={roomSettings.length}
                wallColor={roomSettings.wallColor}
                floorColor={roomSettings.floorColor}
                furniture={furniture}
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                onFurnitureMove={handleFurnitureMove}
              />
            )}
            
            {viewMode === '3d' && (
              <div className="flex-1 relative">
                <Room3DView
                  roomSettings={roomSettings}
                  furniture={furniture}
                  selectedItemId={selectedItemId}
                  setSelectedItemId={setSelectedItemId}
                  onFurnitureMove={handleFurnitureMove}
                  onFurnitureRotate={handleFurnitureRotate}
                />
              </div>
            )}
            
            {viewMode === 'split' && (
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                <div className="flex-1 md:mr-2 mb-2 md:mb-0">
                  <Room2DView
                    width={roomSettings.width}
                    length={roomSettings.length}
                    wallColor={roomSettings.wallColor}
                    floorColor={roomSettings.floorColor}
                    furniture={furniture}
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                    onFurnitureMove={handleFurnitureMove}
                  />
                </div>
                <div className="flex-1 md:ml-2 relative">
                  <Room3DView
                    roomSettings={roomSettings}
                    furniture={furniture}
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                    onFurnitureMove={handleFurnitureMove}
                    onFurnitureRotate={handleFurnitureRotate}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Panel - Furniture Controls */}
        <div className="w-80 p-4 border-l border-gray-200 bg-gray-50 overflow-y-auto">
          <FurnitureControls
            selectedItem={selectedItem}
            onUpdateItem={handleUpdateItem}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDesigner;