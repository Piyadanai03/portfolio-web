import { useState, useEffect } from 'react';
import type { User, Achievement } from '../../../types';
import { mockUser, mockAchievements } from '../../../data'; 

export const useAbout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setTimeout(() => {
        setUser(mockUser);
        setAchievements(mockAchievements);
        setLoading(false);
      }, 500);
    };

    fetchUser();
  }, []);
  return { user, achievements, loading };
};