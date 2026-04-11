import { MOCK_USER, MOCK_PROJECTS } from '../../data/mockData';

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* 1. ส่วนข้อมูลส่วนตัว (Hero Section) */}
      <section className="flex flex-col md:flex-row items-center gap-10 mb-20">
        <div className="w-48 h-48 rounded-3xl bg-blue-100 overflow-hidden shadow-inner flex-shrink-0">
          <img src={MOCK_USER.profileImageURL} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">My Biography</h2>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{MOCK_USER.fullName}</h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">{MOCK_USER.bioText}</p>
        </div>
      </section>

      {/* 2. พื้นที่แสดงโปรเจกต์ (Projects Grid) */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Featured Projects</h2>
          <button className="text-blue-600 font-semibold hover:underline">View All →</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_PROJECTS.map((project) => (
            <div key={project.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.coverImageURL} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex gap-4">
                  <a href={project.githubURL} className="text-sm font-bold text-slate-900 hover:text-blue-600">GitHub</a>
                  <button className="text-sm font-bold text-slate-900 hover:text-blue-600">Case Study</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;