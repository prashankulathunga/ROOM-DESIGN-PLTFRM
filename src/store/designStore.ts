import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoomSettings, FurnitureItem, RoomLayout } from '../types';
import { defaultRoomLayouts } from '../data/roomLayouts';

interface DesignState {
  designs: Design[];
  currentDesignId: string | null;
  createDesign: (userId: string, name: string, roomSettings: RoomSettings) => Design;
  updateDesign: (designId: string, updates: Partial<Design>) => void;
  deleteDesign: (designId: string) => void;
  getDesign: (designId: string) => Design | undefined;
  getUserDesigns: (userId: string) => Design[];
  setCurrentDesign: (designId: string | null) => void;
  updateFurniture: (designId: string, furniture: FurnitureItem[]) => void;
  addFurnitureItem: (designId: string, item: FurnitureItem) => void;
  removeFurnitureItem: (designId: string, itemId: string) => void;
  updateFurnitureItem: (designId: string, itemId: string, updates: Partial<FurnitureItem>) => void;
}

export interface Design {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  roomSettings: RoomSettings;
  furniture: FurnitureItem[];
}

export const useDesignStore = create<DesignState>()(
  persist(
    (set, get) => ({
      designs: [],
      currentDesignId: null,
      
      createDesign: (userId, name, roomSettings) => {
        const newDesign: Design = {
          id: `design-${Date.now()}`,
          userId,
          name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          roomSettings,
          furniture: []
        };
        
        set((state) => ({
          designs: [...state.designs, newDesign],
          currentDesignId: newDesign.id
        }));
        
        return newDesign;
      },
      
      updateDesign: (designId, updates) => {
        set((state) => ({
          designs: state.designs.map((design) => 
            design.id === designId 
              ? { 
                  ...design, 
                  ...updates, 
                  updatedAt: new Date().toISOString() 
                } 
              : design
          )
        }));
      },
      
      deleteDesign: (designId) => {
        set((state) => ({
          designs: state.designs.filter((design) => design.id !== designId),
          currentDesignId: state.currentDesignId === designId ? null : state.currentDesignId
        }));
      },
      
      getDesign: (designId) => {
        return get().designs.find((design) => design.id === designId);
      },
      
      getUserDesigns: (userId) => {
        return get().designs.filter((design) => design.userId === userId);
      },
      
      setCurrentDesign: (designId) => {
        set({ currentDesignId: designId });
      },
      
      updateFurniture: (designId, furniture) => {
        set((state) => ({
          designs: state.designs.map((design) => 
            design.id === designId 
              ? { 
                  ...design, 
                  furniture, 
                  updatedAt: new Date().toISOString() 
                } 
              : design
          )
        }));
      },
      
      addFurnitureItem: (designId, item) => {
        set((state) => ({
          designs: state.designs.map((design) => 
            design.id === designId 
              ? { 
                  ...design, 
                  furniture: [...design.furniture, item],
                  updatedAt: new Date().toISOString() 
                } 
              : design
          )
        }));
      },
      
      removeFurnitureItem: (designId, itemId) => {
        set((state) => ({
          designs: state.designs.map((design) => 
            design.id === designId 
              ? { 
                  ...design, 
                  furniture: design.furniture.filter((item) => item.id !== itemId),
                  updatedAt: new Date().toISOString() 
                } 
              : design
          )
        }));
      },
      
      updateFurnitureItem: (designId, itemId, updates) => {
        set((state) => ({
          designs: state.designs.map((design) => 
            design.id === designId 
              ? { 
                  ...design, 
                  furniture: design.furniture.map((item) => 
                    item.id === itemId 
                      ? { ...item, ...updates } 
                      : item
                  ),
                  updatedAt: new Date().toISOString() 
                } 
              : design
          )
        }));
      }
    }),
    { 
      name: 'design-storage'
    }
  )
);

// Initialize with default room layouts
const initializeDefaultDesigns = () => {
  const { designs, createDesign } = useDesignStore.getState();
  
  if (designs.length === 0) {
    defaultRoomLayouts.forEach((layout) => {
      createDesign(
        '1', // Admin user ID
        layout.name,
        {
          width: layout.width,
          length: layout.length,
          height: layout.height,
          wallColor: layout.wallColor,
          floorColor: layout.floorColor
        }
      );
    });
  }
};

// This will initialize the default designs when the store is first created
initializeDefaultDesigns();