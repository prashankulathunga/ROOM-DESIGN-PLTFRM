import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useDesignStore, Design } from '../store/designStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { designs, getUserDesigns, deleteDesign, setCurrentDesign } = useDesignStore();
  const [userDesigns, setUserDesigns] = useState<Design[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const designs = getUserDesigns(user.id);
      setUserDesigns(designs);
    }
  }, [user, designs, getUserDesigns]);

  const handleCreateNew = () => {
    navigate('/room-designer');
  };

  const handleEditDesign = (designId: string) => {
    setCurrentDesign(designId);
    navigate(`/room-designer/${designId}`);
  };

  const handleDeleteDesign = (designId: string) => {
    if (confirmDelete === designId) {
      deleteDesign(designId);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(designId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            My Designs
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={handleCreateNew}
            className="btn btn-primary flex items-center"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            New Design
          </button>
        </div>
      </div>

      <div className="mt-8">
        {userDesigns.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100">
              <PlusCircle className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No designs yet</h3>
            <p className="mt-1 text-sm text-gray-500">Create your first design to get started.</p>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleCreateNew}
                className="btn btn-primary inline-flex items-center"
              >
                <PlusCircle className="mr-2 -ml-1 h-5 w-5" />
                Create Design
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {userDesigns.map((design) => (
                <li key={design.id}>
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="truncate">
                          <div className="flex items-center">
                            <p className="truncate font-medium text-primary-600">
                              {design.name}
                            </p>
                          </div>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <p>
                                Room size: {design.roomSettings.width}' × {design.roomSettings.length}'
                              </p>
                              <span className="mx-2 text-gray-300">|</span>
                              <p>
                                {design.furniture.length} {design.furniture.length === 1 ? 'item' : 'items'}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:space-x-3">
                          <div className="hidden md:block text-sm text-gray-500">
                            Updated {formatDate(design.updatedAt)}
                          </div>
                          <div className="flex space-x-2 mt-2 md:mt-0">
                            <button
                              onClick={() => handleEditDesign(design.id)}
                              className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteDesign(design.id)}
                              className={`inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
                                confirmDelete === design.id
                                  ? 'text-white bg-red-600 hover:bg-red-700'
                                  : 'text-gray-700 bg-white hover:bg-gray-50'
                              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;