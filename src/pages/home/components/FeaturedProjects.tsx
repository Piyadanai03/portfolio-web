import type { Project } from "../../../types";
import { Link } from "react-router-dom";

interface Props {
  projects: Project[];
}

const FeaturedProjects = ({ projects }: Props) => {
  if (!projects || projects.length === 0) return null;

  const heroProject = projects[0];
  const sideProjects = projects.slice(1, 3);

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24">
      {/* ส่วนหัว (Header) */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
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
          className="group flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors mt-4 md:mt-0"
        >
          All Projects
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      {/* Grid Container: บังคับความสูงคงที่ในจอใหญ่ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[500px]">
        <Link
          to={`/projects/${heroProject.id}`}
          className="lg:col-span-8 group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow flex items-end h-[400px] lg:h-full bg-slate-900"
        >
          {/* รูปภาพ Background */}
          <div className="absolute inset-0 bg-slate-900 flex justify-center items-start pt-8">
            <img
              src={heroProject.coverImageURL}
              alt={heroProject.title}
              className="w-[90%] h-[90%] object-contain object-top group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay เพื่อให้อ่านตัวหนังสือชัดเจน */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent"></div>
          </div>

          {/* เนื้อหาข้อความ */}
          <div className="relative p-8 md:p-10 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight drop-shadow-md line-clamp-2">
              {heroProject.title}
            </h3>
            <span className="inline-flex items-center text-blue-400 font-bold group-hover:text-blue-300 transition-colors">
              Read Case Study
              <svg
                className="w-5 h-5 ml-2 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </div>
        </Link>

        <div className="lg:col-span-4 flex flex-col gap-8 h-full">
          {sideProjects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group flex-1 flex flex-col rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:border-blue-300"
            >
              {/* พื้นที่รูปภาพ */}
              <div className="h-56 lg:h-[70%] overflow-hidden bg-slate-100 border-b border-slate-100">
                <img
                  src={project.coverImageURL}
                  alt={project.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* พื้นที่ข้อความ */}
              <div className="px-6 py-4 bg-white">
                <h4 className="text-xl font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
