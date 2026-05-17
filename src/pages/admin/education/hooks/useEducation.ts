import { useState, useEffect } from 'react';
import { authApi, publicApi } from '../../../../api/axios';
import type { Study } from '../../../../types';

export const useEducation = () => {
  const [educationList, setEducationList] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ดึงข้อมูล
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setIsLoading(true);
        const response = await publicApi.get('/educations');
        setEducationList(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching educations:', err);
        setError('ไม่สามารถดึงข้อมูลการศึกษาได้');
        setEducationList([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEducation();
  }, []);

  // เพิ่มข้อมูล
  const addEducation = async (newEducation: Omit<Study, 'id' | 'userID'>) => {
    try {
      const response = await authApi.post('/member/education', {
        degree: newEducation.degree,
        faculty: newEducation.faculty,
        major: newEducation.major,
        institution: newEducation.institution,
        gpa: newEducation.gpa || null,
        graduationDate: newEducation.graduationDate,
      });

      if (response.data?.data) {
        setEducationList(prev => [response.data.data, ...prev]);
      }
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'เพิ่มข้อมูลการศึกษาไม่สำเร็จ';
      console.error('Error adding education:', err);
      throw new Error(errorMsg);
    }
  };

  // แก้ไขข้อมูล
  const updateEducation = async (id: string, updatedData: Partial<Omit<Study, 'id' | 'userID'>>) => {
    try {
      const response = await authApi.put(`/member/education/${id}`, {
        degree: updatedData.degree || '',
        faculty: updatedData.faculty || '',
        major: updatedData.major || '',
        institution: updatedData.institution || '',
        gpa: updatedData.gpa || null,
        graduationDate: updatedData.graduationDate,
      });

      if (response.data?.data) {
        setEducationList(prev =>
          prev.map(e => e.id === id ? response.data.data : e)
        );
      }
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'แก้ไขข้อมูลการศึกษาไม่สำเร็จ';
      console.error('Error updating education:', err);
      throw new Error(errorMsg);
    }
  };

  // ลบข้อมูล
  const deleteEducation = async (id: string) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลการศึกษานี้?')) {
      return;
    }
    try {
      await authApi.delete(`/member/education/${id}`);
      setEducationList(prev => prev.filter(e => e.id !== id));
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'ลบข้อมูลการศึกษาไม่สำเร็จ';
      console.error('Error deleting education:', err);
      throw new Error(errorMsg);
    }
  };

  return {
    educationList,
    isLoading,
    error,
    addEducation,
    updateEducation,
    deleteEducation,
  };
};
