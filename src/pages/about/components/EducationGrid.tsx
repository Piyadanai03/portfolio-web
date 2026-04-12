import type { Study } from "../../../types";

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
          <div
            key={edu.id}
            className="relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
          >
            {/* 🌟 เพิ่มป้ายโชว์เกรดตรงมุมขวาบน (ถ้ามีข้อมูลเกรด) */}
            {edu.gpa && (
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-sm rounded-full border border-emerald-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                GPA {edu.gpa.toFixed(2)}
              </div>
            )}

            <h4 className="text-lg font-bold text-slate-900 pr-24">
              {edu.major}
            </h4>
            <p className="text-slate-600 mb-2">{edu.degree}</p>
            <div className="flex justify-between items-end mt-6 pt-4 border-t border-slate-100">
              <span className="text-sm font-medium text-blue-600">
                {edu.institution}
              </span>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded tracking-wider">
                {new Date(edu.graduationDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationGrid;
