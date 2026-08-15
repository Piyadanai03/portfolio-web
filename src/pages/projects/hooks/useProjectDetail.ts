import { useState, useEffect } from 'react';
import type { Project, ApiResponse } from '../../../types';
import { publicApi } from '../../../api/axios';

export const useProjectDetail = (id: string | undefined) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await publicApi.get<ApiResponse<Project>>(`/projects/${id}`);
        const res = response.data;
        setProject(res.data);
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