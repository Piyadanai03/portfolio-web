import { useState, useEffect } from 'react';
import type { Project } from '../../../types';
import { mockProjects } from '../../../data';

export const useProjectDetail = (id: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setLoading(true);
      // จำลองการโหลด 0.5 วินาที
      // (ตอนต่อ API จริง จะเป็น axios.get(`/projects/${id}`))
      setTimeout(() => {
        const foundProject = mockProjects.find((p) => p.id === id);
        setProject(foundProject || null);
        setLoading(false);
      }, 500);
    };

    fetchDetail();
  }, [id]);

  return { project, loading };
};