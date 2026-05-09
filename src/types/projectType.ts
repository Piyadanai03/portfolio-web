import type { Technology } from './techType';

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
  createdAt: string;
  // Relationships จากการ Preload
  images?: ProjectImage[];
  technologies?: Technology[];
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