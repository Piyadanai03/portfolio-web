import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Study } from '../../../../types';

interface EducationFormProps {
  initialData: Study | null;
  onSave: (data: Omit<Study, 'id' | 'userID'>) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export const EducationForm = ({ initialData, onSave, onCancel, isSaving = false }: EducationFormProps) => {
  const [formData, setFormData] = useState<Omit<Study, 'id' | 'userID'>>(() => {
    if (initialData) {
      return {
        degree: initialData.degree,
        faculty: initialData.faculty || '',
        major: initialData.major,
        institution: initialData.institution,
        gpa: initialData.gpa,
        graduationDate: initialData.graduationDate,
      };
    }
    return {
      degree: '',
      faculty: '',
      major: '',
      institution: '',
      gpa: undefined,
      graduationDate: '',
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'gpa') {
      const numValue = value ? parseFloat(value) : undefined;
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // ลบข้อผิดพลาดเมื่อผู้ใช้แก้ไข
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.degree.trim()) newErrors.degree = 'กรุณาระบุระดับการศึกษา';
    if (!formData.major.trim()) newErrors.major = 'กรุณาระบุสาขาวิชา';
    if (!formData.institution.trim()) newErrors.institution = 'กรุณาระบุสถาบัน';
    if (!formData.graduationDate) newErrors.graduationDate = 'กรุณาระบุวันที่สำเร็จการศึกษา';

    if (formData.gpa !== undefined && (formData.gpa < 0 || formData.gpa > 4)) {
      newErrors.gpa = 'GPA ต้องอยู่ระหว่าง 0-4';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          {initialData ? '✏️ แก้ไขข้อมูลการศึกษา' : '✨ เพิ่มข้อมูลการศึกษา'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          disabled={isSaving}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          {/* Degree */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">ระดับการศึกษา (Degree) *</label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-blue-500 ${
                errors.degree ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-slate-50 focus:bg-white'
              }`}
            >
              <option value="">-- เลือกระดับการศึกษา --</option>
              <option value="ปริญญาตรี">ปริญญาตรี (Bachelor)</option>
              <option value="ปริญญาโท">ปริญญาโท (Master)</option>
              <option value="ปริญญาเอก">ปริญญาเอก (Doctoral)</option>
              <option value="ประกาศนียบัตร">ประกาศนียบัตร (Certificate)</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
            {errors.degree && <p className="text-xs text-red-500 mt-1">{errors.degree}</p>}
          </div>

          {/* Major */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">สาขาวิชา (Major) *</label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-blue-500 ${
                errors.major ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-slate-50 focus:bg-white'
              }`}
              placeholder="เช่น วิทยาศาสตร์คอมพิวเตอร์"
            />
            {errors.major && <p className="text-xs text-red-500 mt-1">{errors.major}</p>}
          </div>

          {/* Institution */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">สถาบัน/มหาวิทยาลัย (Institution) *</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-blue-500 ${
                errors.institution ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-slate-50 focus:bg-white'
              }`}
              placeholder="เช่น จุฬาลงกรณ์มหาวิทยาลัย"
            />
            {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
          </div>

          {/* Faculty */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">คณะ (Faculty)</label>
            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="เช่น คณะวิศวกรรมศาสตร์"
            />
          </div>

          {/* GPA */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">GPA</label>
            <input
              type="number"
              name="gpa"
              min="0"
              max="4"
              step="0.01"
              value={formData.gpa === undefined ? '' : formData.gpa}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-blue-500 ${
                errors.gpa ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-slate-50 focus:bg-white'
              }`}
              placeholder="เช่น 3.50"
            />
            {errors.gpa && <p className="text-xs text-red-500 mt-1">{errors.gpa}</p>}
          </div>

          {/* Graduation Date */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">วันที่สำเร็จการศึกษา *</label>
            <input
              type="date"
              name="graduationDate"
              value={formData.graduationDate}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-blue-500 ${
                errors.graduationDate ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-slate-50 focus:bg-white'
              }`}
            />
            {errors.graduationDate && <p className="text-xs text-red-500 mt-1">{errors.graduationDate}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isSaving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
          </button>
        </div>
      </form>
    </div>
  );
};
