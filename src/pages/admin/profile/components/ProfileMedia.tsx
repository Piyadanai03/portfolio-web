import type { Dispatch, SetStateAction } from 'react';
import type { ProfileData } from '../hooks/useProfile';

interface ProfileMediaProps {
  profile: ProfileData;
  setProfile: Dispatch<SetStateAction<ProfileData>>;
  // 🌟 เพิ่ม Props สำหรับเซ็ตไฟล์จริง
  setProfileFile: Dispatch<SetStateAction<File | null>>;
  setResumeFile: Dispatch<SetStateAction<File | null>>;
}

export const ProfileMedia = ({ profile, setProfile, setProfileFile, setResumeFile }: ProfileMediaProps) => {

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'profileImageURL' | 'resumeURL') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) { // ดักขนาด 200KB
      alert("⚠️ ไฟล์มีขนาดใหญ่เกินไป!\n\nกรุณาเลือกไฟล์ขนาดไม่เกิน 200KB");
      return; 
    }

    // 🌟 1. เก็บไฟล์ตัวจริงลงใน State เพื่อเตรียมส่งให้ Backend
    if (field === 'profileImageURL') {
      setProfileFile(file);
    } else if (field === 'resumeURL') {
      setResumeFile(file);
    }

    // 🌟 2. สร้าง Base64 เพื่อให้หน้าเว็บแสดงผล Preview ได้ทันที
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile(prev => ({ ...prev, [field]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-fade-in">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="p-2 bg-purple-50 text-purple-600 rounded-lg text-sm">📸</span>
        Profile Media & Resume
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. Profile Image */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6">
          <div className="w-32 h-32 rounded-full border-4 border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
            {profile.profileImageURL ? (
              <img src={profile.profileImageURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            )}
          </div>
          <div className="flex-1 w-full space-y-3 text-center sm:text-left">
            <label className="block text-sm font-bold text-slate-700">Profile Image URL</label>
            <input
              type="url"
              value={profile.profileImageURL}
              onChange={(e) => setProfile(prev => ({ ...prev, profileImageURL: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white transition-all text-sm"
              placeholder="https://... (วางลิงก์รูปภาพ)"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">หรือ</span>
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                📁 เลือกไฟล์ภาพ
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'profileImageURL')} />
              </label>
            </div>
          </div>
        </div>

        {/* 2. Resume / CV */}
        <div className="flex flex-col justify-center space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Resume / CV Link</label>
            <p className="text-xs text-slate-500 mb-3">ลิงก์ไปยังไฟล์ PDF (เช่น Google Drive) หรืออัปโหลดไฟล์</p>
            <input
              type="url"
              value={profile.resumeURL}
              onChange={(e) => setProfile(prev => ({ ...prev, resumeURL: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 bg-white transition-all text-sm"
              placeholder="https://... (ลิงก์ไฟล์ PDF)"
            />
          </div>
          <div className="flex items-center justify-between">
             <span className="text-xs text-slate-400 font-bold">หรืออัปโหลดเป็นไฟล์ (ไม่เกิน 200KB)</span>
             <label className="cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                📄 อัปโหลดไฟล์ PDF
                <input type="file" accept="application/pdf, image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'resumeURL')} />
              </label>
          </div>
        </div>
      </div>
    </div>
  );
};