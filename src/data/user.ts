import type { User } from '../types';
import { mockProjects } from './project';
import { mockExperiences, mockStudies } from './resume';
import { mockContacts, USER_ID } from './contact';

export const mockUser: User = {
  id: USER_ID,
  username: "piyadanai_k",
  fullName: "Piyadanai Khlongklang",
  bioText: "Entry-level Full Stack Software Developer passionate about modern runtimes, layered architecture, and system observability.",
  address: "Buriram, Thailand",
  profileImageURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Piyadanai",
  resumeURL: "https://example.com/resume.pdf",
  createdAt: "2025-10-01T00:00:00Z",
  
  // ข้อมูลที่จำลองการ Preload จาก Database
  projects: mockProjects,
  experiences: mockExperiences,
  studies: mockStudies,
  contacts: mockContacts
};