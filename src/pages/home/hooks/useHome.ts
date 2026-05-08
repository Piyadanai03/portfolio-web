import { useState, useEffect } from 'react';
import type { User } from '../../../types';
import { publicApi } from '../../../api/axios';

export const useHome = () => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // 🌟 ยิง API ไปหา Backend
        const response = await publicApi.get('/home'); 
        setData(response.data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return { data, loading };
};