import { useState } from 'react';
import { useAchievements } from './hooks/useAchievements';
import { AchievementForm } from './components/AchievementForm';
import type { Achievement } from '../../../types';

const AdminAchievements = () => {
  const { achievements, projects, isLoading, deleteAchievement, saveAchievement } = useAchievements();
  
  // 🌟 State ควบคุม Pop-up Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Achievement | null>(null);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-GB', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const handleOpenNew = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Achievement) => {
    setEditingData(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingData(null);
  };

  const handleSave = async (data: Partial<Achievement>) => {
    await saveAchievement(data);
    handleCloseModal(); // เซฟเสร็จปิด Pop-up
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500 font-medium">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto pb-12 relative">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Achievements</h1>
          <p className="text-slate-500">จัดการประวัติการอบรมและรางวัลที่คุณได้รับ</p>
        </div>
        <button 
          onClick={handleOpenNew}
          className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5"
        >
          <span className="text-xl">+</span> Add New
        </button>
      </div>

      <div className="space-y-4">
        {achievements.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-3xl border border-slate-200 text-slate-400">
            ยังไม่มีข้อมูลผลงานหรือรางวัล
          </div>
        ) : (
          achievements.map((item) => {
            const linkedProject = projects.find(p => p.id === item.projectID);

            return (
              // 🌟 เพิ่มคลาส group เพื่อให้ปุ่มโชว์ตอน hover
              <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white hover:border-slate-300 transition-all group animate-fade-in">
                
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-sm border border-slate-100 ${
                    item.category === 'award' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    {item.category === 'award' ? '🏆' : '📜'}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 text-lg leading-tight">{item.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1 font-medium">
                        🗓️ {formatDate(item.dateAchieved)}
                      </span>
                      {linkedProject && (
                        <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-0.5 rounded-lg text-slate-600 font-bold text-xs border border-slate-200">
                          📁 {linkedProject.title}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 🌟 เปลี่ยนปุ่มเป็น Icon แบบเดียวกับหน้า Tech */}
                <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity self-end sm:self-auto border-t sm:border-none border-slate-100 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                   <button onClick={() => handleEdit(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="แก้ไข">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                   </button>
                   <button onClick={() => deleteAchievement(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="ลบ">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                   </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* 🌟 ระบบ Modal Pop-up (คัดลอกดีไซน์มาจากหน้า Tech) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={handleCloseModal}></div>
          <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto animate-fade-in shadow-2xl rounded-2xl">
             <AchievementForm 
                key={editingData ? editingData.id : 'new-form'} 
                initialData={editingData} 
                projects={projects}
                onSave={handleSave} 
                onCancel={handleCloseModal} 
             />
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminAchievements;