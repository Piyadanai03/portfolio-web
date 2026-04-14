import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react'; // 👈 แก้ Error: แยก import type ออกมา

import { authApi } from '../../../../api/axios';

export interface ProfileData {
  fullName: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '', position: '', bio: '', email: '', phone: '', github: '', linkedin: ''
  });
  
  const [positionTags, setPositionTags] = useState<string[]>([]);
  
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authApi.get('/user/profile');
        if (response.data) {
          setProfile(response.data);
          if (response.data.position) {
            const tags = response.data.position
              .split('|')
              .map((tag: string) => tag.trim())
              .filter((tag: string) => tag !== '');
            setPositionTags(tags);
          }
        }
      } catch (error) {
        console.error("Fetch profile failed", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      const finalData = {
        ...profile,
        position: positionTags.join(' | ')
      };
      await authApi.put('/user/profile', finalData);
      alert('อัปเดตโปรไฟล์สำเร็จ!');
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    profile, 
    positionTags,
    setPositionTags,
    isFetching, 
    isLoading, 
    handleChange, 
    saveProfile 
  };
};