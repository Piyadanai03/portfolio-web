import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชันจัดการตอนกดปุ่ม Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันไม่ให้เว็บรีเฟรช
    setError('');
    setIsLoading(true);

    // จำลองการโหลดส่งข้อมูลไปหา Backend 1 วินาที
    setTimeout(() => {
      // 🔑 รหัสผ่านจำลอง (เดี๋ยวอนาคตเราจะใช้ API จาก Go มาเช็กจริงๆ)
      if (username === 'admin' && password === 'admin123') {
        // ถ้าถูก ให้พาไปหน้า Admin
        navigate('/admin');
      } else {
        // ถ้าผิด ให้โชว์ Error
        setError('Username หรือ Password ไม่ถูกต้อง!');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* แถบสีด้านบนของกล่อง */}
        <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-400"></div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500">ลงชื่อเข้าใช้เพื่อจัดการ Portfolio ของคุณ</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* โชว์ Error ถ้าใส่รหัสผิด */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl text-center">
                {error}
              </div>
            )}

            {/* ช่อง Username */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                placeholder="พิมพ์ admin"
                required
              />
            </div>

            {/* ช่อง Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                placeholder="พิมพ์ admin123"
                required
              />
            </div>

            {/* ปุ่ม Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  กำลังตรวจสอบ...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* ลิงก์กลับหน้าหลัก */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
              ← กลับไปหน้าเว็บไซต์ปกติ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;