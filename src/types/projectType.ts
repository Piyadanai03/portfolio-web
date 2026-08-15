import type { Technology } from './techType';
import type { Experience } from './resumeType';
import type { Achievement } from './achievementType';

export interface ProjectImage {
  id: string;
  projectID: string;
  imageURL: string;
  caption?: string;
}

export interface Project {
  id: string;
  userID: string;
  title: string;
  description: string;
  coverImageURL: string;
  githubURL: string;
  experienceID?: string; // ไอดีของประสบการณ์ทำงาน (optional)
  createdAt: string;
  // Relationships จากการ Preload
  images?: ProjectImage[];
  technologies?: Technology[];
  experience?: Experience; // ข้อมูลประสบการณ์ที่เชื่อมโยง
  achievements?: Achievement[];
}

export interface NewGalleryItem {
  file: File;
  preview: string;
  caption: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  githubURL: string;
}