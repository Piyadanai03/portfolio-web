import { useProjects } from './hooks/useProjects';
import ProjectCard from './components/ProjectCard';
import Loading from '../../components/Loading';

const ProjectPage = () => {
  const { projects, loading } = useProjects();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">All Projects</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Showcasing software development work, from backend systems and infrastructure to research and AI projects
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
          No projects found.
        </div>
      )}
    </div>
  );
};

export default ProjectPage;