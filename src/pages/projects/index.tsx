import { useState } from 'react';
import { useProjects } from './hooks/useProjects';
import { useExperiences } from './hooks/useExperiences';
import ProjectCard from './components/ProjectCard';
import SkeletonCard from './components/SkeletonCard';
import HeaderProjects from './components/HeaderProjects';
import FilterBar from './components/FilterBar';

const ProjectPage = () => {
  const [selectedExpId, setSelectedExpId] = useState<string | null>(null);

  const { projects, loading } = useProjects(selectedExpId);
  const { experiences } = useExperiences();

  return (
    <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">
      
      <HeaderProjects 
        experiences={experiences} 
        selectedExpId={selectedExpId} 
      />

      <div className="mb-12">
        <FilterBar 
          experiences={experiences}
          selectedExpId={selectedExpId}
          onSelectExperience={setSelectedExpId}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="mb-4 text-4xl">📭</span>
              <p className="text-lg font-bold text-slate-600">No projects found.</p>
              <p className="text-slate-400">There are no projects linked to this experience yet.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectPage;