import type { Experience } from '../../../types';

interface Props {
  experiences: Experience[];
}

const ExperienceTimeline = ({ experiences }: Props) => {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="mb-20">
      <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b-2 border-slate-100 pb-2">
        Experience
      </h3>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-8 md:pl-0">
            <div className="md:grid md:grid-cols-4 md:gap-8 items-start">
              {/* วันที่ */}
              <div className="mb-2 md:mb-0 text-sm font-bold text-slate-400 uppercase tracking-wider md:text-right pt-1">
                {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} 
                {' - '} 
                {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
              </div>
              
              {/* ข้อมูล */}
              <div className="md:col-span-3 pb-8 border-b border-slate-100 last:border-0 last:pb-0">
                <h4 className="text-lg font-bold text-slate-900">{exp.jobTitle}</h4>
                <div className="text-blue-600 font-medium mb-3">{exp.company}</div>
                <p className="text-slate-600 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;