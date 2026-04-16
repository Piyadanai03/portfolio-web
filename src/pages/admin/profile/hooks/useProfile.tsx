import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { authApi } from '../../../../api/axios';
import type { Contact } from '../../../../types';

export interface ProfileData {
  fullName: string;
  position: string;
  bio: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '', position: '', bio: ''
  });
  
  const [positionTags, setPositionTags] = useState<string[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authApi.get('/user/profile');
        if (response.data) {
          setProfile({
            fullName: response.data.fullName || '',
            position: response.data.position || '',
            bio: response.data.bio || ''
          });
          
          if (response.data.position) {
            const tags = response.data.position.split('|').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '');
            setPositionTags(tags);
          }

          if (response.data.contacts) {
            try {
              const parsedContacts = typeof response.data.contacts === 'string' 
                ? JSON.parse(response.data.contacts) 
                : response.data.contacts;
              setContacts(parsedContacts);
            } catch (e) {
              console.error("Parse contacts error", e);
            }
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
        position: positionTags.join(' | '),
        contacts: contacts
      };
      
      console.log("Saving Profile Data: ", finalData);
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
    positionTags, setPositionTags, 
    contacts, setContacts, 
    isFetching, isLoading, handleChange, saveProfile 
  };
};