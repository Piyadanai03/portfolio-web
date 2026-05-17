import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../../../types';

interface ProjectTableProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

export const ProjectTable = ({ projects, onDelete }: ProjectTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleExpand = (projectId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase tracking-wider">
              <th className="p-5 font-bold auto">Project Info</th>
              <th className="p-5 font-bold hidden md:table-cell">Work Experience</th>
              {/* 🌟 1. ฟิกซ์ความกว้างคอลัมน์นี้ไว้ไม่ให้ยืด (เช่นกว้าง 280px) */}
              <th className="p-5 font-bold hidden md:table-cell w-[280px] min-w-[280px]">Technologies</th>
              <th className="p-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project) => {
              const isExpanded = expandedRows[project.id];
              const displayTechs = isExpanded ? project.technologies : project.technologies?.slice(0, 4);
              const hiddenCount = (project.technologies?.length || 0) - 4;

              return (
                <tr key={project.id} className="hover:bg-blue-50/50 transition-colors group">
                  
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                        <img 
                          src={project.coverImageURL} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-lg line-clamp-1">{project.title}</div>
                        <div className="text-sm text-slate-500 line-clamp-1 mt-0.5">{project.description}</div>
                      </div>
                    </div>
                  </td>

                  {/* 🌟 Experience Column */}
                  <td className="p-5 hidden md:table-cell align-top">
                    {project.experience ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm">
                        <p className="font-bold text-amber-900">{project.experience.jobTitle}</p>
                        <p className="text-amber-700 text-xs">{project.experience.company}</p>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-sm">-</span>
                    )}
                  </td>

                  {/* 🌟 2. จัดให้อยู่ด้านบน (align-top) เวลาปัดบรรทัดจะได้ไม่ดันข้อมูลอื่นเบี้ยว */}
                  <td className="p-5 hidden md:table-cell align-top">
                    {/* 🌟 3. บังคับ wrap และจำกัดความกว้างกล่องนี้ */}
                    <div className="flex flex-wrap items-center gap-2 w-[240px]">
                      {displayTechs?.map(tech => (
                        <div 
                          key={tech.id} 
                          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center p-1.5 shrink-0 hover:scale-110 hover:-translate-y-1 transition-all"
                          title={tech.name}
                        >
                          {tech.iconURL ? (
                            <img src={tech.iconURL} alt={tech.name} className="w-full h-full object-contain" />
                          ) : (
                            <span className="text-[8px] font-black text-slate-400 uppercase">{tech.name.substring(0, 3)}</span>
                          )}
                        </div>
                      ))}

                      {/* 🌟 4. รวมเหลือปุ่มเดียว กดเพื่อสลับ ย่อ/ขยาย */}
                      {hiddenCount > 0 && (
                        <button 
                          onClick={() => toggleExpand(project.id)}
                          className={`w-8 h-8 rounded-full border text-xs font-bold flex items-center justify-center transition-all shadow-sm hover:scale-110 shrink-0 ${
                            isExpanded 
                              ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600' // สีตอนขยาย (สีน้ำเงินเข้ม)
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-blue-100 hover:text-blue-600 hover:border-blue-300' // สีตอนย่อ (สีเทา)
                          }`}
                          title={isExpanded ? "ย่อเก็บ" : "ดูเพิ่มเติม"}
                        >
                          {isExpanded ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg> // ไอคอนลูกศรชี้ขึ้น
                          ) : (
                            `+${hiddenCount}` // ข้อความ +N
                          )}
                        </button>
                      )}
                    </div>
                  </td>

                  <td className="p-5 align-top">
                    <div className="flex items-center justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity mt-1">
                      <Link 
                        to={`/admin/projects/edit/${project.id}`} 
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-xl transition-colors" 
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </Link>
                      
                      <button 
                        onClick={() => onDelete(project.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-100 rounded-xl transition-colors" 
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
        
        {projects.length === 0 && (
          <div className="p-12 text-center text-slate-400 bg-slate-50">
            ไม่มีข้อมูลโปรเจกต์ (กรุณากด Add Project เพื่อเพิ่มใหม่)
          </div>
        )}
      </div>
    </div>
  );
};