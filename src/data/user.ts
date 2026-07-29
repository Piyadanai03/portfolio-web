import type { User } from '../types';
import { mockProjects } from './project';
import { mockExperiences, mockStudies } from './resume';
import { mockContacts, USER_ID } from './contact';

export const mockUser: User = {
  id: USER_ID,
  username: "piyadanai.k2546@gmail.com",
  fullName: "Piyadanai Khlongklang",
  bioText: "Entry-level Full Stack Software Developer passionate about modern runtimes, layered architecture, and system observability. \ntel: 061-1234-5678 \nemail: piyadanai.k2546@gmail.com",
  address: "17 หมู่ 1 ต.ตูมใหญ่ อ.คูเมือง จ.บุรีรัมย์, Buriram, Thailand",
  position: "Full Stack Developer",
  profileImageURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Piyadanai",
  resumeURL: "https://example.com/resume.pdf",
  createdAt: "2025-10-01T00:00:00Z",
  
  // ข้อมูลที่จำลองการ Preload จาก Database
  projects: mockProjects,
  experiences: mockExperiences,
  studies: mockStudies,
  contacts: mockContacts
};