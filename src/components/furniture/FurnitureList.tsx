import { useState } from 'react';
import { FurnitureCategory, FurnitureTemplateItem, FurnitureType } from '../../types';
import { Search } from 'lucide-react';

interface FurnitureListProps {
  categories: FurnitureCategory[];
  onSelectItem: (item: FurnitureTemplateItem) => void;
}

const FurnitureList: React.FC<FurnitureListProps> = ({ categories, onSelectItem }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0]?.id || null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categories[0]?.id || null);
    }
  };

  const filteredItems = searchQuery
    ? categories
        .flatMap((category) => category.items)
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : activeCategory
    ? categories.find((category) => category.id === activeCategory)?.items || []
    : [];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Furniture Library</h3>
        <div className="mt-2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search furniture..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {!searchQuery && (
        <div className="p-2 border-b border-gray-200 flex overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-md text-sm mr-2 whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-primary-100 text-primary-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-4">
            {searchQuery
              ? 'No furniture found. Try a different search term.'
              : 'No furniture in this category.'}
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectItem(item)}
            >
              <div className="h-24 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2">
                <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FurnitureList;