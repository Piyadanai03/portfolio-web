import { useEffect, useRef, useState } from "react";
import type { Project } from "../../../types";
import { Link } from "react-router-dom";

interface Props {
  projects: Project[];
}

const AchievementBadge = ({
  title,
  variant = "light",
}: {
  title: string;
  variant?: "light" | "dark";
}) => (
  <div
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
      variant === "dark"
        ? "bg-amber-400/10 border-amber-400/30 text-amber-300"
        : "bg-amber-50 border-amber-200 text-amber-800"
    }`}
  >
    <span className="text-sm leading-none">🏆</span>
    <span className="text-xs font-bold tracking-wider line-clamp-1">
      {title}
    </span>
  </div>
);

const FeaturedProjects = ({ projects }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!projects || projects.length === 0) return null;

  const heroProject = projects[0];
  const sideProjects = projects.slice(1, 3);

  const reveal =
    "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 " +
    (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6");

  return (
    <section ref={sectionRef}>
      {/* Header */}
      <div
        className={`flex flex-col md:flex-row justify-between items-end mb-12 ${reveal}`}
      >
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Examples of work
          </h2>
          <p className="text-lg text-slate-500">
            Examples of work that has been done.
          </p>
        </div>
        <Link
          to="/projects"
          className="group relative flex items-center gap-2 text-blue-600 font-bold mt-4 md:mt-0 overflow-hidden"
        >
          <span className="relative">
            All Projects
            <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-blue-600 scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left" />
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Hero project */}
        <Link
          to={`/projects/${heroProject.id}`}
          className={`lg:col-span-8 group flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-300 transition-all duration-400 ease-out ${reveal}`}
          style={{ transitionDelay: visible ? "100ms" : "0ms" }}
        >
          {/* Image area */}
          <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-slate-100 border-b border-slate-100 flex items-center justify-center">
            <img
              src={heroProject.coverImageURL}
              alt={heroProject.title}
              className="max-w-[88%] max-h-[85%] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Content area — เพิ่ม flex และ flex-col */}
          <div className="relative flex-1 p-8 md:p-10 bg-white flex flex-col items-start">
            {heroProject.achievements &&
              heroProject.achievements.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {heroProject.achievements.map((ach) => (
                    <AchievementBadge
                      key={ach.id}
                      title={ach.title}
                      variant="light"
                    />
                  ))}
                </div>
              )}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 mb-3 leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-blue-600">
              {heroProject.title}
            </h3>
            {heroProject.description && (
              <p className="text-slate-500 text-sm md:text-base mb-6 leading-relaxed max-w-2xl">
                {heroProject.description}
              </p>
            )}
            {/* เติม mt-auto ตรงนี้ เพื่อดันให้ Read Case Study ไปอยู่ล่างสุดเสมอ */}
            <span className="mt-auto inline-flex items-center text-blue-600 font-bold text-sm">
              <span className="relative">
                Read Case Study
                <span className="absolute left-0 -bottom-0.5 w-full h-[1.5px] bg-blue-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </div>
        </Link>

        {/* Side projects */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {sideProjects.map((project, i) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className={`group flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-300 transition-all duration-400 ease-out ${reveal}`}
              style={{
                transitionDelay: visible ? `${200 + i * 100}ms` : "0ms",
              }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
                <img
                  src={project.coverImageURL}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-600 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-400" />
              </div>

              <div className="px-6 py-5 bg-white flex-1">
                {project.achievements && project.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.achievements.map((ach) => (
                      <AchievementBadge key={ach.id} title={ach.title} />
                    ))}
                  </div>
                )}
                <h4 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-slate-500 mt-2 line-clamp-2 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;