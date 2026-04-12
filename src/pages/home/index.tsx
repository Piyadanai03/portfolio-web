import { useHome } from './hooks/useHome';
import HeroSection from './components/HeroSection';
import FeaturedProjects from './components/FeaturedProjects';

const HomePage = () => {
  const { data, loading } = useHome();

  if (loading || !data) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* ส่วนที่ 1: แนะนำตัว */}
      <HeroSection user={data} />
      
      {/* ส่วนที่ 2: โปรเจกต์เด่น (เช็คก่อนว่ามีข้อมูลโปรเจกต์ไหม) */}
      {data.projects && data.projects.length > 0 && (
        <FeaturedProjects projects={data.projects} />
      )}
    </div>
  );
};

export default HomePage;