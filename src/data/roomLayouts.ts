import { RoomLayout } from '../types';

export const defaultRoomLayouts: RoomLayout[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    width: 15,
    length: 20,
    height: 9,
    wallColor: '#F5F5F5',
    floorColor: '#D7CCC8'
  },
  {
    id: 'bedroom',
    name: 'Master Bedroom',
    width: 14,
    length: 16,
    height: 9,
    wallColor: '#E6E6FA',
    floorColor: '#A89C94'
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    width: 12,
    length: 15,
    height: 9,
    wallColor: '#F0FFF0',
    floorColor: '#BCAAA4'
  },
  {
    id: 'dining-room',
    name: 'Dining Room',
    width: 12,
    length: 14,
    height: 9,
    wallColor: '#FFF0F5',
    floorColor: '#8D6E63'
  },
  {
    id: 'office',
    name: 'Home Office',
    width: 10,
    length: 12,
    height: 9,
    wallColor: '#E0F7FA',
    floorColor: '#A1887F'
  },
  {
    id: 'studio',
    name: 'Studio Apartment',
    width: 18,
    length: 24,
    height: 9,
    wallColor: '#FFF8E1',
    floorColor: '#EFEBE9'
  },
  {
    id: 'empty',
    name: 'Empty Room',
    width: 15,
    length: 15,
    height: 9,
    wallColor: '#FFFFFF',
    floorColor: '#EEEEEE'
  }
];