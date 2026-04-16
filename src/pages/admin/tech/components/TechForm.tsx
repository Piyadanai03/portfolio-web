import { useState} from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Technology } from '../../../../types';

interface TechFormProps {
  initialData: Technology | null;
  onSave: (data: Partial<Technology>) => void;
  onCancel: () => void;
}

const CATEGORY_OPTIONS = [
  "Frontend", "Backend", "Database", "DevOps", "AI/ML", "Tools", "Other"
];

export const TechForm = ({ initialData, onSave, onCancel }: TechFormProps) => {
  const [formData, setFormData] = useState<Partial<Technology>>(() => {
    if (initialData) return { ...initialData };
    return { name: '', category: 'Frontend', iconURL: '' };
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ดักการอัปโหลดไฟล์ Base64 (เหมือนหน้า Profile)
  const handleIconUpload = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 100 * 1024) {
      alert("⚠️ ไฟล์ Icon มีขนาดใหญ่เกินไป!\nกรุณาเลือกไฟล์ไม่เกิน 100KB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, iconURL: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 animate-fade-in">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        {initialData ? '✏️ Edit Technology' : '✨ Add New Technology'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Name (ชื่อเทคโนโลยี) *</label>
            <input type="text" name="name" required value={formData.name || ''} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white" placeholder="เช่น React, Go, Docker" />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Category (หมวดหมู่) *</label>
            <select name="category" value={formData.category || 'Frontend'} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white">
              {CATEGORY_OPTIONS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
             <label className="block text-sm font-bold text-slate-700 mb-2">Icon (ไอคอน)</label>
             <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                
                {/* พรีวิวรูปภาพ */}
                <div className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                   {formData.iconURL ? (
                     <img src={formData.iconURL} alt="Preview" className="w-8 h-8 object-contain" />
                   ) : (
                     <span className="text-[10px] font-bold text-slate-400">NO IMG</span>
                   )}
                </div>

                <div className="w-full flex-1">
                  <input type="url" name="iconURL" value={formData.iconURL || ''} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white" placeholder="วางลิงก์รูปภาพ (URL)" />
                </div>
                
                <span className="text-xs text-slate-400 font-bold hidden sm:block">หรือ</span>

                <label className="cursor-pointer bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors w-full sm:w-auto text-center shrink-0">
                  📁 อัปโหลดไฟล์
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleIconUpload(e.target.files?.[0])} />
                </label>
             </div>
             <p className="text-xs text-slate-500 mt-2">คำแนะนำ: ค้นหาไอคอนฟรีได้ที่ <a href="https://devicon.dev/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Devicon</a> (ก๊อปปี้ลิงก์ svg มาวางได้เลย)</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button type="button" onClick={onCancel} className="px-6 py-2.5 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
          <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all">Save Technology</button>
        </div>
      </form>
    </div>
  );
};