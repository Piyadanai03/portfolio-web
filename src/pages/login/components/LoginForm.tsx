import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  // ดึง State และ Function ทั้งหมดมาจาก Hook
  const {
    username, setUsername,
    password, setPassword,
    error, isLoading, handleLogin,
  } = useLogin();

  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">Admin Login</h1>
        <p className="text-slate-500 mt-2">ลงชื่อเข้าใช้เพื่อจัดการ Portfolio ของคุณ</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-all"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 focus:bg-white transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : null}
          {isLoading ? "กำลังเข้าสู่ระบบ..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};