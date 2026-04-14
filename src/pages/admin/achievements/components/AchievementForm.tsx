import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import type { Achievement, Project } from '../../../../types';

interface AchievementFormProps {
  initialData: Achievement | null;
  projects: Project[];
  onSave: (data: Partial<Achievement>) => void;
  onCancel: () => void;
}

export const AchievementForm = ({ initialData, projects, onSave, onCancel }: AchievementFormProps) => {
  
  // 🌟 ใช้ Lazy Initialization เพื่อเซ็ตค่าเริ่มต้นตอนสร้างฟอร์ม (แก้ Error useEffect)
  const [formData, setFormData] = useState<Partial<Achievement>>(() => {
    if (initialData) {
      return {
        ...initialData,
        dateAchieved: initialData.dateAchieved.split('T')[0]
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
      dateAchieved: new Date(formData.dateAchieved || '').toISOString(),
      projectID: formData.projectID === '' ? undefined : formData.projectID
    };
    onSave(finalData);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 animate-fade-in">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        {initialData ? '✏️ Edit Achievement' : '✨ Add New Achievement'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all"
              placeholder="e.g. Won 1st Place in Hackathon"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all"
            >
              <option value="award">🏆 Award / Competition</option>
              <option value="training">📜 Training / Certificate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Date Achieved *</label>
            <input
              type="date"
              name="dateAchieved"
              required
              value={formData.dateAchieved}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-1">Related Project (Optional)</label>
            <select
              name="projectID"
              value={formData.projectID || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all"
            >
              <option value="">-- ไม่ระบุโปรเจกต์ --</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
          >
            Save Achievement
          </button>
        </div>
      </form>
    </div>
  );
};