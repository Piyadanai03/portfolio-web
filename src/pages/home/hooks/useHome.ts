import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';
import type { User, ApiResponse } from '../../../types';
import { publicApi } from '../../../api/axios';

export const useHome = () => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await publicApi.get<ApiResponse<User>>('/home');
        const res = response.data;

        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message || "error occurred while fetching data");
        }

      } catch (err: unknown) {
        console.error("Error fetching home data:", err);

        if (isAxiosError<ApiResponse<null>>(err)) {
          setError(err.response?.data?.message || "not connected to backend");
        } else {
          setError("not connected to backend");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return { data, loading, error };
};