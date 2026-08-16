import { useState, useEffect } from "react";
import type { Project, ApiResponse } from "../../../types";
import { publicApi } from "../../../api/axios";

export const useProjects = (experienceId?: string | null) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await publicApi.get<ApiResponse<Project[]>>(
          "/projects",
          {
            params: {
              experience_id: experienceId || undefined,
            },
          },
        );
        const res = response.data;

        if (res && res.success && Array.isArray(res.data)) {
          setProjects(res.data);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Fetch projects error:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [experienceId]);

  return { projects, loading };
};
