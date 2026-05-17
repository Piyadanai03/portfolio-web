import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';
import { authApi } from '../../../../api/axios';
import type { Study } from '../../../../types';

const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError(error) && error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export const useEducation = () => {
  const [educationList, setEducationList] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ดึงข้อมูล
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setIsLoading(true);
        const response = await authApi.get('/member/education');
        setEducationList(response.data || []);
        setError(null);
      } catch (error: unknown) {
        console.error('Error fetching educations:', error);
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
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error, 'เพิ่มข้อมูลการศึกษาไม่สำเร็จ');
      console.error('Error adding education:', error);
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
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error, 'แก้ไขข้อมูลการศึกษาไม่สำเร็จ');
      console.error('Error updating education:', error);
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
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error, 'ลบข้อมูลการศึกษาไม่สำเร็จ');
      console.error('Error deleting education:', error);
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
