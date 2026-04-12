import type { Project } from "../../../types";
import { Link } from "react-router-dom";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* รูปภาพ Cover */}
      <div className="aspect-video overflow-hidden bg-slate-100">
        <img
          src={
            project.coverImageURL 
          }
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Tech Stack Badges */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.map((tech) => (
              <span
                key={tech.id}
                className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-md border border-blue-100"
              >
                {tech.iconURL && !tech.iconURL.includes("placehold") && (
                  <img src={tech.iconURL} alt={tech.name} className="w-3 h-3" />
                )}
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {/* ข้อมูลโปรเจกต์ */}
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {project.title}
        </h3>
        <p className="text-slate-600 text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* ปุ่มด้านล่าง */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          {project.githubURL ? (
            <a
              href={project.githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-bold text-slate-700 hover:text-black transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Code
            </a>
          ) : (
            <span className="text-sm font-bold text-slate-400">
              Private Repo
            </span>
          )}

          <Link
            to={`/projects/${project.id}`}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
