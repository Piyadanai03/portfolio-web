import { useState, useEffect } from 'react';
import type { User, Achievement } from '../../../types';
import { publicApi } from '../../../api/axios';

export const useAbout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await publicApi.get('/about');
        const { user, achievements } = response.data;
        
        setUser(user);
        setAchievements(achievements || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch about data:', err);
        setError('Failed to load about page data');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return { user, achievements, loading, error };
};