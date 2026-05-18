import { useState, useEffect } from 'react';
import type { Technology } from '../../../../types';
import { authApi } from '../../../../api/axios';

export const useTech = () => {
  const [techList, setTechList] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ดึงข้อมูล
  useEffect(() => {
    const fetchTech = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await authApi.get('/member/tech');
        setTechList(response.data || []);
      } catch (error: any) {
        console.error("Error fetching technologies", error);
        setError(error.response?.data?.error || 'ไม่สามารถดึงข้อมูลได้');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTech();
  }, []);

  // เพิ่มข้อมูล
  const addTech = async (newTech: Omit<Technology, 'id'>, iconFile?: File) => {
    try {
      const formData = new FormData();
      formData.append('name', newTech.name);
      formData.append('category', newTech.category);
      
      if (iconFile) {
        formData.append('icon', iconFile);
      }

      const response = await authApi.post('/member/tech', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setTechList(prev => [response.data.technology, ...prev]);
    } catch (error: any) {
      console.error("Error adding technology", error);
      setError(error.response?.data?.error || 'ไม่สามารถเพิ่มข้อมูลได้');
      throw error;
    }
  };

  // แก้ไขข้อมูล
  const updateTech = async (id: string, updatedData: Partial<Technology>, iconFile?: File) => {
    try {
      const formData = new FormData();
      if (updatedData.name) formData.append('name', updatedData.name);
      if (updatedData.category) formData.append('category', updatedData.category);
      
      if (iconFile) {
        formData.append('icon', iconFile);
      }

      const response = await authApi.put(`/member/tech/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setTechList(prev => prev.map(t => t.id === id ? response.data.technology : t));
    } catch (error: any) {
      console.error("Error updating technology", error);
      setError(error.response?.data?.error || 'ไม่สามารถแก้ไขข้อมูลได้');
      throw error;
    }
  };

  // ลบข้อมูล
  const deleteTech = async (id: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเทคโนโลยีนี้?')) {
      try {
        await authApi.delete(`/member/tech/${id}`);
        setTechList(prev => prev.filter(t => t.id !== id));
      } catch (error: any) {
        console.error("Error deleting technology", error);
        setError(error.response?.data?.error || 'ไม่สามารถลบข้อมูลได้');
        throw error;
      }
    }
  };

  return { techList, isLoading, error, addTech, updateTech, deleteTech };
};