import type { User } from '../../../types';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
}

const HeroSection = ({ user }: Props) => {
  return (
    <section className="pt-20 pb-8 md:pt-32 md:pb-12 flex flex-col items-center text-center">
      <div className="mb-8 relative group animate-[fadeUp_0.6s_ease-out]">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse transition-opacity duration-700" />
        <img
          src={user.profileImageURL}
          alt={user.fullName}
          className="relative w-80 h-80 rounded-full mx-auto border-4 border-white shadow-lg object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-blue-500/20"
        />
      </div>

      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6 animate-[fadeUp_0.6s_ease-out_0.1s_backwards]">
        Building Digital <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 bg-[length:200%_auto] hover:bg-[position:100%_0] transition-[background-position] duration-700">
          Experiences.
        </span>
      </h1>

      <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-[fadeUp_0.6s_ease-out_0.2s_backwards]">
        Hi, I'm {user.fullName.split(' ')[0]}. {user.bioText}
      </p>

      <div className="flex flex-wrap justify-center gap-4 animate-[fadeUp_0.6s_ease-out_0.3s_backwards]">
        <Link
          to="/projects"
          className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-full overflow-hidden shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative inline-flex items-center gap-2">
            My work
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
        <Link
          to="/about"
          className="px-8 py-4 bg-white text-slate-700 font-bold rounded-full border border-slate-200 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
        >
          About Me
        </Link>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeUp_0\\.6s_ease-out\\],
          .animate-\\[fadeUp_0\\.6s_ease-out_0\\.1s_backwards\\],
          .animate-\\[fadeUp_0\\.6s_ease-out_0\\.2s_backwards\\],
          .animate-\\[fadeUp_0\\.6s_ease-out_0\\.3s_backwards\\] {
            animation: none !important;
          }
          .animate-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;