import { Link } from 'react-router-dom';
import { useProjectList } from './hooks/useProjectList';
import { ProjectTable } from './components/ProjectTable';

const AdminProjectList = () => {
  const { projects, isLoading, deleteProject } = useProjectList();

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500 font-medium">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Manage Projects</h1>
          <p className="text-slate-500">จัดการข้อมูลโปรเจกต์และผลงานทั้งหมดของคุณ</p>
        </div>
        {/* 🌟 ปรับปุ่มให้เป็นสีดำ สไตล์เดียวกับหน้าอื่นๆ */}
        <Link 
          to="/admin/projects/new" 
          className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-0.5"
        >
          <span className="text-xl">+</span> Add Project
        </Link>
      </div>

      <ProjectTable projects={projects} onDelete={deleteProject} />
    </div>
  );
};

export default AdminProjectList;