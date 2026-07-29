import { useState } from "react"; // 🌟 เพิ่ม useState
import { Link } from "react-router-dom";
import { useProjectForm } from "./hooks/useProjectForm";

const AdminProjectForm = () => {
  const {
    isEditMode, formData, previewCover, isLoading, isFetching,
    existingGallery, newGallery,
    availableTechs, selectedTechIds,
    availableExperiences, selectedExperienceId,
    handleChange, handleCoverChange, removeCover,
    handleAddGalleryImages, handleGalleryCaptionChange,
    handleExistingGalleryCaptionChange,
    removeNewGalleryImage, removeExistingGalleryImage,
    addTech, removeTech, // 🌟 ดึงฟังก์ชัน Add/Remove มาใช้
    handleSubmit,
    setSelectedExperienceId
  } = useProjectForm();

  // 🌟 State สำหรับระบบค้นหาใน Dropdown
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (isFetching) {
    return <div className="p-8 text-center text-slate-500 font-medium">กำลังดึงข้อมูล...</div>;
  }

  // 🌟 ตัวกรอง Tech ที่ยังไม่ได้เลือก และตรงกับคำค้นหา
  const unselectedTechs = availableTechs.filter(tech => !selectedTechIds.includes(tech.id));
  const filteredTechs = unselectedTechs.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/projects" className="p-2 bg-white text-slate-500 hover:text-slate-900 rounded-xl border border-slate-200 transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900">{isEditMode ? "Edit Project" : "Add New Project"}</h1>
          <p className="text-slate-500">กรอกรายละเอียดผลงานของคุณ</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-fade-in">

        {/* ชื่อผลงาน & คำอธิบาย */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">Project Title (ชื่อผลงาน) *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors" placeholder="เช่น Research Ethics Tracking System" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">Description (คำอธิบาย) *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors resize-y" placeholder="อธิบายว่าโปรเจกต์นี้ทำอะไร..." />
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* 🌟 เลือกประสบการณ์ทำงาน */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Work Experience (ประสบการณ์ที่เกี่ยวข้อง)</label>
          <p className="text-sm text-slate-500 mb-3">เลือกประสบการณ์ทำงานที่โปรเจกต์นี้เกี่ยวข้อง (ไม่บังคับ)</p>
          <select 
            value={selectedExperienceId} 
            onChange={(e) => setSelectedExperienceId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors"
          >
            <option value="">-- ไม่เลือกประสบการณ์ --</option>
            {availableExperiences.map((exp) => (
              <option key={exp.id} value={exp.id}>
                {exp.jobTitle} @ {exp.company}
              </option>
            ))}
          </select>
        </div>

        <hr className="border-slate-100" />

        {/* 🌟 1. โซนเลือก Tech Stack แบบ ค้นหาและลบออกได้ */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-800">Technologies Used (เทคโนโลยีที่ใช้)</h3>
            <p className="text-sm text-slate-500">ค้นหาและเลือกเทคโนโลยีที่ใช้ในโปรเจกต์นี้</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">

            {/* โชว์ Tag ที่ถูกเลือก (กดกากบาทลบได้) */}
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedTechIds.map((techId) => {
                const tech = availableTechs.find((t) => t.id === techId);
                if (!tech) return null;
                return (
                  <span key={tech.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-lg border border-blue-200 shadow-sm animate-fade-in">
                    {tech.iconURL && !tech.iconURL.includes("placehold") && (
                      <img src={tech.iconURL} alt={tech.name} className="w-4 h-4 object-contain" />
                    )}
                    {tech.name}
                    <button
                      type="button"
                      onClick={() => removeTech(tech.id)}
                      className="ml-1 p-0.5 text-blue-400 hover:text-red-500 hover:bg-white rounded-md transition-colors"
                      title="ลบออก"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                  </span>
                );
              })}
              {selectedTechIds.length === 0 && (
                <span className="text-sm text-slate-400 py-1.5">ยังไม่ได้เลือกเทคโนโลยี</span>
              )}
            </div>

            {/* ช่องค้นหา + Dropdown */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setIsDropdownOpen(false)}
                placeholder="🔍 พิมพ์ค้นหาเทคโนโลยีเพื่อเพิ่ม..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white transition-colors"
              />

              {/* รายการ Dropdown ที่โชว์เมื่อกำลังพิมพ์ หรือ Focus ช่องค้นหา */}
              {isDropdownOpen && filteredTechs.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-56 overflow-y-auto">
                  {filteredTechs.map((tech) => (
                    <div
                      key={tech.id}
                      // ใช้ onMouseDown เพื่อให้มันทำงานก่อนที่ Input จะเสีย Focus
                      onMouseDown={(e) => {
                        e.preventDefault();
                        addTech(tech.id);
                        setSearchTerm(""); // เคลียร์ช่องค้นหา
                        setIsDropdownOpen(false); // ปิด Dropdown
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors"
                    >
                      {tech.iconURL && !tech.iconURL.includes("placehold") ? (
                        <img src={tech.iconURL} alt={tech.name} className="w-5 h-5 object-contain" />
                      ) : (
                        <div className="w-5 h-5 bg-slate-200 rounded-md"></div>
                      )}
                      <span className="font-medium text-slate-700">{tech.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* กรณีพิมพ์หาแล้วไม่เจอ */}
              {isDropdownOpen && searchTerm !== "" && filteredTechs.length === 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl p-4 text-center text-slate-500 text-sm">
                  ไม่พบเทคโนโลยีที่คุณค้นหา
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* 2. โซนรูปหน้าปก (Cover Image) */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4">1. Cover Image (รูปภาพหน้าปก)</h3>
          {previewCover ? (
            <div className="relative w-full sm:w-1/2 h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
              <img src={previewCover} alt="Cover Preview" className="w-full h-full object-cover" />
              <button type="button" onClick={removeCover} className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-40 px-4 transition bg-slate-50 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer hover:border-blue-400 hover:bg-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <span className="font-medium text-slate-500 text-sm">คลิกเพื่อเลือกภาพหน้าปก</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
            </label>
          )}
        </div>

        {/* 3. โซนแกลลอรีรูปภาพ (Project Images) */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">2. Gallery Images (รูปภาพประกอบ)</h3>
              <p className="text-sm text-slate-500">เพิ่มรูปภาพเพิ่มเติม พร้อมใส่คำบรรยาย (Caption)</p>
            </div>
            <label className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
              + Add Images
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleAddGalleryImages} />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* รูปเก่า */}
            {existingGallery.map((img) => (
              <div key={img.id} className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col gap-2 relative group transition-all">
                <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-200 border border-slate-200">
                  <img src={img.imageURL} alt="Existing" className="w-full h-full object-cover" />
                </div>
                <textarea
                  value={img.caption || ""}
                  onChange={(e) => handleExistingGalleryCaptionChange(img.id, e.target.value)}
                  rows={1}
                  className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-slate-700 outline-none transition-all duration-300 resize-none h-[34px] focus:h-[80px] overflow-hidden focus:overflow-y-auto"
                  placeholder="เพิ่มคำบรรยาย (Caption)..."
                />
                <button type="button" onClick={() => removeExistingGalleryImage(img.id)} className="absolute top-4 right-4 p-1.5 bg-black/60 text-white rounded-lg hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}

            {/* รูปใหม่ */}
            {newGallery.map((item, index) => (
              <div key={index} className="bg-blue-50/40 p-2 rounded-xl border border-blue-200 flex flex-col gap-2 relative animate-fade-in">
                <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-200 border border-blue-100">
                  <img src={item.preview} alt={`New ${index}`} className="w-full h-full object-cover" />
                </div>
                <textarea
                  value={item.caption}
                  onChange={(e) => handleGalleryCaptionChange(index, e.target.value)}
                  rows={1}
                  className="w-full px-3 py-1.5 text-sm rounded border border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-slate-700 outline-none transition-all duration-300 resize-none h-[34px] focus:h-[80px] overflow-hidden focus:overflow-y-auto"
                  placeholder="เพิ่มคำบรรยาย (Caption)..."
                />
                <button type="button" onClick={() => removeNewGalleryImage(index)} className="absolute top-4 right-4 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}

            {existingGallery.length === 0 && newGallery.length === 0 && (
              <div className="col-span-full py-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                ยังไม่มีรูปภาพแกลลอรี กดปุ่ม "+ Add Images" ด้านบนเพื่อเพิ่มรูป
              </div>
            )}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* โซนลิงก์อื่นๆ */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">GitHub URL (ลิงก์โค้ด)</label>
          <input type="url" name="githubURL" value={formData.githubURL} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors" placeholder="https://github.com/..." />
        </div>

        {/* 🌟 ปุ่มบันทึกอัปเดตสไตล์ให้ตรงกับหน้าอื่น */}
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
          <Link to="/admin/projects" className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2 hover:-translate-y-0.5"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : null}
            {isLoading ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectForm;