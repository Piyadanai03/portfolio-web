import { useState } from 'react';
import { useAchievements } from './hooks/useAchievements';
import { AchievementForm } from './components/AchievementForm';
import type { Achievement } from '../../../types';

const AdminAchievements = () => {
  const { achievements, projects, isLoading, deleteAchievement, saveAchievement } = useAchievements();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingData, setEditingData] = useState<Achievement | null>(null);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-GB', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const handleOpenNew = () => {
    setEditingData(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: Achievement) => {
    setEditingData(item);
    setIsFormOpen(true);
  };

  const handleSave = async (data: Partial<Achievement>) => {
    await saveAchievement(data);
    setIsFormOpen(false);
    setEditingData(null);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500 font-medium">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Achievements</h1>
          <p className="text-slate-500">จัดการประวัติการอบรมและรางวัลที่คุณได้รับ</p>
        </div>
        {!isFormOpen && (
          <button 
            onClick={handleOpenNew}
            className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg"
          >
            <span className="text-xl">+</span> Add New
          </button>
        )}
      </div>

      {isFormOpen && (
        <AchievementForm 
          // 🌟 ใส่ key ตรงนี้ เพื่อบังคับให้ฟอร์ม Reset ตัวเองเสมอ
          key={editingData ? editingData.id : 'new-form'} 
          
          initialData={editingData} 
          projects={projects}
          onSave={handleSave} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}

      <div className="space-y-4">
        {achievements.length === 0 ? (
          <div className="p-10 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
            ยังไม่มีข้อมูลผลงานหรือรางวัล
          </div>
        ) : (
          achievements.map((item) => {
            const linkedProject = projects.find(p => p.id === item.projectID);

            return (
              <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-300 transition-colors">
                
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-2xl ${
                    item.category === 'award' ? 'bg-amber-100 text-amber-500' : 'bg-blue-100 text-blue-500'
                  }`}>
                    {item.category === 'award' ? '🏆' : '📜'}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        🗓️ {formatDate(item.dateAchieved)}
                      </span>
                      {linkedProject && (
                        <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md text-slate-600 font-medium text-xs">
                          📁 {linkedProject.title}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto border-t md:border-none border-slate-100 pt-3 md:pt-0 w-full md:w-auto justify-end">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteAchievement(item.id)}
                    className="px-4 py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default AdminAchievements;