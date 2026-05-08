import { useState, useEffect } from 'react';
import type { Project } from '../../../../types';
import { publicApi, authApi } from '../../../../api/axios';

export const useProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await publicApi.get('/projects'); 
        setProjects(response.data);
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
      try {
        await authApi.delete(`/member/projects/${id}`);
        setProjects(prev => prev.filter(p => p.id !== id));
        alert('ลบโปรเจกต์เรียบร้อยแล้ว');
      } catch (error) {
        console.error("Error deleting project", error);
        alert('เกิดข้อผิดพลาดในการลบโปรเจกต์');
      }
    }
  };

  return { projects, isLoading, deleteProject };
};