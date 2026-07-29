export interface Achievement {
  id: string;
  userID: string;
  projectID?: string | null; // ใส่ ? เพราะใน Go เป็น pointer (อาจเป็น null ได้)
  title: string;
  category: 'award' | 'training'; // ใช้ Union Type เพื่อจำกัดค่าให้ตรงตามคอมเมนต์ใน Go
  dateAchieved: string;
}