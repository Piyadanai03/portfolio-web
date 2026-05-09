import { useParams, Link } from "react-router-dom";
import { useProjectDetail } from "./hooks/useProjectDetail";

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { project, loading } = useProjectDetail(id);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-32">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Project Not Found
        </h2>
        <Link to="/projects" className="text-blue-600 hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* ปุ่มกลับ */}
      <Link
        to="/projects"
        className="inline-flex items-center text-slate-500 hover:text-slate-800 mb-8 font-medium transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to all projects
      </Link>

      {/* รูป Cover */}
      <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden mb-10 shadow-lg">
        <img
          src={project.coverImageURL}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* หัวข้อและ Tech Stack */}
      <div className="mb-10">
        {/* {relatedAchievements.length > 0 && (
          <div className="mb-6 space-y-3">
            {relatedAchievements.map(ach => (
              <div key={ach.id} className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                <span className="text-2xl animate-bounce">🏆</span>
                <div>
                  <h4 className="font-bold text-amber-900 leading-none">{ach.title}</h4>
                  <p className="text-xs text-amber-700 mt-1 font-medium uppercase tracking-wider">
                    Official Recognition • {new Date(ach.dateAchieved).getFullYear()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )} */}
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          {project.title}
        </h1>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech.id}
                className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg border border-slate-200"
              >
                {tech.iconURL && !tech.iconURL.includes("placehold") && (
                  <img src={tech.iconURL} alt={tech.name} className="w-4 h-4" />
                )}

                {tech.name}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg text-slate-600">
          <p>{project.description}</p>
        </div>
      </div>

      {/* รูปภาพประกอบอื่นๆ (ถ้ามี) */}
      {project.images && project.images.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.map((img) => (
              <div
                key={img.id}
                className="rounded-xl overflow-hidden shadow-md"
              >
                <img
                  src={img.imageURL}
                  alt={img.caption || "Project image"}
                  className="w-full h-auto"
                />
                {img.caption && (
                  <p className="p-3 text-sm text-slate-500 bg-white">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
