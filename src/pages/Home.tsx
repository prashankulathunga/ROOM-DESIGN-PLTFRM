import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-display font-bold text-primary-600">FurnVision</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                className="btn btn-primary"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-primary-700">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 py-8 sm:py-16 md:py-20 lg:py-28 max-w-2xl lg:max-w-none mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                    Visualize Your <span className="text-accent-400">Perfect Space</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Design your dream room with our interactive 3D furniture visualizer. 
                    Mix, match, and customize to create the perfect space before making any purchases.
                  </p>
                  <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                    <button
                      onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
                      className="inline-flex items-center rounded-md border border-transparent bg-accent-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
                    >
                      Get Started
                      <ArrowRight className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-6">
                  <div className="lg:relative lg:h-full">
                    <img
                      className="mx-auto lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none rounded-lg shadow-xl"
                      src="https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Interior design preview"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Design with Confidence
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
                Our furniture visualizer takes the guesswork out of interior design.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="h-16 w-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">2D & 3D Visualization</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    See your designs from multiple perspectives, both in 2D floor plans and immersive 3D views.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="h-16 w-16 mx-auto bg-accent-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Customizable Furniture</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Adjust colors, size, and positioning of furniture to match your exact preferences.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <div className="h-16 w-16 mx-auto bg-secondary-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Save & Share Designs</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Save your designs and share them with friends, family, or interior designers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base text-gray-400">
              &copy; 2025 FurnVision. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;