import type { Project } from "../../../types";
import { Link } from "react-router-dom";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const hasAchievements =
    project.achievements && project.achievements.length > 0;

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${
        hasAchievements
          ? "border-amber-200 shadow-lg shadow-amber-100/60 hover:border-amber-300 hover:shadow-amber-200/50"
          : "border-slate-200/70 hover:border-violet-200 hover:shadow-violet-200/50"
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={project.coverImageURL}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex flex-grow flex-col p-6">
        {hasAchievements && (
          <div className="mb-4 space-y-2 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-white p-3">
            {project.achievements!.map((ach) => (
              <div key={ach.id} className="flex items-center gap-2">
                <span className="text-base shrink-0">🎖️</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-amber-900">
                    {ach.title}
                  </p>
                  <p className="text-[10px] font-medium text-amber-700">
                    {ach.category} • {new Date(ach.dateAchieved).getFullYear()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {project.experience && !hasAchievements && (
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-white p-3 shadow-sm transition-colors duration-300 group-hover:border-indigo-200 group-hover:from-indigo-100/50">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100/80 text-base shadow-inner">
              💼
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold text-indigo-950">
                {project.experience.jobTitle}
              </p>
              <p className="mt-0.5 truncate text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                {project.experience.company}
              </p>
            </div>
          </div>
        )}

        <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-violet-700">
          {project.title}
        </h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech.id}
                className="flex items-center gap-1 rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700"
              >
                {tech.iconURL && !tech.iconURL.includes("placehold") && (
                  <img src={tech.iconURL} alt={tech.name} className="h-3 w-3" />
                )}
                {tech.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          {project.githubURL ? (
            <a
              href={project.githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-bold text-slate-600 transition-colors hover:text-slate-900"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4.5 w-4.5"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Code
            </a>
          ) : (
            <span className="text-sm font-bold text-slate-300">
              Private Repo
            </span>
          )}

          <Link
            to={`/projects/${project.id}`}
            className="group/link flex items-center gap-1 text-xs font-bold text-slate-700 transition-colors hover:text-violet-700"
          >
            View Details
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5"
            >
              <path d="M4 10h12M12 6l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
