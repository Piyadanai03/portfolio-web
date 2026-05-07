import { useState } from "react"; // 🌟 เปลี่ยนจาก useEffect เป็น useState
import type { Contact } from "../../../../types";

interface ContactLinksProps {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
}

const PLATFORM_OPTIONS = [
  {
    name: "GitHub",
    defaultIconURL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "LinkedIn",
    defaultIconURL:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
  { name: "Facebook", defaultIconURL: "" },
  { name: "Instagram", defaultIconURL: "" },
  { name: "X / Twitter", defaultIconURL: "" },
  { name: "TikTok", defaultIconURL: "" },
  { name: "YouTube", defaultIconURL: "" },
  { name: "Fastwork", defaultIconURL: "" },
  { name: "Line", defaultIconURL: "" },
  { name: "Phone", defaultIconURL: "" },
  { name: "Email", defaultIconURL: "" },
  { name: "Website", defaultIconURL: "" },
];

export const ContactLinks = ({ contacts, setContacts }: ContactLinksProps) => {
  // 🌟 State สำหรับควบคุมการเปิด/ปิด Popup และเก็บข้อมูลชั่วคราว
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draftContact, setDraftContact] = useState<Contact>({
    id: "",
    platformName: "",
    urlValue: "",
    iconURL: "",
    isActive: true,
  });

  // 🌟 ฟังก์ชันเปิด Popup และเคลียร์ฟอร์มให้ว่าง
  const openAddModal = () => {
    setDraftContact({
      id: crypto.randomUUID(),
      platformName: "",
      urlValue: "",
      iconURL: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  // 🌟 ฟังก์ชันกดยืนยันเพิ่มข้อมูลจาก Popup
  const confirmAddContact = () => {
    if (!draftContact.platformName || !draftContact.urlValue) {
      alert("กรุณาเลือกแพลตฟอร์มและใส่ URL/ข้อมูลติดต่อให้ครบถ้วน");
      return;
    }
    setContacts([...contacts, draftContact]);
    setIsModalOpen(false); // ปิด popup
  };

  // 🌟 จัดการข้อมูลชั่วคราวใน Popup
  const updateDraftContact = (
    field: keyof Contact,
    value: string | boolean,
  ) => {
    setDraftContact((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "platformName") {
        const selectedPlatform = PLATFORM_OPTIONS.find((p) => p.name === value);
        if (selectedPlatform) {
          updated.iconURL = selectedPlatform.defaultIconURL;
        } else if (value === "Other") {
          updated.iconURL = "";
        }
      }
      return updated;
    });
  };

  const handleDraftIconUpload = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 100 * 1024) {
      alert(
        "⚠️ ไฟล์ Icon มีขนาดใหญ่เกินไป!\n\nกรุณาเลือกไฟล์ขนาดไม่เกิน 100KB",
      );
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updateDraftContact("iconURL", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ==========================================
  // ฟังก์ชันจัดการลิสต์เดิม (ทำงานตอน Edit Inline)
  // ==========================================
  const updateContact = (
    index: number,
    field: keyof Contact,
    value: string | boolean,
  ) => {
    const updated = [...contacts];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "platformName") {
      const selectedPlatform = PLATFORM_OPTIONS.find((p) => p.name === value);
      if (selectedPlatform) {
        updated[index].iconURL = selectedPlatform.defaultIconURL;
      } else if (value === "Other") {
        updated[index].iconURL = "";
      }
    }
    setContacts(updated);
  };

  const moveContact = (index: number, direction: "up" | "down") => {
    const updated = [...contacts];
    if (direction === "up" && index > 0) {
      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];
      setContacts(updated);
    } else if (direction === "down" && index < updated.length - 1) {
      [updated[index + 1], updated[index]] = [
        updated[index],
        updated[index + 1],
      ];
      setContacts(updated);
    }
  };

  const handleIconUpload = (index: number, file: File | undefined) => {
    if (!file) return;
    if (file.size > 100 * 1024) {
      alert(
        "⚠️ ไฟล์ Icon มีขนาดใหญ่เกินไป!\n\nกรุณาเลือกไฟล์ขนาดไม่เกิน 100KB",
      );
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updateContact(index, "iconURL", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeContact = (index: number) => {
    if (window.confirm("คุณต้องการลบช่องทางการติดต่อนี้ใช่หรือไม่?")) {
      setContacts(contacts.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-fade-in relative">
      <div className="mb-6 flex justify-between items-end border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-1">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm">
              📞
            </span>
            Contact & Social Links
          </h3>
          <p className="text-sm text-slate-500">
            จัดการช่องทางการติดต่อ เบอร์โทร อีเมล และโซเชียลมีเดีย
          </p>
        </div>
        {/* 🌟 เปลี่ยนปุ่มให้เรียกฟังก์ชันเปิด Modal แทน */}
        <button
          type="button"
          onClick={openAddModal}
          className="text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/30"
        >
          + Add Contact
        </button>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 font-medium">ยังไม่มีช่องทางการติดต่อ</p>
          <button
            type="button"
            onClick={openAddModal}
            className="mt-3 text-sm font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
          >
            เพิ่มช่องทางการติดต่อเลย
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {contacts.map((contact, index) => {
            const isStandardPlatform = PLATFORM_OPTIONS.some(
              (p) => p.name === contact.platformName,
            );
            const isCustom = contact.platformName !== "" && !isStandardPlatform;

            return (
              <div
                key={contact.id || index}
                className={`flex flex-col gap-4 p-5 rounded-2xl border transition-all ${contact.isActive ? "bg-slate-50 border-slate-200 hover:border-emerald-300" : "bg-slate-100/50 border-slate-200 opacity-60"}`}
              >
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <label
                    className="flex items-center cursor-pointer shrink-0"
                    title={contact.isActive ? "กำลังแสดงผล" : "ซ่อนอยู่"}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={contact.isActive}
                        onChange={(e) =>
                          updateContact(index, "isActive", e.target.checked)
                        }
                      />
                      <div
                        className={`block w-10 h-6 rounded-full transition-colors ${contact.isActive ? "bg-emerald-500" : "bg-slate-300"}`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${contact.isActive ? "transform translate-x-4" : ""}`}
                      ></div>
                    </div>
                  </label>

                  <div className="w-full sm:w-1/3 flex flex-col gap-2">
                    <select
                      value={
                        contact.platformName === ""
                          ? ""
                          : isCustom || contact.platformName === "Other"
                            ? "Other"
                            : contact.platformName
                      }
                      onChange={(e) => {
                        if (e.target.value === "Other") {
                          updateContact(index, "platformName", "Other");
                        } else {
                          updateContact(index, "platformName", e.target.value);
                        }
                      }}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white font-bold text-slate-700"
                    >
                      <option value="" disabled>
                        -- เลือกแพลตฟอร์ม --
                      </option>
                      {PLATFORM_OPTIONS.map((opt) => (
                        <option key={opt.name} value={opt.name}>
                          {opt.name}
                        </option>
                      ))}
                      <option value="Other">อื่นๆ (พิมพ์เอง)</option>
                    </select>

                    {(isCustom || contact.platformName === "Other") && (
                      <input
                        type="text"
                        value={
                          contact.platformName === "Other"
                            ? ""
                            : contact.platformName
                        }
                        onChange={(e) =>
                          updateContact(index, "platformName", e.target.value)
                        }
                        placeholder="ระบุชื่อแพลตฟอร์ม..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white text-sm"
                        autoFocus={contact.platformName === "Other"}
                      />
                    )}
                  </div>

                  <div className="w-full sm:flex-1 flex flex-wrap sm:flex-nowrap gap-2">
                    <input
                      type="text"
                      value={contact.urlValue}
                      onChange={(e) =>
                        updateContact(index, "urlValue", e.target.value)
                      }
                      placeholder="https://... หรือ เบอร์โทร / อีเมล"
                      className="flex-1 w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />

                    <div className="flex gap-1 shrink-0 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                      <button
                        type="button"
                        onClick={() => moveContact(index, "up")}
                        disabled={index === 0}
                        className="p-2 bg-white border border-slate-300 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="เลื่อนขึ้น"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => moveContact(index, "down")}
                        disabled={index === contacts.length - 1}
                        className="p-2 bg-white border border-slate-300 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="เลื่อนลง"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeContact(index)}
                        className="p-2 bg-white border border-slate-300 text-slate-400 hover:text-red-500 hover:border-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="ลบทิ้ง"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center pl-0 sm:pl-[3.25rem]">
                  <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    {contact.iconURL ? (
                      <img
                        src={contact.iconURL}
                        alt={contact.platformName}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-[10px] font-black text-slate-400 uppercase text-center leading-tight tracking-tighter break-all px-1">
                        {contact.platformName
                          ? contact.platformName.substring(0, 4)
                          : "ICON"}
                      </span>
                    )}
                  </div>

                  <div className="w-full sm:flex-1 relative">
                    <input
                      type="url"
                      value={contact.iconURL}
                      onChange={(e) =>
                        updateContact(index, "iconURL", e.target.value)
                      }
                      placeholder="วางลิงก์รูปภาพ Icon..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-bold hidden sm:block">
                    หรือ
                  </span>
                  <label className="cursor-pointer bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors w-full sm:w-auto text-center shrink-0">
                    📁 เลือกไฟล์จากเครื่อง
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleIconUpload(index, e.target.files?.[0])
                      }
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================== */}
      {/* 🌟 Popup Modal สำหรับเพิ่ม Contact ใหม่ */}
      {/* ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <span className="text-emerald-500">➕</span>{" "}
                เพิ่มช่องทางการติดต่อ
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-red-500 font-black text-xl transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  แพลตฟอร์ม
                </label>
                <select
                  value={
                    PLATFORM_OPTIONS.some(
                      (p) => p.name === draftContact.platformName,
                    )
                      ? draftContact.platformName
                      : draftContact.platformName !== ""
                        ? "Other"
                        : ""
                  }
                  onChange={(e) =>
                    updateDraftContact("platformName", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white font-bold text-slate-700"
                >
                  <option value="" disabled>
                    -- เลือกแพลตฟอร์ม --
                  </option>
                  {PLATFORM_OPTIONS.map((opt) => (
                    <option key={opt.name} value={opt.name}>
                      {opt.name}
                    </option>
                  ))}
                  <option value="Other">อื่นๆ (พิมพ์เอง)</option>
                </select>

                {(!PLATFORM_OPTIONS.some(
                  (p) => p.name === draftContact.platformName,
                ) &&
                  draftContact.platformName !== "") ||
                draftContact.platformName === "Other" ? (
                  <input
                    type="text"
                    value={
                      draftContact.platformName === "Other"
                        ? ""
                        : draftContact.platformName
                    }
                    onChange={(e) =>
                      updateDraftContact("platformName", e.target.value)
                    }
                    placeholder="ระบุชื่อแพลตฟอร์ม..."
                    className="w-full mt-3 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  ลิงก์ / เบอร์โทร / อีเมล
                </label>
                <input
                  type="text"
                  value={draftContact.urlValue}
                  onChange={(e) =>
                    updateDraftContact("urlValue", e.target.value)
                  }
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  ไอคอน (Icon)
                </label>
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                    {draftContact.iconURL ? (
                      <img
                        src={draftContact.iconURL}
                        alt="Icon preview"
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-xs font-black text-slate-300">
                        ICON
                      </span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="url"
                      value={draftContact.iconURL}
                      onChange={(e) =>
                        updateDraftContact("iconURL", e.target.value)
                      }
                      placeholder="วางลิงก์รูปภาพ Icon..."
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-bold">
                        หรือ
                      </span>
                      <label className="cursor-pointer bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold transition-colors">
                        📁 อัปโหลดไฟล์รูปภาพ (ไม่เกิน 100KB)
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleDraftIconUpload(e.target.files?.[0])
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={confirmAddContact}
                className="px-6 py-2.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all"
              >
                ยืนยันการเพิ่ม
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
