import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Technology } from '../../../../types';
import { authApi } from '../../../../api/axios';

export const useTech = () => {
  const [techList, setTechList] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (
    error: unknown,
    defaultMessage: string
  ): string => {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.error ?? defaultMessage;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return defaultMessage;
  };

  // ดึงข้อมูล
  useEffect(() => {
    const fetchTech = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await authApi.get('/member/tech');
        setTechList(response.data || []);
      } catch (error: unknown) {
        console.error('Error fetching technologies', error);
        setError(getErrorMessage(error, 'ไม่สามารถดึงข้อมูลได้'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTech();
  }, []);

  // เพิ่มข้อมูล
  const addTech = async (
    newTech: Omit<Technology, 'id'>,
    iconFile?: File
  ) => {
    try {
      const formData = new FormData();

      formData.append('name', newTech.name);
      formData.append('category', newTech.category);

      if (newTech.iconURL) {
        formData.append('iconURL', newTech.iconURL);
      }

      if (iconFile) {
        formData.append('icon', iconFile);
      }

      const response = await authApi.post('/member/tech', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTechList((prev) => [response.data.technology, ...prev]);
    } catch (error: unknown) {
      console.error('Error adding technology', error);
      setError(getErrorMessage(error, 'ไม่สามารถเพิ่มข้อมูลได้'));
      throw error;
    }
  };

  // แก้ไขข้อมูล
  const updateTech = async (
    id: string,
    updatedData: Partial<Technology>,
    iconFile?: File
  ) => {
    try {
      const formData = new FormData();

      if (updatedData.name) {
        formData.append('name', updatedData.name);
      }

      if (updatedData.category) {
        formData.append('category', updatedData.category);
      }

      if (updatedData.iconURL) {
        formData.append('iconURL', updatedData.iconURL);
      }

      if (iconFile) {
        formData.append('icon', iconFile);
      }

      const response = await authApi.put(
        `/member/tech/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setTechList((prev) =>
        prev.map((tech) =>
          tech.id === id ? response.data.technology : tech
        )
      );
    } catch (error: unknown) {
      console.error('Error updating technology', error);
      setError(getErrorMessage(error, 'ไม่สามารถแก้ไขข้อมูลได้'));
      throw error;
    }
  };

  // ลบข้อมูล
  const deleteTech = async (id: string) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเทคโนโลยีนี้?')) {
      return;
    }

    try {
      await authApi.delete(`/member/tech/${id}`);

      setTechList((prev) => prev.filter((tech) => tech.id !== id));
    } catch (error: unknown) {
      console.error('Error deleting technology', error);
      setError(getErrorMessage(error, 'ไม่สามารถลบข้อมูลได้'));
      throw error;
    }
  };

  return {
    techList,
    isLoading,
    error,
    addTech,
    updateTech,
    deleteTech,
  };
};