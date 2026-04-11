export interface ApiResponse<T> {
  success: boolean;   // เอาไว้เช็ค if (res.success)
  data: T;            // ข้อมูลจริง (Project, User, ฯลฯ)
  message?: string;   // ข้อความ Error จาก Backend เอาไว้โชว์บนหน้าจอ
  errorCode?: string; // รหัส Error เฉพาะ (ถ้ามี) เอาไว้ Debug
}