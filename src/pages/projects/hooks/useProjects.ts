import { useState, useEffect } from 'react';
import type { Project } from '../../../types';
import { mockProjects } from '../../../data';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      // จำลองการโหลดข้อมูล 0.5 วินาที
      // (เมื่อต่อ API จริง ให้เปลี่ยนเป็น axios.get('/projects') ที่นี่)
      setTimeout(() => {
        setProjects(mockProjects);
        setLoading(false);
      }, 500);
    };

    fetchProjects();
  }, []);

  return { projects, loading };
};