import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 🌟 1. State ควบคุมการเปิด/ปิดเมนูบนมือถือและ iPad
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("คุณต้องการออกจากระบบใช่หรือไม่?");
    if (confirmLogout) {
      // 🌟 เคลียร์ Token ทิ้งจริงๆ เมื่อกดยืนยัน
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  };

  // ฟังก์ชันสำหรับปิดเมนูเวลาผู้ใช้กดเปลี่ยนหน้า
  const closeMenu = () => setIsMobileMenuOpen(false);

  // เมนูของระบบหลังบ้าน
  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin/profile", label: "My Profile", icon: "👤" },
    { path: "/admin/projects", label: "Manage Projects", icon: "📁" },
    { path: "/admin/achievements", label: "Achievements", icon: "🏆" },
    { path: "/admin/tech", label: "Technologies", icon: "💻" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      
      {/* 🌟 2. Overlay (ฉากหลังสีดำโปร่งแสง) จะโชว์เฉพาะตอนเปิดเมนูบนมือถือ */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* 📍 Sidebar (เมนูด้านข้าง) */}
      {/* 🌟 3. ปรับ Class ให้ลอยทับหน้าจอ (fixed) บนมือถือ และกลับมาเป็นปกติ (relative) บนจอใหญ่ (lg) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Admin Panel
            </h1>
            <p className="text-slate-400 text-xs mt-1">Portfolio Manager</p>
          </div>
          {/* ปุ่มปิด (X) สำหรับมือถือ */}
          <button onClick={closeMenu} className="p-2 text-slate-400 hover:text-white lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin" && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu} // 🌟 4. กดเลือกเมนูแล้วให้ปิด Sidebar อัตโนมัติ (เฉพาะมือถือ)
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ปุ่ม Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors font-medium w-full text-left"
          >
            <span className="text-xl">🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* 📍 Main Content (เนื้อหาตรงกลาง) */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        
        {/* Header แถบบน */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-4">
            {/* 🌟 5. ปุ่ม Hamburger สำหรับเปิดเมนูบนมือถือ/iPad */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 lg:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <h2 className="font-bold text-slate-700 hidden sm:block">Admin Workspace</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              P
            </span>
          </div>
        </header>

        {/* พื้นที่สำหรับแสดงหน้าต่างๆ (Scrollable) */}
        {/* 🌟 ปรับ Padding ให้ลดลงนิดหน่อยบนหน้าจอมือถือ */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;