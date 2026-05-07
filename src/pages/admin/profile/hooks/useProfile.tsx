import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { authApi } from '../../../../api/axios';
import type { Contact } from '../../../../types';

export interface ProfileData {
  fullName: string;
  position: string;
  bioText: string;
  address: string;
  profileImageURL: string;
  resumeURL: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '', position: '', bioText: '', address: '', profileImageURL: '', resumeURL: ''
  });
  
  const [positionTags, setPositionTags] = useState<string[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authApi.get('/member/profile'); 
        if (response.data) {
          setProfile({
            fullName: response.data.fullName || '',
            position: response.data.position || '',
            bioText: response.data.bioText || '',
            address: response.data.address || '',
            profileImageURL: response.data.profileImageURL || '',
            resumeURL: response.data.resumeURL || ''
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
      const formData = new FormData();
      formData.append('fullName', profile.fullName);
      formData.append('position', positionTags.join(' | '));
      formData.append('bioText', profile.bioText);
      formData.append('address', profile.address);
      formData.append('contacts', JSON.stringify(contacts));
      if (profileFile) {
        formData.append('profileImage', profileFile);
      }
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }
      
      console.log("Saving Profile via FormData");
      await authApi.put('/member/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('อัปเดตโปรไฟล์สำเร็จ!');
    } catch (error) {
      console.error(error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    profile, setProfile, 
    positionTags, setPositionTags, 
    contacts, setContacts, 
    setProfileFile, setResumeFile,
    isFetching, isLoading, handleChange, saveProfile 
  };
};