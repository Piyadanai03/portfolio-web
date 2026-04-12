import { useState, useEffect } from 'react';
import type { Project, Achievement } from '../../../types';
import { mockProjects, mockAchievements } from '../../../data';

export const useProjectDetail = (id: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [relatedAchievements, setRelatedAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setLoading(true);
      setTimeout(() => {
        const foundProject = mockProjects.find((p) => p.id === id);
        // 🔎 กรองหาเฉพาะรางวัลที่มี projectID ตรงกับหน้านี้
        const awards = mockAchievements.filter((a) => a.projectID === id);
        
        setProject(foundProject || null);
        setRelatedAchievements(awards);
        setLoading(false);
      }, 500);
    };

    fetchDetail();
  }, [id]);

  return { project, relatedAchievements, loading };
};