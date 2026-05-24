import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';
import { authApi, publicApi } from '../../../../api/axios';
import type { Achievement, Project } from '../../../../types';

const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError(error) && error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // ดึง Achievements
        const achResponse = await authApi.get('/member/achievement');
        const achData = Array.isArray(achResponse.data) ? achResponse.data : achResponse.data?.achievements || [];
        setAchievements(achData);
        
        // ดึง Projects สำหรับ Dropdown
        const projResponse = await publicApi.get('/projects');
        const projData = Array.isArray(projResponse.data) ? projResponse.data : projResponse.data?.projects || [];
        setProjects(projData);
      } catch (err: unknown) {
        console.error("Error fetching data", err);
        setError(getErrorMessage(err, 'ไม่สามารถดึงข้อมูลได้'));
        setAchievements([]);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const addAchievement = async (newData: Partial<Achievement>) => {
    try {
      const response = await authApi.post('/member/achievement', {
        title: newData.title,
        category: newData.category,
        dateAchieved: newData.dateAchieved,
        projectID: newData.projectID !== undefined ? newData.projectID : null, // 🌟 ปรับให้รับค่า null ได้
      });
      
      const newAchievement = response.data?.achievement || response.data;
      setAchievements(prev => [newAchievement, ...prev]);
      return response.data;
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, 'เพิ่มข้อมูลความสำเร็จไม่สำเร็จ');
      console.error('Error adding achievement:', err);
      throw new Error(errorMsg);
    }
  };

  const updateAchievement = async (id: string, updatedData: Partial<Achievement>) => {
    try {
      const response = await authApi.put(`/member/achievement/${id}`, {
        title: updatedData.title,
        category: updatedData.category,
        dateAchieved: updatedData.dateAchieved,
        projectID: updatedData.projectID !== undefined ? updatedData.projectID : null, // 🌟 ปรับให้รับค่า null ได้
      });
      
      const updated = response.data?.achievement || response.data;
      setAchievements(prev => prev.map(item => item.id === id ? updated : item));
      return response.data;
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, 'แก้ไขข้อมูลความสำเร็จไม่สำเร็จ');
      console.error('Error updating achievement:', err);
      throw new Error(errorMsg);
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      await authApi.delete(`/member/achievement/${id}`);
      setAchievements(prev => prev.filter(item => item.id !== id));
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, 'ลบข้อมูลความสำเร็จไม่สำเร็จ');
      console.error('Error deleting achievement:', err);
      throw new Error(errorMsg);
    }
  };

  const saveAchievement = async (data: Partial<Achievement>) => {
    if (data.id) {
      return updateAchievement(data.id, data);
    } else {
      return addAchievement(data);
    }
  };

  return {
    achievements,
    projects,
    isLoading,
    error,
    deleteAchievement,
    saveAchievement
  };
};