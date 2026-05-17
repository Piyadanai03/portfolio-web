import { useState } from 'react';
import { useEducation } from './hooks/useEducation';
import { EducationForm } from './components/EducationForm';
import type { Study } from '../../../types';

const AdminEducation = () => {
  const { educationList, isLoading, error, addEducation, updateEducation, deleteEducation } = useEducation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Study | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleOpenNew = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (education: Study) => {
    setEditingData(education);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingData(null);
  };

  const handleSave = async (data: Omit<Study, 'id' | 'userID'>) => {
    try {
      setIsSaving(true);
      if (editingData) {
        await updateEducation(editingData.id, data);
        setMessage({ type: 'success', text: 'แก้ไขข้อมูลการศึกษาสำเร็จ!' });
      } else {
        await addEducation(data);
        setMessage({ type: 'success', text: 'เพิ่มข้อมูลการศึกษาสำเร็จ!' });
      }
      handleCloseModal();
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'เกิดข้อผิดพลาด' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEducation(id);
      setMessage({ type: 'success', text: 'ลบข้อมูลการศึกษาสำเร็จ!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'เกิดข้อผิดพลาด' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-12 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">ข้อมูลการศึกษา</h1>
          <p className="text-slate-500">จัดการข้อมูลการศึกษา ประกาศนียบัตร และประวัติการเรียน</p>
        </div>
        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5"
        >
          <span className="text-xl">+</span> เพิ่มข้อมูลการศึกษา
        </button>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-xl font-bold transition-all ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl font-bold">
          {error}
        </div>
      )}

      {/* Education List */}
      <div className="space-y-4">
        {educationList.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-3xl border border-slate-200 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-4 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
            </svg>
            <p>ยังไม่มีข้อมูลการศึกษา</p>
          </div>
        ) : (
          educationList.map(education => (
            <div
              key={education.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{education.degree}</h3>
                    <p className="text-sm text-slate-500">{education.major}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <span className="text-slate-500">สถาบัน: </span>
                      <span className="font-semibold text-slate-700">{education.institution}</span>
                    </div>
                    {education.faculty && (
                      <div>
                        <span className="text-slate-500">คณะ: </span>
                        <span className="font-semibold text-slate-700">{education.faculty}</span>
                      </div>
                    )}
                    {education.gpa !== undefined && education.gpa !== null && (
                      <div>
                        <span className="text-slate-500">GPA: </span>
                        <span className="font-semibold text-slate-700">{education.gpa.toFixed(2)}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-slate-500">วันที่สำเร็จ: </span>
                      <span className="font-semibold text-slate-700">{formatDate(education.graduationDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(education)}
                    className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="แก้ไข"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(education.id)}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="ลบ"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"></div>
          <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto animate-fade-in shadow-2xl rounded-2xl">
            <EducationForm
              key={editingData ? editingData.id : 'new'}
              initialData={editingData}
              onSave={handleSave}
              onCancel={handleCloseModal}
              isSaving={isSaving}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEducation;
