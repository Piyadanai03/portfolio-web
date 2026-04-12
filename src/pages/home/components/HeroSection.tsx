import type { User } from '../../../types';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
}

const HeroSection = ({ user }: Props) => {
  return (
    <section className="py-20 md:py-32 flex flex-col items-center text-center">
      {/* รูปโปรไฟล์เล็กๆ ด้านบน */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-20"></div>
        <img 
          src={user.profileImageURL} 
          alt={user.fullName} 
          className="relative w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg object-cover" 
        />
      </div>

      {/* ข้อความทักทาย */}
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-6">
        Building Digital <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
          Experiences.
        </span>
      </h1>
      
      <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
        Hi, I'm {user.fullName.split(' ')[0]}. {user.bioText}
      </p>

      {/* ปุ่ม Call to Action */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link 
          to="/projects" 
          className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
        >
          View My Work
        </Link>
        <Link 
          to="/about" 
          className="px-8 py-4 bg-white text-slate-700 font-bold rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          About Me
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;