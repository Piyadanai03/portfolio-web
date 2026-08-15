import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ProfileData } from "../hooks/useProfile";

interface ProfileMediaProps {
  profile: ProfileData;
  setProfile: Dispatch<SetStateAction<ProfileData>>;
  setProfileFile: Dispatch<SetStateAction<File | null>>;
  setResumeFile: Dispatch<SetStateAction<File | null>>;
}

export const ProfileMedia = ({
  profile,
  setProfile,
  setProfileFile,
  setResumeFile,
}: ProfileMediaProps) => {
  const [localImagePreview, setLocalImagePreview] = useState<string | null>(
    null,
  );
  const [localResumeName, setLocalResumeName] = useState<string | null>(null);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "profileImageURL" | "resumeURL",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      alert("⚠️ ไฟล์มีขนาดใหญ่เกินไป!\n\nกรุณาเลือกไฟล์ขนาดไม่เกิน 200KB");
      return;
    }

    if (field === "profileImageURL") {
      setProfileFile(file);
      setProfile((prev) => ({ ...prev, profileImageURL: "" }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (field === "resumeURL") {
      setResumeFile(file);
      setProfile((prev) => ({ ...prev, resumeURL: "" }));
      setLocalResumeName(file.name);
    }
  };

  const handleURLChange = (
    val: string,
    field: "profileImageURL" | "resumeURL",
  ) => {
    setProfile((prev) => ({ ...prev, [field]: val }));

    if (field === "profileImageURL") {
      setProfileFile(null);
      setLocalImagePreview(null);
    }
    if (field === "resumeURL") {
      setResumeFile(null);
      setLocalResumeName(null);
    }
  };

  const displayImage = localImagePreview || profile.profileImageURL;

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-fade-in">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="p-2 bg-purple-50 text-purple-600 rounded-lg text-sm">
          📸
        </span>
        Profile Media & Resume
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1. Profile Image */}
        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6">
          <div className="w-32 h-32 rounded-full border-4 border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
            {displayImage ? (
              <img
                src={displayImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>
          <div className="flex-1 w-full space-y-3 text-center sm:text-left">
            <label className="block text-sm font-bold text-slate-700">
              Profile Image URL
            </label>
            <input
              type="url"
              value={profile.profileImageURL}
              disabled={!!localImagePreview}
              onChange={(e) =>
                handleURLChange(e.target.value, "profileImageURL")
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white transition-all text-sm disabled:opacity-50"
              placeholder="https://... (วางลิงก์รูปภาพ)"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold">หรือ</span>
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                📁 เลือกไฟล์ภาพ
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "profileImageURL")}
                />
              </label>
            </div>
          </div>
        </div>

        {/* 2. Resume / CV */}
        <div className="flex flex-col justify-center space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div>
            {/* 🌟 เพิ่มปุ่มกดดู Resume ตรงนี้ */}
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-bold text-slate-700">
                Resume / CV Link
              </label>
              {profile.resumeURL && (
                <a
                  href={profile.resumeURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                >
                  ตัวอย่าง Resume
                </a>
              )}
            </div>

            <p className="text-xs text-slate-500 mb-3">
              ลิงก์ไปยังไฟล์ PDF (เช่น Google Drive) หรืออัปโหลดไฟล์
            </p>
            <input
              type="url"
              value={profile.resumeURL}
              disabled={!!localResumeName}
              onChange={(e) => handleURLChange(e.target.value, "resumeURL")}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 bg-white transition-all text-sm disabled:opacity-50"
              placeholder="https://... (ลิงก์ไฟล์ PDF)"
            />
            {localResumeName && (
              <p className="text-xs text-green-600 font-bold mt-2">
                ✅ เลือกไฟล์แล้ว: {localResumeName}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">
              หรืออัปโหลดเป็นไฟล์ (ไม่เกิน 200KB)
            </span>
            <label className="cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-xs font-bold transition-colors">
              📄 อัปโหลดไฟล์ PDF
              <input
                type="file"
                accept="application/pdf, image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "resumeURL")}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
