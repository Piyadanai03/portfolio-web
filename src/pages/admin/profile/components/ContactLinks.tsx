import { useEffect } from 'react';
import type { Contact } from '../../../../types';

interface ContactLinksProps {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
}

// เพิ่มตัวเลือกให้ครอบคลุมมากขึ้น
const PLATFORM_OPTIONS = [
  { name: 'GitHub', defaultIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'LinkedIn', defaultIconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg' },
  { name: 'Facebook', defaultIconURL: '' },
  { name: 'Instagram', defaultIconURL: '' },
  { name: 'X / Twitter', defaultIconURL: '' },
  { name: 'TikTok', defaultIconURL: '' },
  { name: 'YouTube', defaultIconURL: '' },
  { name: 'Fastwork', defaultIconURL: '' },
  { name: 'Line', defaultIconURL: '' },
  { name: 'Phone', defaultIconURL: '' },
  { name: 'Email', defaultIconURL: '' },
  { name: 'Website', defaultIconURL: '' },
];

export const ContactLinks = ({ contacts, setContacts }: ContactLinksProps) => {
  
  // 🌟 4. Auto-Empty State: ถ้าไม่มีข้อมูลเลย ให้สร้างช่องว่างรอไว้ 1 ช่องทันที
  useEffect(() => {
    if (contacts.length === 0) {
      setContacts([{ 
        id: `new-${Date.now()}`,
        userID: "", 
        platformName: "", // ว่างไว้รอให้เลือก
        urlValue: "", 
        iconURL: "", 
        isActive: true 
      } as Contact]);
    }
  }, [contacts.length, setContacts]);

  // 🌟 3. กดเพิ่ม ให้ขึ้นช่องว่างๆ
  const addContact = () => {
    setContacts([
      ...contacts, 
      { 
        id: `new-${Date.now()}`,
        userID: "", 
        platformName: "", // เริ่มด้วยช่องว่าง
        urlValue: "", 
        iconURL: "", 
        isActive: true 
      } as Contact
    ]);
  };

  const updateContact = (index: number, field: keyof Contact, value: string | boolean) => {
    const updated = [...contacts];
    updated[index] = { ...updated[index], [field]: value };

    // ดึงไอคอนตั้งต้นอัตโนมัติเมื่อเลือกแพลตฟอร์มจาก Dropdown
    if (field === 'platformName') {
      const selectedPlatform = PLATFORM_OPTIONS.find(p => p.name === value);
      if (selectedPlatform) {
        updated[index].iconURL = selectedPlatform.defaultIconURL;
      } else if (value === "Other") {
        updated[index].iconURL = ""; // เคลียร์รูปถ้าเลือกอื่นๆ
      }
    }
    setContacts(updated);
  };

  // 🌟 2. ฟังก์ชันเลื่อนตำแหน่งลำดับ (ขึ้น/ลง)
  const moveContact = (index: number, direction: 'up' | 'down') => {
    const updated = [...contacts];
    if (direction === 'up' && index > 0) {
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      setContacts(updated);
    } else if (direction === 'down' && index < updated.length - 1) {
      [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
      setContacts(updated);
    }
  };

  const handleIconUpload = (index: number, file: File | undefined) => {
    if (!file) return;

    if (file.size > 100 * 1024) {
      alert("⚠️ ไฟล์ Icon มีขนาดใหญ่เกินไป!\n\nกรุณาเลือกไฟล์ขนาดไม่เกิน 100KB");
      return; 
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      updateContact(index, 'iconURL', base64String);
    };
    reader.readAsDataURL(file);
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-fade-in">
      <div className="mb-6 flex justify-between items-end border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-1">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm">📞</span>
            Contact & Social Links
          </h3>
          <p className="text-sm text-slate-500">จัดการช่องทางการติดต่อ เบอร์โทร อีเมล และโซเชียลมีเดีย</p>
        </div>
        <button type="button" onClick={addContact} className="text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/30">
          + Add Contact
        </button>
      </div>

      <div className="space-y-6">
        {contacts.map((contact, index) => {
          
          // ตรวจสอบว่า Platform ที่เก็บใน DB เป็นแบบพิมพ์เองหรือเปล่า
          const isStandardPlatform = PLATFORM_OPTIONS.some(p => p.name === contact.platformName);
          const isCustom = contact.platformName !== "" && !isStandardPlatform;

          return (
            <div key={contact.id || index} className={`flex flex-col gap-4 p-5 rounded-2xl border transition-all ${contact.isActive ? 'bg-slate-50 border-slate-200 hover:border-emerald-300' : 'bg-slate-100/50 border-slate-200 opacity-60'}`}>
              
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                
                {/* ปุ่มเปิด/ปิด การมองเห็น */}
                <label className="flex items-center cursor-pointer shrink-0" title={contact.isActive ? "กำลังแสดงผล" : "ซ่อนอยู่"}>
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={contact.isActive} onChange={(e) => updateContact(index, 'isActive', e.target.checked)} />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${contact.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${contact.isActive ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                </label>

                {/* 🌟 1. ระบบเลือกแพลตฟอร์มแบบใหม่ (Select + Input กรณีพิมพ์เอง) */}
                <div className="w-full sm:w-1/3 flex flex-col gap-2">
                  <select 
                    value={contact.platformName === "" ? "" : (isCustom || contact.platformName === "Other" ? "Other" : contact.platformName)}
                    onChange={(e) => {
                      if (e.target.value === "Other") {
                        updateContact(index, 'platformName', 'Other'); // เปิดโหมดพิมพ์เอง
                      } else {
                        updateContact(index, 'platformName', e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white font-bold text-slate-700"
                  >
                    <option value="" disabled>-- เลือกแพลตฟอร์ม --</option>
                    {PLATFORM_OPTIONS.map(opt => <option key={opt.name} value={opt.name}>{opt.name}</option>)}
                    <option value="Other">อื่นๆ (พิมพ์เอง)</option>
                  </select>

                  {/* ถ้าเลือก "อื่นๆ" ให้โชว์ช่องกรอกชื่อ */}
                  {(isCustom || contact.platformName === "Other") && (
                    <input 
                      type="text" 
                      value={contact.platformName === "Other" ? "" : contact.platformName}
                      onChange={(e) => updateContact(index, 'platformName', e.target.value)}
                      placeholder="ระบุชื่อแพลตฟอร์ม..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                      autoFocus={contact.platformName === "Other"}
                    />
                  )}
                </div>

                {/* ช่องกรอก URL หรือ เบอร์โทร */}
                <div className="w-full sm:flex-1 flex flex-wrap sm:flex-nowrap gap-2">
                  <input 
                    type="text" 
                    value={contact.urlValue} 
                    onChange={(e) => updateContact(index, 'urlValue', e.target.value)}
                    placeholder="https://... หรือ เบอร์โทร / อีเมล"
                    className="flex-1 w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                  
                  {/* 🌟 2. ปุ่มจัดการ เลื่อนขึ้น/ลง/ลบ */}
                  <div className="flex gap-1 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                    <button 
                      type="button" 
                      onClick={() => moveContact(index, 'up')}
                      disabled={index === 0}
                      className="p-2 bg-white border border-slate-300 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="เลื่อนขึ้น"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => moveContact(index, 'down')}
                      disabled={index === contacts.length - 1}
                      className="p-2 bg-white border border-slate-300 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="เลื่อนลง"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => removeContact(index)}
                      className="p-2 bg-white border border-slate-300 text-slate-400 hover:text-red-500 hover:border-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="ลบทิ้ง"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* การจัดการ Icon */}
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center pl-0 sm:pl-[3.25rem]">
                <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {contact.iconURL ? (
                    <img src={contact.iconURL} alt={contact.platformName} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-[10px] font-black text-slate-400 uppercase text-center leading-tight tracking-tighter break-all px-1">
                      {contact.platformName ? contact.platformName.substring(0, 4) : "ICON"}
                    </span>
                  )}
                </div>

                <div className="w-full sm:flex-1 relative">
                  <input 
                    type="url" 
                    value={contact.iconURL} 
                    onChange={(e) => updateContact(index, 'iconURL', e.target.value)}
                    placeholder="วางลิงก์รูปภาพ Icon..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                <span className="text-xs text-slate-400 font-bold hidden sm:block">หรือ</span>

                <label className="cursor-pointer bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors w-full sm:w-auto text-center shrink-0">
                  📁 เลือกไฟล์จากเครื่อง
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleIconUpload(index, e.target.files?.[0])}
                  />
                </label>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};