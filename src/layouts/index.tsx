import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* พื้นที่แสดงเนื้อหาของแต่ละหน้า (Home, Login ฯลฯ) */}
      </main>
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
        © 2026 Piyadanai Krongklang. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;