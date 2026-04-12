import { useAbout } from './hooks/useAbout';
import ProfileSection from './components/ProfileSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import EducationGrid from './components/EducationGrid';
import AchievementList from './components/AchievementList';

const AboutPage = () => {
  // 2. อย่าลืมดึง achievements ออกมาจาก useAbout() ด้วย
  const { user, achievements, loading } = useAbout();

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
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