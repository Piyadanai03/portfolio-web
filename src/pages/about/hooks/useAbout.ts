import { useState, useEffect } from "react";
import type { User, Achievement, ApiResponse } from "../../../types";
import { publicApi } from "../../../api/axios";

export const useAbout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response =
          await publicApi.get<
            ApiResponse<{ user: User; achievements: Achievement[] }>
          >("/about");
        const res = response.data;

        if (res.success) {
          setUser(res.data.user);
          setAchievements(res.data.achievements);
        } else {
          setError(res.message || "error occurred while fetching data");
        }
      } catch (err: unknown) {
        console.error("Error fetching about data:", err);
        setError("not connected to backend");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return { user, achievements, loading, error };
};
