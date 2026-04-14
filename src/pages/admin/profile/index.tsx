import { useProfile } from './hooks/useProfile';
import { TagInput } from './components/TagInput';

const AdminProfile = () => {
  const { 
    profile, 
    positionTags, 
    setPositionTags, 
    isFetching, 
    isLoading, 
    handleChange, 
    saveProfile 
  } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProfile();
  };

  if (isFetching) {
    return <div className="p-8 text-center text-slate-500 font-medium">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">My Profile</h1>
        <p className="text-slate-500">จัดการข้อมูลส่วนตัวที่แสดงบนหน้าเว็บไซต์ของคุณ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 👤 Section 1: Basic Information */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg text-sm">👤</span>
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all"
              />
            </div>

            {/* 🌟 เรียกใช้ Component แบบคลีนๆ */}
            <TagInput 
              label="Current Positions"
              tags={positionTags}
              onChange={setPositionTags}
              placeholder="พิมพ์ตำแหน่งแล้วกด Enter..."
              description="พิมพ์แล้วกด Enter หรือลูกน้ำ (,) เพื่อเพิ่มตำแหน่งใหม่"
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Bio / About Me</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* 📞 Section 2: Contact & Social */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm">📞</span>
            Contact & Social Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">GitHub URL</label>
              <input
                type="url"
                name="github"
                value={profile.github}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Floating Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-10 py-4 bg-slate-900 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;