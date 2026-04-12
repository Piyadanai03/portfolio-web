import type { User } from '../../../types';

interface Props {
  user: User;
}

const ProfileSection = ({ user }: Props) => {
  return (
    <section className="flex flex-col md:flex-row gap-10 items-center mb-20">
      <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-slate-100 shadow-xl">
        <img 
          src={user.profileImageURL || 'https://placehold.co/400x400?text=Profile'} 
          alt={user.fullName} 
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
          Hi, I'm {user.fullName.split(' ')[0]} 👋
        </h1>
        <h2 className="text-xl text-blue-600 font-semibold mb-4">
          @{user.username}
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          {user.bioText}
        </p>
        
        {/* Social Links & Resume */}
        <div className="flex flex-wrap gap-4 items-center">
          {user.contacts?.filter(c => c.isActive).map(contact => (
            <a 
              key={contact.id} 
              href={contact.urlValue} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium text-sm"
            >
              {contact.iconURL && <img src={contact.iconURL} alt="icon" className="w-5 h-5" />}
              {contact.platformName}
            </a>
          ))}
          
          {/* ปุ่ม Download Resume */}
          {user.resumeURL && (
            <a 
              href={user.resumeURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-bold text-sm shadow-md shadow-blue-500/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Resume
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;