import { useState, useEffect } from 'react';
import type { Project, ApiResponse } from '../../../types';
import { publicApi } from '../../../api/axios';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await publicApi.get<ApiResponse<Project[]>>('/projects');
        const res = response.data;

        // เช็ค success และ fallback เป็น array เปล่าถ้าไม่มีข้อมูล
        if (res && res.success && Array.isArray(res.data)) {
          setProjects(res.data);
        } else {
          setProjects([]);
        }

      } catch (error) {
        console.error('Fetch projects error:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading };
};