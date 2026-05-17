import { useState, useEffect } from 'react';
import type { Achievement, Project } from '../../../../types';
// อิมพอร์ตข้อมูล Mock มาใช้งาน (ถ้าต่อ API จริงค่อยเปลี่ยนเป็น authApi.get)
import { mockAchievements, mockProjects } from '../../../../data/project';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ดึงข้อมูลเมื่อเปิดหน้า
  useEffect(() => {
    const fetchData = async () => {
      try {
        // จำลองการโหลดข้อมูล 0.5 วินาที
        await new Promise(resolve => setTimeout(resolve, 500));
        setAchievements(mockAchievements);
        setProjects(mockProjects); // ดึงโปรเจกต์มาทำ Dropdown
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ฟังก์ชันลบ
  const deleteAchievement = async (id: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
      // จำลองการลบ
      setAchievements(prev => prev.filter(item => item.id !== id));
    }
  };

  // ฟังก์ชันบันทึก (เพิ่ม/แก้ไข)
  const saveAchievement = async (data: Partial<Achievement>) => {
    // ถ้ามี ID แปลว่าเป็นการ "แก้ไข"
    if (data.id) {
      setAchievements(prev => prev.map(item => item.id === data.id ? { ...item, ...data } as Achievement : item));
    } else {
      // ถ้าไม่มี ID แปลว่า "เพิ่มใหม่"
      const newAchievement: Achievement = {
        ...data,
        id: `achv-${Date.now()}`, // จำลองการสร้าง ID ใหม่
        userID: 'user-01',
      } as Achievement;
      setAchievements([newAchievement, ...achievements]);
    }
  };

  return {
    achievements,
    projects,
    isLoading,
    deleteAchievement,
    saveAchievement
  };
};