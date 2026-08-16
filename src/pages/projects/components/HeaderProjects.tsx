import type { Experience } from "../../../types";

interface Props {
  experiences: Experience[];
  selectedExpId: string | null;
}

const HeaderProjects = ({ experiences, selectedExpId }: Props) => {
  const selectedExperience = experiences.find(
    (exp) => exp.id === selectedExpId,
  );

  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl font-black text-slate-900 mb-4">Projects</h1>
      {selectedExperience && (
        <p className="mt-2 text-slate-400 text-sm">
          Based on my experience at{" "}
          <span className="font-bold text-violet-600">
            {selectedExperience.company}
          </span>{" "}
          as a {selectedExperience.jobTitle}
        </p>
      )}
    </header>
  );
};

export default HeaderProjects;
