import { useProjects } from './hooks/useProjects';
import ProjectCard from './components/ProjectCard';

const ProjectPage = () => {
  const { projects, loading } = useProjects();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">กำลังโหลดผลงาน...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">All Projects</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          รวบรวมผลงานการพัฒนาซอฟต์แวร์ ตั้งแต่ระบบ Backend หลังบ้าน ไปจนถึงงานวิจัยและ AI
        </p>
      </header>

      {/* Grid แสดงโปรเจกต์ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-20 text-slate-400 italic">
          ยังไม่มีข้อมูลโปรเจกต์ในขณะนี้
        </div>
      )}
    </div>
  );
};

export default ProjectPage;