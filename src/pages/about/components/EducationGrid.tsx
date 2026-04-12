import type { Study } from '../../../types';

interface Props {
  studies: Study[];
}

const EducationGrid = ({ studies }: Props) => {
  if (!studies || studies.length === 0) return null;

  return (
    <section>
      <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b-2 border-slate-100 pb-2">
        Education
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studies.map((edu) => (
          <div key={edu.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <h4 className="text-lg font-bold text-slate-900">{edu.major}</h4>
            <p className="text-slate-600 mb-2">{edu.degree}</p>
            <div className="flex justify-between items-end mt-6 pt-4 border-t border-slate-100">
              <span className="text-sm font-medium text-blue-600">{edu.institution}</span>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                Class of {new Date(edu.graduationDate).getFullYear()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationGrid;