import { useState, useEffect } from "react";
import type { Experience, ApiResponse } from "../../../types";
import { publicApi } from "../../../api/axios";

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);

        const response =
          await publicApi.get<ApiResponse<Experience[]>>("/experiences");
        const res = response.data;

        if (res && res.success && Array.isArray(res.data)) {
          setExperiences(res.data);
        } else {
          setExperiences([]);
        }
      } catch (error) {
        console.error("Fetch experiences error:", error);
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return { experiences, loading };
};
