import { FurnitureCategory, FurnitureTemplateItem } from '../types';

export const furnitureItems: FurnitureCategory[] = [
  {
    id: 'chairs',
    name: 'Chairs',
    items: [
      {
        id: 'chair-1',
        type: 'chair',
        name: 'Modern Dining Chair',
        thumbnail: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        defaultColor: '#8B4513',
        defaultScale: { x: 0.5, y: 0.5, z: 0.5 }
      },
      {
        id: 'chair-2',
        type: 'chair',
        name: 'Lounge Chair',
        thumbnail: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        defaultColor: '#A0522D',
        defaultScale: { x: 0.6, y: 0.6, z: 0.6 }
      },
      {
        id: 'chair-3',
        type: 'chair',
        name: 'Office Chair',
        thumbnail: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        defaultColor: '#000000',
        defaultScale: { x: 0.5, y: 0.5, z: 0.5 }
      }
    ]
  },
  {
    id: 'tables',
    name: 'Tables',
    items: [
      {
        id: 'table-1',
        type: 'table',
        name: 'Dining Table',
        thumbnail: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        defaultColor: '#8B4513',
        defaultScale: { x: 1.2, y: 0.8, z: 1.2 }
      },
      {
        id: 'table-2',
        type: 'coffeeTable',
        name: 'Coffee Table',
        thumbnail: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        defaultColor: '#D2B48C',
        defaultScale: { x: 1.0, y: 0.4, z: 0.6 }
      },
      {
        id: 'table-3',
        type: 'desk',
        name: 'Office Desk',
        thumbnail: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        defaultColor: '#5F4F39',
        defaultScale: { x: 1.5, y: 0.75, z: 0.8 }
      }
    ]
  },
  {
    id: 'sofas',
    name: 'Sofas',
    items: [
      {
        id: 'sofa-1',
        type: 'sofa',
        name: 'Living Room Sofa',
        thumbnail: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        defaultColor: '#808080',
        defaultScale: { x: 2.0, y: 0.8, z: 0.9 }
      },
      {
        id: 'sofa-2',
        type: 'sofa',
        name: 'Sectional Sofa',
        thumbnail: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        defaultColor: '#704214',
        defaultScale: { x: 2.5, y: 0.8, z: 2.5 }
      }
    ]
  },
  {
    id: 'storage',
    name: 'Storage',
    items: [
      {
        id: 'bookshelf-1',
        type: 'bookshelf',
        name: 'Tall Bookshelf',
        thumbnail: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        defaultColor: '#8B4513',
        defaultScale: { x: 1.0, y: 2.0, z: 0.4 }
      },
      {
        id: 'cabinet-1',
        type: 'cabinet',
        name: 'Storage Cabinet',
        thumbnail: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        defaultColor: '#A0522D',
        defaultScale: { x: 1.2, y: 1.2, z: 0.5 }
      }
    ]
  }
];