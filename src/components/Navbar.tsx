import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/home" className="text-xl font-bold text-blue-600 tracking-tighter">
          PIYA<span className="text-slate-900">.Dev</span>
        </Link>
        
        <div className="flex gap-6 text-sm font-medium text-slate-600">
          <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link to="/projects" className="hover:text-blue-600 transition-colors">Projects</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;