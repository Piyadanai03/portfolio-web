import { useEffect, useRef, useState } from "react";
import type { Project } from "../../../types";
import { Link } from "react-router-dom";

interface Props {
  projects: Project[];
}

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
      { threshold: 0.35, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!projects || projects.length === 0) return null;

  const heroProject = projects[0];
  const sideProjects = projects.slice(1, 3);

  // Shared reveal classes: fade + rise, triggered once the section scrolls into view
  const reveal =
    "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 " +
    (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6");

  return (
    <section ref={sectionRef} >
      {/* Header */}
      <div className={`flex flex-col md:flex-row justify-between items-end mb-12 ${reveal}`}>
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:min-h-[550px] items-stretch">
        <Link
          to={`/projects/${heroProject.id}`}
          className={`lg:col-span-8 group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 flex items-end h-[400px] lg:h-full bg-slate-900 ${reveal}`}
          style={{ transitionDelay: visible ? "100ms" : "0ms" }}
        >
          <div className="absolute inset-0 bg-slate-900 flex justify-center items-start pt-8 overflow-hidden">
            <img
              src={heroProject.coverImageURL}
              alt={heroProject.title}
              className="w-[90%] h-[90%] object-contain object-top transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent transition-opacity duration-500 group-hover:from-slate-900/98 group-hover:via-slate-900/70" />
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-blue-500/0 group-hover:ring-2 group-hover:ring-blue-500/60 transition-all duration-500" />

          <div className="relative z-10 p-8 md:p-10 w-full">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 leading-tight drop-shadow-md line-clamp-2 transition-transform duration-500 group-hover:-translate-y-1">
              {heroProject.title}
            </h3>
            {heroProject.description && (
              <p className="text-slate-300 text-sm md:text-base line-clamp-3 mb-4 leading-relaxed">
                {heroProject.description}
              </p>
            )}
            <span className="inline-flex items-center text-blue-400 font-bold text-sm">
              <span className="relative">
                Read Case Study
                <span className="absolute left-0 -bottom-0.5 w-full h-[1.5px] bg-blue-400 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </div>
        </Link>

        <div className="lg:col-span-4 flex flex-col gap-8 h-full">
          {sideProjects.map((project, i) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className={`group flex-1 flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-300 transition-all duration-400 ease-out ${reveal}`}
              style={{ transitionDelay: visible ? `${200 + i * 100}ms` : "0ms" }}
            >
              <div className="relative h-56 lg:h-[70%] overflow-hidden bg-slate-100 border-b border-slate-100">
                <img
                  src={project.coverImageURL}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-600 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-400" />
              </div>

              <div className="px-6 py-4 bg-white">
                <h4 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-slate-500 mt-2 line-clamp-3">
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