import type { User } from "../../../types";

interface Props {
  user: User;
}

const ProfileSection = ({ user }: Props) => {
  // แยก string ออกเป็น array และตัด whitespace ซ้าย-ขวา
  const positions = user.position
    ? user.position.split("|").map((p) => p.trim()).filter(Boolean)
    : [];

  return (
    <section className="flex flex-col md:flex-row gap-10 items-center mb-20">
      {/* รูปโปรไฟล์ */}
      <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-slate-100">
        <img
          src={user.profileImageURL || "https://placehold.co/400x400?text=Profile"}
          alt={user.fullName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        {/* ชื่อ */}
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">
          Hi, I'm {user.fullName.split(" ")[0]} 👋
        </h1>

        {/* 🌟 แสดง Positions เป็น Badge Tags */}
        {positions.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
            {positions.map((pos, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 text-xs md:text-sm font-semibold rounded-full border transition-all ${
                  idx % 2 === 0
                    ? "bg-green-50 text-green-700 border-green-200 shadow-sm"
                    : "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
                }`}
              >
                {pos}
              </span>
            ))}
          </div>
        )}

        {/* Bio */}
        {user.bioText && (
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-3">
            {user.bioText}
          </p>
        )}

        {/* Address */}
        {user.address && (
          <div className="flex items-center gap-1.5 justify-center md:justify-start text-slate-500 text-sm mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-slate-400 shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433 1.244-.77 2.828-1.996 4.093-3.692C16.924 12.63 18 9.948 18 7a8 8 0 10-16 0c0 2.948 1.076 5.63 2.535 7.66 1.265 1.696 2.85 2.922 4.094 3.692.31.193.57.337.756.433.093.048.17.087.23.118l.051.022.018.008.006.003zM10 11.25a4.25 4.25 0 100-8.5 4.25 4.25 0 000 8.5z"
                clipRule="evenodd"
              />
            </svg>
            <span>{user.address}</span>
          </div>
        )}

        {/* Social Links & Contact */}
        <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
          {user.contacts
            ?.filter((c) => c.isActive)
            .map((contact) => {
              let hrefValue = contact.urlValue;
              const platform = contact.platformName.toLowerCase();

              if (platform.includes("phone")) {
                hrefValue = `tel:${contact.urlValue.replace(/-/g, "")}`;
              } else if (platform.includes("email")) {
                hrefValue = `mailto:${contact.urlValue}`;
              }

              return (
                <a
                  key={contact.id}
                  href={hrefValue}
                  target={
                    platform.includes("phone") || platform.includes("email")
                      ? "_self"
                      : "_blank"
                  }
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 transition-colors font-medium text-sm shadow-sm"
                >
                  {contact.iconURL ? (
                    <img src={contact.iconURL} alt={contact.platformName} className="w-4 h-4 object-contain" />
                  ) : platform.includes("phone") ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-600">
                      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                    </svg>
                  ) : platform.includes("email") ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                      <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3z" />
                      <path d="M3 4l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400">
                      <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                      <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                    </svg>
                  )}
                  {contact.platformName}
                </a>
              );
            })}

          {/* ปุ่ม Resume */}
          {user.resumeURL && (
            <a
              href={user.resumeURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold text-sm shadow-md shadow-blue-500/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
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