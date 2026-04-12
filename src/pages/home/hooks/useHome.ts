import { useState, useEffect } from 'react';
import type { User } from '../../../types';
import { mockUser } from '../../../data';

export const useHome = () => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      setTimeout(() => {
        setData(mockUser);
        setLoading(false);
      }, 500);
    };

    fetchHomeData();
  }, []);

  return { data, loading };
};