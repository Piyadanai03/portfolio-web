import { useState, useEffect } from 'react';
import type { User } from '../../../types';
import { mockUser } from '../../../data';

export const useAbout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      // จำลองการโหลดข้อมูล 0.5 วินาที
      // (ในอนาคตเปลี่ยนเป็น axios.get('/user/profile') ได้เลย)
      setTimeout(() => {
        setUser(mockUser);
        setLoading(false);
      }, 500);
    };

    fetchUser();
  }, []);

  return { user, loading };
};