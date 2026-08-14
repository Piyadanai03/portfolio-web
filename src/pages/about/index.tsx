import { useAbout } from './hooks/useAbout';
import ProfileSection from './components/ProfileSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import EducationGrid from './components/EducationGrid';
import AchievementList from './components/AchievementList';
import Loading from '../../components/Loading';

const AboutPage = () => {
  // 2. อย่าลืมดึง achievements ออกมาจาก useAbout() ด้วย
  const { user, achievements, loading } = useAbout();

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <ProfileSection user={user} />
      <ExperienceTimeline experiences={user.experiences || []} />
      <EducationGrid studies={user.studies || []} />
      <AchievementList achievements={achievements} />
    </div>
  );
};

export default AboutPage;