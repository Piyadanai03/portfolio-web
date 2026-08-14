import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pb-20">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm font-medium tracking-wide">
            © {new Date().getFullYear()} Piyadanai Krongklang. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;