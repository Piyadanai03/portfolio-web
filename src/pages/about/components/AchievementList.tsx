import type { Achievement } from "../../../types";
import { Link } from "react-router-dom";

interface Props {
  achievements: Achievement[];
}

const AchievementList = ({ achievements }: Props) => {
  const awards = achievements.filter((a) => a.category === "award");
  const trainings = achievements.filter((a) => a.category === "training");

  return (
    <div className="mt-20 space-y-16">
      {/* 🏆 Section: Awards */}
      {awards.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b-2 border-slate-100 pb-2 flex items-center gap-2">
            <span>🏆</span> Major Awards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((ach) => (
              <div
                key={ach.id}
                className="relative p-6 bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-amber-400 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg rotate-12">
                  🏆
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2 pr-8">
                  {ach.title}
                </h4>
                <p className="text-amber-700 font-bold text-sm tracking-widest mb-4">
                  {new Date(ach.dateAchieved).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  • Excellence Award
                </p>

                {/* 2. เพิ่มปุ่ม Link ไปยังโปรเจกต์ (ถ้ามี projectID) */}
                {ach.projectID && (
                  <Link
                    to={`/projects/${ach.projectID}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-amber-900 hover:text-amber-600 transition-colors"
                  >
                    View Related Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 📜 Section: Certifications & Training */}
      {trainings.length > 0 && (
        <section>
          <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b-2 border-slate-100 pb-2 flex items-center gap-2">
            <span>📜</span> Certifications & Training
          </h3>
          <div className="space-y-4">
            {trainings.map((ach) => (
              <div
                key={ach.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-colors group gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg group-hover:bg-blue-50 transition-colors">
                    📜
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{ach.title}</h4>
                    <p className="text-sm text-slate-500 font-bold tracking-wider">
                      {new Date(ach.dateAchieved).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AchievementList;
