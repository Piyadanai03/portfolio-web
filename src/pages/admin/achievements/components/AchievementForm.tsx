import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Achievement, Project } from '../../../../types';

interface AchievementFormProps {
  initialData: Achievement | null;
  projects: Project[];
  onSave: (data: Partial<Achievement>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const AchievementForm = ({ initialData, projects, onSave, onCancel, isLoading = false }: AchievementFormProps) => {
  
  const [formData, setFormData] = useState<Partial<Achievement>>(() => {
    if (initialData) {
      return {
        ...initialData,
        dateAchieved: initialData.dateAchieved ? initialData.dateAchieved.split('T')[0] : new Date().toISOString().split('T')[0],
        projectID: initialData.projectID || '' // 🌟 ดึงค่าเดิมมาแสดง ถ้าไม่มีให้เป็นค่าว่าง
      };
    }
    return {
      title: '',
      category: 'award',
      dateAchieved: new Date().toISOString().split('T')[0],
      projectID: '',
    };
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      dateAchieved: formData.dateAchieved ? `${formData.dateAchieved}T00:00:00Z` : new Date().toISOString(),
      // 🌟 ถ้าเลือก "-- ไม่ระบุโปรเจกต์ --" ให้ส่ง null ไปเพื่อลบค่าใน Database
      projectID: formData.projectID === '' ? null : formData.projectID 
    };
    onSave(finalData);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          {initialData ? '✏️ Edit Achievement' : '✨ Add New Achievement'}
        </h3>
        <button type="button" onClick={onCancel} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-1">Title (ชื่อรางวัล/การอบรม) *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all"
              placeholder="e.g. Won 1st Place in Hackathon"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Category (หมวดหมู่) *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all font-medium"
            >
              <option value="award">🏆 Award / Competition</option>
              <option value="training">📜 Training / Certificate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Date Achieved (วันที่ได้รับ) *</label>
            <input
              type="date"
              name="dateAchieved"
              required
              value={formData.dateAchieved}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="md:col-span-2 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <label className="block text-sm font-bold text-slate-700 mb-2">Related Project (โปรเจกต์ที่เกี่ยวข้อง - ถ้ามี)</label>
            <select
              name="projectID"
              value={formData.projectID || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white transition-all font-medium"
            >
              <option value="">-- ไม่ระบุโปรเจกต์ --</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>📁 {p.title}</option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-2">หากรางวัลนี้เชื่อมโยงกับผลงานในระบบ คุณสามารถเลือกเพื่อเชื่อมโยงกันได้</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isLoading ? 'Saving...' : 'Save Achievement'}
          </button>
        </div>
      </form>
    </div>
  );
};