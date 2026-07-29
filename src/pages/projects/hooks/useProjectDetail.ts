import { useState, useEffect } from 'react';
import type { Project } from '../../../types';
import { publicApi } from '../../../api/axios';

export const useProjectDetail = (id: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  // const [relatedAchievements, setRelatedAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);

        const response = await publicApi.get(`/projects/${id}`);
        setProject(response.data);

      } catch (error) {
        console.error('Fetch project detail error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [id]);

  return { project, loading };
};