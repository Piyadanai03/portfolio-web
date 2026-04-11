import type { User, Project } from "../types";


export const MOCK_USER: User = {
  id: "1",
  username: "piyadanai_k",
  fullName: "Piyadanai Krongklang",
  bioText: "Full Stack Developer who loves building scalable systems with Go and React.",
  address: "Buriram, Thailand",
  profileImageURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Piyadanai",
  resumeURL: "#",
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    userID: "1",
    title: "Research Ethics Tracking System",
    description: "ระบบติดตามสถานะการขอจริยธรรมการวิจัย พัฒนาด้วย Bun, Hono และ Svelte.",
    coverImageURL: "https://images.unsplash.com/photo-1454165833767-027ffea9e778?w=800&q=80",
    githubURL: "https://github.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "p2",
    userID: "1",
    title: "IoT PM2.5 Monitoring",
    description: "ระบบวัดฝุ่นละออง PM2.5 ด้วย ESP32 และแสดงผลผ่าน Dashboard แบบ Real-time.",
    coverImageURL: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    githubURL: "https://github.com",
    createdAt: new Date().toISOString(),
  }
];