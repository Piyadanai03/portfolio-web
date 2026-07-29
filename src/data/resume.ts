import type { Experience, Study } from '../types';
import { USER_ID } from './contact';

export const mockExperiences: Experience[] = [
  {
    id: "exp-01",
    userID: USER_ID,
    jobTitle: "Freelance Software Developer",
    company: "อิสระ (Freelance)",
    startDate: "2025-05-01T00:00:00Z",
    endDate: null,
    description: "ให้บริการพัฒนาเว็บไซต์และออกแบบระบบซอฟต์แวร์ตามความต้องการของผู้ว่าจ้าง ไม่ว่าจะเป็นการสร้างเว็บไซต์ตั้งแต่ต้น การปรับปรุงระบบที่มีอยู่แล้ว รวมถึงนำ AI มาใช้กับระบบ Linebot n8n รวมถึงเว็ปไซต์อื่นๆ และเคยดูแล wordpress อยู๋ช่วงหนึ่งด้วย ส่วน Stack ขึ้นอยู่กับความต้องการของผู้ว่าจ้าง หรือแนะนำเทคโนโลยีที่เหมาะสมกับโปรเจกต์นั้นๆ เช่น React, Node.js, Python และอื่นๆ ตามความเหมาะสม"
  },
  {
    id: "exp-02",
    userID: USER_ID,
    jobTitle: "Internship - Junior Backend Developer",
    company: "บริษัท โปรดักติวิตี้ แอสโซซิเอทส์ จำกัด (PRODUCTIVITY ASSOCIATES CO., LTD.)",
    startDate: "2025-11-03T00:00:00Z",
    endDate: "2026-02-20T00:00:00Z",
    description: "ดำเนินธุรกิจให้คำปรึกษาด้านการเพิ่มผลผลิต การบริหารงานบำรุงรักษา และการบริหารพัสดุอะไหล่ ให้ปรึกษาในการจัดหา และ Implement Software ระบบบริหารงานบำรุงรักษา (CMMS - Maintenance Management System) และพัฒนาระบบซอฟต์แวร์ที่เกี่ยวข้องกับการบริหารงานบำรุงรักษาและบริหารจัดการงบประมาณ"
  }
];

export const mockStudies: Study[] = [
  {
    id: "edu-01",
    userID: USER_ID,
    degree: "Bachelor of Science",
    major: "Information Technology",
    institution: "Buriram Rajabhat University",
    faculty: "Faculty of Science",
    gpa: 3.17,
    graduationDate: "2026-03-31T00:00:00Z"
  }
];