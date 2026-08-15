import { useProfile } from "./hooks/useProfile";
import { GeneralInfo } from "./components/GeneralInfo";
import { ContactLinks } from "./components/ContactLinks";
import { ProfileMedia } from "./components/ProfileMedia";

export const AdminProfile = () => {
  const {
    profile,
    setProfile,
    positionTags,
    setPositionTags,
    contacts,
    setContacts,
    setProfileFile,
    setResumeFile, // 🌟 ดึงฟังก์ชันสำหรับเซ็ตไฟล์มาใช้งาน
    isFetching,
    isLoading,
    handleChange,
    saveProfile,
  } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProfile();
  };

  if (isFetching) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">My Profile</h1>
        <p className="text-slate-500">
          จัดการข้อมูลส่วนตัวที่แสดงบนหน้าเว็บไซต์ของคุณ
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 🌟 1. ข้อมูลรูปโปรไฟล์และ Resume */}
        <ProfileMedia
          profile={profile}
          setProfile={setProfile}
          setProfileFile={setProfileFile}
          setResumeFile={setResumeFile}
        />

        {/* 2. ข้อมูลทั่วไปและที่อยู่ */}
        <GeneralInfo
          profile={profile}
          handleChange={handleChange}
          positionTags={positionTags}
          setPositionTags={setPositionTags}
        />

        {/* 3. ช่องทางการติดต่อ */}
        <ContactLinks contacts={contacts} setContacts={setContacts} />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-10 py-4 bg-slate-900 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : null}
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
