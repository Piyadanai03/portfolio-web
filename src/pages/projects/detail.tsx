import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProjectDetail } from "./hooks/useProjectDetail";
import Loading from "../../components/Loading";

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { project, loading } = useProjectDetail(id);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const allImages = project
    ? [
        project.coverImageURL,
        ...(project.images?.map((img) => img.imageURL) || []),
      ]
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev === 0 ? allImages.length - 1 : prev! - 1,
        );
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev === allImages.length - 1 ? 0 : prev! + 1,
        );
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, allImages.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? allImages.length - 1 : selectedIndex - 1,
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === allImages.length - 1 ? 0 : selectedIndex + 1,
      );
    }
  };

  if (loading) {
    return <Loading />;
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
    <>
      <div className="max-w-4xl mx-auto px-4 pt-16 pb-8">
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

        <div
          className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden mb-10 shadow-lg cursor-pointer group"
          onClick={() => setSelectedIndex(0)}
        >
          <img
            src={project.coverImageURL}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="mb-10">
          {project.achievements && project.achievements.length > 0 && (
            <div className="mb-6 space-y-3">
              {project.achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl"
                >
                  <span className="text-2xl animate-bounce">🏆</span>
                  <div>
                    <h4 className="font-bold text-amber-900 leading-none">
                      {ach.title}
                    </h4>
                    <p className="text-xs text-amber-700 mt-1 font-medium uppercase tracking-wider">
                      Official Recognition •{" "}
                      {new Date(ach.dateAchieved).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <h1 className="text-4xl font-black text-slate-900 mb-4">
            {project.title}
          </h1>

          {project.experience && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">💼</span>
                <div>
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                    Related Work Experience
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {project.experience.jobTitle}
                  </p>
                  <p className="text-sm text-slate-600">
                    {project.experience.company}
                  </p>
                </div>
              </div>
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech.id}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg border border-slate-200"
                >
                  {tech.iconURL && !tech.iconURL.includes("placehold") && (
                    <img
                      src={tech.iconURL}
                      alt={tech.name}
                      className="w-4 h-4"
                    />
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

        {project.images && project.images.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((img, index) => (
                <div
                  key={img.id}
                  className="rounded-xl overflow-hidden shadow-md cursor-pointer group"
                  onClick={() => setSelectedIndex(index + 1)}
                >
                  <img
                    src={img.imageURL}
                    alt={img.caption || "Project image"}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
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

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity group/modal"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors"
            onClick={() => setSelectedIndex(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {allImages.length > 1 && (
            <button
              className="absolute left-4 md:left-10 z-50 p-3 rounded-full bg-black/40 text-white/70 hover:bg-black/80 hover:text-white transition-all transform hover:scale-110"
              onClick={handlePrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 md:h-10 md:w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          <img
            key={selectedIndex}
            src={allImages[selectedIndex]}
            alt="Fullscreen view"
            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          />

          {allImages.length > 1 && (
            <button
              className="absolute right-4 md:right-10 z-50 p-3 rounded-full bg-black/40 text-white/70 hover:bg-black/80 hover:text-white transition-all transform hover:scale-110"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 md:h-10 md:w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {allImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 text-white/90 text-sm font-medium tracking-widest">
              {selectedIndex + 1} / {allImages.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectDetailPage;
