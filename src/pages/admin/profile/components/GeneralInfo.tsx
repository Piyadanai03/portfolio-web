import type { ChangeEvent } from 'react';
import { TagInput } from './TagInput'; // ให้แน่ใจว่า import TagInput มาถูกต้องตาม path ของคุณ

interface GeneralInfoProps {
  profile: { fullName: string; bio: string };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  positionTags: string[];
  setPositionTags: (tags: string[]) => void;
}

export const GeneralInfo = ({ profile, handleChange, positionTags, setPositionTags }: GeneralInfoProps) => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-fade-in">
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
            placeholder="John Doe"
          />
        </div>

        <TagInput
          label="Current Positions"
          tags={positionTags}
          onChange={setPositionTags}
          placeholder="พิมพ์ตำแหน่งแล้วกด Enter..."
          description="พิมพ์แล้วกด Enter เพื่อเพิ่มตำแหน่งใหม่"
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-2">Bio / About Me</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all resize-y"
            placeholder="เขียนแนะนำตัวสั้นๆ..."
          />
        </div>
      </div>
    </div>
  );
};