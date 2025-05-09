// Room Types
export interface RoomSettings {
  width: number;  // in feet or meters
  length: number; // in feet or meters
  height: number; // in feet or meters
  wallColor: string;
  floorColor: string;
}

export interface RoomLayout extends RoomSettings {
  id: string;
  name: string;
  thumbnail?: string;
}

// Furniture Types
export type FurnitureType = 'chair' | 'table' | 'sofa' | 'bed' | 'bookshelf' | 'desk' | 'diningTable' | 'coffeeTable' | 'cabinet' | 'lamp';

export interface FurnitureItem {
  id: string;
  type: FurnitureType;
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  color: string;
  modelPath?: string;
}

export interface FurnitureCategory {
  id: string;
  name: string;
  items: FurnitureTemplateItem[];
}

export interface FurnitureTemplateItem {
  id: string;
  type: FurnitureType;
  name: string;
  thumbnail: string;
  defaultColor: string;
  defaultScale: { x: number; y: number; z: number };
  modelPath?: string;
}

// View Types
export type ViewMode = '2d' | '3d' | 'split';

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}