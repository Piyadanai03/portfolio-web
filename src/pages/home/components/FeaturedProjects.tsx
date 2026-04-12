import type { Project } from '../../../types';
import { Link } from 'react-router-dom';

interface Props {
  projects: Project[];
}

const FeaturedProjects = ({ projects }: Props) => {
  if (!projects || projects.length === 0) return null;

  // แยกโปรเจกต์ชิ้นเอก (อันดับ 1) และชิ้นรอง (อันดับ 2-3)
  const heroProject = projects[0];
  const sideProjects = projects.slice(1, 3);

  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Featured Work</h2>
          <p className="text-lg text-slate-500">ผลงานที่ผมคัดสรรมาแล้วว่า "ดีที่สุด"</p>
        </div>
        <Link 
          to="/projects" 
          className="group flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors mt-4 md:mt-0"
        >
          Explore All Projects
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
      
      {/* 🌟 Bento Box Grid Layout 🌟 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ชิ้นเอก (Hero Project) - กินพื้นที่ 8 คอลัมน์ */}
        <Link 
          to={`/projects/${heroProject.id}`}
          className="lg:col-span-8 group relative rounded-3xl overflow-hidden bg-slate-900 min-h-[400px] lg:min-h-[500px] shadow-2xl flex items-end"
        >
          {/* รูปภาพ Background */}
          <div className="absolute inset-0">
            <img 
              src={heroProject.coverImageURL || 'https://placehold.co/1200x800'} 
              alt={heroProject.title} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
            />
            {/* Gradient Overlay เพื่อให้ตัวหนังสืออ่านง่าย */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          </div>

          {/* เนื้อหา */}
          <div className="relative p-8 md:p-12 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                Featured
              </span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              {heroProject.title}
            </h3>
            <p className="text-slate-300 text-lg line-clamp-2 max-w-2xl mb-6">
              {heroProject.description}
            </p>
            <span className="inline-flex items-center text-white font-bold group-hover:text-blue-400 transition-colors">
              Read Case Study 
              <svg className="w-5 h-5 ml-2 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
          </div>
        </Link>

        {/* ชิ้นรอง (Side Projects) - กินพื้นที่ 4 คอลัมน์ เรียงแนวตั้ง */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {sideProjects.map((project) => (
            <Link 
              key={project.id}
              to={`/projects/${project.id}`}
              className="group flex-1 relative rounded-3xl overflow-hidden bg-slate-100 shadow-lg border border-slate-200 hover:border-blue-300 transition-colors flex flex-col justify-end min-h-[250px]"
            >
              {/* รูปภาพส่วนบนครึ่งนึง */}
              <div className="absolute inset-0 h-3/5 overflow-hidden">
                <img 
                  src={project.coverImageURL || 'https://placehold.co/600x400'} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* กล่องข้อความสีขาวด้านล่าง */}
              <div className="relative bg-white z-10 p-6 m-2 rounded-2xl shadow-sm transform group-hover:-translate-y-1 transition-transform duration-300">
                <h4 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{project.title}</h4>
                <p className="text-slate-500 text-sm line-clamp-2">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjects;