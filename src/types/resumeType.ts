export interface Experience {
  id: string;
  userID: string;
  jobTitle: string;
  company: string;
  startDate: string; // รับจาก Go เป็น ISO string
  endDate: string | null; // เป็น null ได้หากยังทำอยู่ที่เดิม
  description: string;
}

export interface Study {
  id: string;
  userID: string;
  degree: string;
  major: string;
  institution: string;
  graduationDate: string;
}