import { Link } from 'react-router-dom';
import { useProjectList } from './hooks/useProjectList';
import { ProjectTable } from './components/ProjectTable';

const AdminProjectList = () => {
  const { projects, isLoading, deleteProject } = useProjectList();

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500 font-medium">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Manage Projects</h1>
          <p className="text-slate-500">จัดการข้อมูลโปรเจกต์และผลงานทั้งหมดของคุณ</p>
        </div>
        <Link to="/admin/projects/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Project
        </Link>
      </div>

      {/* 🌟 เรียกใช้ Component แบบคลีนๆ */}
      <ProjectTable projects={projects} onDelete={deleteProject} />
    </div>
  );
};

export default AdminProjectList;