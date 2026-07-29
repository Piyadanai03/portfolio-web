import type { Project } from './projectType';
import type { Experience, Study } from './resumeType'; 
import type { Contact } from './contactType';

export interface User {
  id: string;
  username: string;
  fullName: string;
  position: string;
  bioText: string;
  address: string;
  profileImageURL: string;
  resumeURL: string;
  
  // Relationships (ใช้เครื่องหมาย ? เพราะเราจะโหลดมาเมื่อใช้ Preload เท่านั้น)
  projects?: Project[];
  experiences?: Experience[];
  studies?: Study[];
  contacts?: Contact[];
  createdAt?: string; 
}