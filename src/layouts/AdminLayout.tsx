import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // ในอนาคตเราจะสั่งลบ Token (localStorage.removeItem('token')) ที่นี่
    const confirmLogout = window.confirm("คุณต้องการออกจากระบบใช่หรือไม่?");
    if (confirmLogout) {
      navigate("/admin/login");
    }
  };

  // เมนูของระบบหลังบ้าน
  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/profile", label: "My Profile", icon: "👤" },
    { path: "/admin/projects", label: "Manage Projects", icon: "📁" },
    { path: "/admin/achievements", label: "Achievements", icon: "🏆" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 📍 Sidebar (เมนูด้านข้าง) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-center border-b border-slate-800">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Admin Panel
          </h1>
          <p className="text-slate-400 text-xs mt-1">Portfolio Manager</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            // เช็กว่าหน้าปัจจุบันตรงกับเมนูนี้ไหม เพื่อทำไฮไลต์สี
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin" &&
                location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
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

        {/* ปุ่ม Logout ด้านล่างสุด */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors font-medium w-full text-left"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* 📍 Main Content (เนื้อหาตรงกลาง) */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header แถบบน (ตัวเลือกเสริม) */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="font-bold text-slate-700">Admin Workspace</h2>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              P
            </span>
          </div>
        </header>

        {/* พื้นที่สำหรับแสดงหน้าต่างๆ (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Outlet คือจุดที่ React Router จะเอาเนื้อหาของแต่ละหน้ามาเสียบ! */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
