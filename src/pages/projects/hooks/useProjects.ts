import { useState, useEffect } from 'react';
import type { Project } from '../../../types';
import { publicApi } from '../../../api/axios';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await publicApi.get('/projects');

        setProjects(response.data);

      } catch (error) {
        console.error('Fetch projects error:', error);

      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading };
};