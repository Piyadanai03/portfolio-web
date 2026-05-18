import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Technology } from '../../../../types';

interface TechFormProps {
  initialData: Technology | null;
  onSave: (data: Partial<Technology>, iconFile?: File) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CATEGORY_OPTIONS = [
  "Frontend", "Backend", "Database", "DevOps", "AI/ML", "Tools", "Other"
];

export const TechForm = ({ initialData, onSave, onCancel, isLoading }: TechFormProps) => {
  const [formData, setFormData] = useState<Partial<Technology>>(() => {
    if (initialData) return { ...initialData };
    return { name: '', category: 'Frontend', iconURL: '' };
  });
  
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(initialData?.iconURL || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIconUpload = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 100 * 1024) {
      alert("⚠️ ไฟล์ Icon มีขนาดใหญ่เกินไป!\nกรุณาเลือกไฟล์ไม่เกิน 100KB");
      return;
    }
    
    setIconFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // ถ้ามี icon file ใหม่ ส่งไปด้วย
    if (iconFile) {
      onSave(formData, iconFile);
    } else {
      // ถ้าไม่มี icon file ใหม่ แต่มี URL (เช่นจากการแก้ไข) ให้ส่ง URL เดิม
      onSave(formData);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          {initialData ? '✏️ Edit Technology' : '✨ Add New Technology'}
        </h3>
        <button type="button" onClick={onCancel} disabled={isLoading} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Name (ชื่อเทคโนโลยี) *</label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name || ''} 
              onChange={handleChange} 
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all disabled:opacity-50" 
              placeholder="เช่น React, Go, Docker" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Category (หมวดหมู่) *</label>
            <select 
              name="category" 
              value={formData.category || 'Frontend'} 
              onChange={handleChange} 
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all font-medium disabled:opacity-50"
            >
              {CATEGORY_OPTIONS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2 p-5 bg-slate-50 rounded-2xl border border-slate-200">
             <label className="block text-sm font-bold text-slate-700 mb-3">Icon (ไอคอน)</label>
             <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                
                <div className="w-14 h-14 rounded-xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                   {preview ? (
                     <img src={preview} alt="Preview" className="w-10 h-10 object-contain" />
                   ) : (
                     <span className="text-[10px] font-black text-slate-400">NO IMG</span>
                   )}
                </div>

                <div className="w-full flex-1">
                  <input 
                    type="url" 
                    name="iconURL" 
                    value={formData.iconURL || ''} 
                    onChange={handleChange} 
                    disabled={isLoading || !!iconFile}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white disabled:opacity-50" 
                    placeholder="วางลิงก์รูปภาพ (URL) หรือเลือกไฟล์" 
                  />
                </div>
                
                <span className="text-xs text-slate-400 font-bold hidden sm:block">หรือ</span>

                <label className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors w-full sm:w-auto text-center shrink-0 disabled:opacity-50">
                  📁 อัปโหลดไฟล์
                  <input 
                    type="file" 
                    accept="image/*" 
                    disabled={isLoading}
                    className="hidden" 
                    onChange={(e) => handleIconUpload(e.target.files?.[0])} 
                  />
                </label>
             </div>
             <p className="text-xs text-slate-500 mt-3 font-medium">คำแนะนำ: ค้นหาไอคอนฟรีได้ที่ <a href="https://devicon.dev/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Devicon</a></p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button 
            type="button" 
            onClick={onCancel} 
            disabled={isLoading}
            className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isLoading ? '⏳ Saving...' : 'Save Technology'}
          </button>
        </div>
      </form>
    </div>
  );
};