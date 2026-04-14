import { useState, useEffect } from 'react';
import type { Project } from '../../../../types';
import { mockProjects } from '../../../../data/project';

export const useProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // จำลองการดึงข้อมูลจาก API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        setProjects(mockProjects);
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const deleteProject = async (id: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโปรเจกต์นี้?')) {
      // จำลองการลบ (ของจริงยิง API axios.delete)
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  return { projects, isLoading, deleteProject };
};