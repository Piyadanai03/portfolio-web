import type { Experience } from "../../../types"; // ปรับ path ให้ตรงกับโปรเจกต์ของคุณ

interface Props {
  experiences: Experience[];
  selectedExpId: string | null;
  onSelectExperience: (id: string | null) => void;
}

const FilterBar = ({
  experiences,
  selectedExpId,
  onSelectExperience,
}: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        <button
          onClick={() => onSelectExperience(null)}
          className={`rounded-full border px-5 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
            selectedExpId === null
              ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-200/50"
              : "border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
          }`}
        >
          All Projects
        </button>
        {experiences.map((exp) => (
          <button
            key={exp.id}
            onClick={() => onSelectExperience(exp.id)}
            className={`rounded-full border px-5 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
              selectedExpId === exp.id
                ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-200/50"
                : "border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
            }`}
          >
            {exp.jobTitle}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
