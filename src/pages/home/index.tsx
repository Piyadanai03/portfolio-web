import { useHome } from './hooks/useHome';
import HeroSection from './components/HeroSection';
import FeaturedProjects from './components/FeaturedProjects';
import Loading from '../../components/Loading';


const HomePage = () => {
  const { data, loading } = useHome();

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <HeroSection user={data} />
  
      {data.projects && data.projects.length > 0 && (
        <FeaturedProjects projects={data.projects} />
      )}
    </div>
  );
};

export default HomePage;