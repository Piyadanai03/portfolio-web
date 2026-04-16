import { useState, useEffect } from 'react';
import type { Technology } from '../../../../types';
import { mockTechnologies } from '../../../../data/tech';

export const useTech = () => {
  const [techList, setTechList] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ดึงข้อมูล
  useEffect(() => {
    const fetchTech = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        setTechList(mockTechnologies);
      } catch (error) {
        console.error("Error fetching technologies", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTech();
  }, []);

  // เพิ่มข้อมูล
  const addTech = async (newTech: Omit<Technology, 'id'>) => {
    const tech: Technology = {
      ...newTech,
      id: `tech-${Date.now()}` // สร้าง ID ชั่วคราว
    };
    setTechList(prev => [tech, ...prev]);
  };

  // แก้ไขข้อมูล
  const updateTech = async (id: string, updatedData: Partial<Technology>) => {
    setTechList(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  // ลบข้อมูล
  const deleteTech = async (id: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเทคโนโลยีนี้?')) {
      setTechList(prev => prev.filter(t => t.id !== id));
    }
  };

  return { techList, isLoading, addTech, updateTech, deleteTech };
};