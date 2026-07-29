import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  // ดึง Token จาก Local Storage
  const token = localStorage.getItem("token");

  // ถ้าไม่มี Token (ยังไม่ล็อกอิน) ให้เตะกลับไปหน้า Login ทันที
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ถ้ามี Token ก็อนุญาตให้ผ่านไปดูหน้าต่างๆ (Outlet) ได้เลย
  return <Outlet />;
};