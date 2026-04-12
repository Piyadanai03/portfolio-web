import type { Project, Achievement } from "../types";
import { mockTechnologies } from "./tech";
import { USER_ID } from "./contact";

export const mockProjects: Project[] = [
  {
    id: "proj-01",
    userID: USER_ID,
    title: "Research Ethics Tracking System",
    description:
      "ระบบเว็บแอปพลิเคชันสำหรับตรวจสอบและอนุมัติเอกสารขอจริยธรรมการวิจัย",
    coverImageURL: "https://placehold.co/600x400?text=No+Image",
    githubURL: "https://github.com/Piyadanai03/",
    createdAt: "2026-02-15T10:00:00Z",
    technologies: [
      mockTechnologies[1],
      mockTechnologies[2],
      mockTechnologies[3],
      mockTechnologies[4],
      mockTechnologies[7],
      mockTechnologies[8],
      mockTechnologies[9],
      mockTechnologies[0],
    ],
    images: [
      {
        id: "img-01",
        projectID: "proj-01",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "หน้า Dashboard แสดงสถานะเอกสาร",
      },
      {
        id: "img-02",
        projectID: "proj-01",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "หน้าฟอร์มกรอกข้อมูลเอกสารขอจริยธรรม",
      },
      {
        id: "img-03",
        projectID: "proj-01",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "หน้ารายละเอียดเอกสารพร้อมสถานะการอนุมัติ",
      },
    ],
  },
  {
    id: "proj-02",
    userID: USER_ID,
    title: "Vehicle Counting and Classification System",
    description: "ระบบตรวจจับและนับจำนวนรถยนต์แบบ Real-time ด้วยโมเดล YOLO",
    coverImageURL: "https://placehold.co/600x400?text=No+Image",
    githubURL: "https://github.com/Piyadanai03/vehicle_detection_php",
    createdAt: "2026-01-20T10:00:00Z",
    technologies: [mockTechnologies[5], mockTechnologies[6]],
    images: [
      {
        id: "img-04",
        projectID: "proj-02",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "ตัวอย่างการตรวจจับรถยนต์ในภาพวิดีโอ",
      },
      {
        id: "img-05",
        projectID: "proj-02",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "กราฟแสดงจำนวนรถยนต์ที่นับได้ในแต่ละช่วงเวลา",
      },
      {
        id: "img-06",
        projectID: "proj-02",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "หน้าต่างแสดงผลการจำแนกประเภทของรถยนต์",
      },
    ],
  },
  {
    id: "proj-03",
    userID: USER_ID,
    title: "Automated Legal Contract Generator",
    description:
      "ระบบสร้างสัญญาทางกฎหมายอัตโนมัติ รองรับ Social Login และการออกไฟล์ PDF",
    coverImageURL: "https://placehold.co/600x400?text=No+Image",
    githubURL: "https://github.com/Piyadanai03/law-contract",
    createdAt: "2026-02-28T10:00:00Z",
    technologies: [
      mockTechnologies[0],
      mockTechnologies[1],
      mockTechnologies[3],
    ], // Go, Bun, Hono
    images: [
      {
        id: "img-07",
        projectID: "proj-03",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "หน้าหลักของระบบ พร้อมตัวเลือกประเภทสัญญา",
      },
      {
        id: "img-08",
        projectID: "proj-03",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "หน้าฟอร์มกรอกข้อมูลสำหรับสร้างสัญญา",
      },
      {
        id: "img-09",
        projectID: "proj-03",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "ตัวอย่างไฟล์ PDF ที่ถูกสร้างขึ้นจากระบบ",
      },
    ],
  },
  {
    id: "proj-04",
    userID: USER_ID,
    title: "Personal Portfolio Website",
    description:
      "เว็บไซต์พอร์ตโฟลิโอส่วนตัวที่แสดงผลงานและประวัติการทำงาน พร้อมระบบจัดการเนื้อหาแบบง่าย",
    coverImageURL: "https://placehold.co/600x400?text=No+Image",
    githubURL: "https://github.com/Piyadanai03/portfolio",
    createdAt: "2025-12-10T10:00:00Z",
    technologies: [
      mockTechnologies[0],
      mockTechnologies[1],
      mockTechnologies[2],
      mockTechnologies[3],
      mockTechnologies[4],
      mockTechnologies[5],
      mockTechnologies[6],
      mockTechnologies[7],
      mockTechnologies[8],
      mockTechnologies[9],
    ], // Go, Bun, React, Hono, Tailwind, YOLO, OpenCV, MySQL, Redis, Docker
    images: [
      {
        id: "img-10",
        projectID: "proj-04",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "หน้าหลักของเว็บไซต์พอร์ตโฟลิโอ",
      },
      {
        id: "img-11",
        projectID: "proj-04",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "หน้ารายละเอียดโปรเจกต์ที่แสดงข้อมูลและเทคโนโลยีที่ใช้",
      },
      {
        id: "img-12",
        projectID: "proj-04",
        imageURL: "https://placehold.co/600x400?text=No+Image",
        caption: "หน้าจัดการเนื้อหาสำหรับเพิ่ม/แก้ไขโปรเจกต์และเทคโนโลยี",
      },
    ],
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: "achv-01",
    userID: USER_ID,
    projectID: "",
    title: "Completed API Observability Setup Masterclass",
    category: "training",
    dateAchieved: "2026-03-15T00:00:00Z",
  },
  {
    id: "achv-02",
    userID: USER_ID,
    projectID: "proj-02",
    title: "Won 2nd Place in University Hackathon",
    category: "award",
    dateAchieved: "2025-11-20T00:00:00Z",
  },
  {
    id: "achv-03",
    userID: USER_ID,
    projectID: "proj-01",
    title: "Received Best Research Project Award",
    category: "award",
    dateAchieved: "2026-02-20T00:00:00Z",
  }
];
