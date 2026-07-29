import { useState } from 'react';
import { useTech } from './hooks/useTech';
import { TechForm } from './components/TechForm';
import type { Technology } from '../../../types';

const AdminTech = () => {
  const { techList, isLoading, error, addTech, updateTech, deleteTech } = useTech();
  
  // 🌟 State ควบคุม Pop-up
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Technology | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenNew = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tech: Technology) => {
    setEditingData(tech);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingData(null);
    setIsSubmitting(false);
  };

  const handleSave = async (data: Partial<Technology>, iconFile?: File) => {
    try {
      setIsSubmitting(true);
      if (editingData) {
        await updateTech(editingData.id, data, iconFile);
      } else {
        await addTech(data as Omit<Technology, 'id'>, iconFile);
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
      // Error handling ทำโดย useTech hook แล้ว
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500 font-medium">กำลังโหลดข้อมูล...</div>;

  const groupedTech = techList.reduce((acc, tech) => {
    const cat = tech.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>);

  return (
    <div className="max-w-5xl mx-auto pb-12 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Technologies</h1>
          <p className="text-slate-500">จัดการทักษะและเทคโนโลยีที่คุณใช้งาน (Tech Stack)</p>
          {error && <p className="text-red-500 text-sm font-medium mt-2">⚠️ {error}</p>}
        </div>
        <button 
          onClick={handleOpenNew} 
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
        >
          <span className="text-xl">+</span> Add Tech
        </button>
      </div>

      {/* แสดงข้อมูลแบบจัดกลุ่ม */}
      <div className="space-y-8">
        {Object.entries(groupedTech).map(([category, items]) => (
          <div key={category} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 px-2 border-l-4 border-blue-500">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map(tech => (
                <div key={tech.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-1.5 shrink-0 shadow-sm">
                       {tech.iconURL ? (
                         <img src={tech.iconURL} alt={tech.name} className="w-full h-full object-contain" />
                       ) : (
                         <span className="text-[10px] font-bold text-slate-400">IMG</span>
                       )}
                    </div>
                    <span className="font-bold text-slate-700 truncate" title={tech.name}>{tech.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                       onClick={() => handleEdit(tech)} 
                       disabled={isSubmitting}
                       className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50" 
                       title="แก้ไข"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                     </button>
                     <button 
                       onClick={() => deleteTech(tech.id)} 
                       disabled={isSubmitting}
                       className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50" 
                       title="ลบ"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {techList.length === 0 && (
          <div className="p-10 text-center bg-white rounded-3xl border border-slate-200 text-slate-400">
            ยังไม่มีข้อมูล Technology
          </div>
        )}
      </div>

      {/* Modal Pop-up Container */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* ฉากหลังสีดำโปร่งแสง */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"></div>
          
          {/* ตัวกล่องฟอร์มที่ลอยอยู่ตรงกลาง */}
          <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto animate-fade-in shadow-2xl rounded-2xl">
             <TechForm 
                key={editingData ? editingData.id : 'new'} 
                initialData={editingData} 
                onSave={handleSave} 
                onCancel={handleCloseModal}
                isLoading={isSubmitting}
             />
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTech;