import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockProjects } from '../../../../data/project';
import type { ProjectImage } from '../../../../types';

export interface NewGalleryItem {
  file: File;
  preview: string;
  caption: string;
}

export const useProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubURL: "",
  });

  // --- State สำหรับหน้าปก (Cover Image) ---
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [previewCover, setPreviewCover] = useState<string>("");

  // --- State สำหรับรูปแกลลอรี (Project Images) ---
  const [existingGallery, setExistingGallery] = useState<ProjectImage[]>([]); 
  const [newGallery, setNewGallery] = useState<NewGalleryItem[]>([]); 
  const [deletedGalleryIds, setDeletedGalleryIds] = useState<string[]>([]); 

  useEffect(() => {
    const fetchProjectData = async () => {
      if (isEditMode) {
        setIsFetching(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 300));
          const existingProject = mockProjects.find((p) => p.id === id);
          if (existingProject) {
            setFormData({
              title: existingProject.title,
              description: existingProject.description,
              githubURL: existingProject.githubURL || "",
            });
            if (existingProject.coverImageURL) {
              setPreviewCover(existingProject.coverImageURL);
            }
            if (existingProject.images) {
              setExistingGallery(existingProject.images);
            }
          }
        } finally {
          setIsFetching(false);
        }
      } else {
        setFormData({ title: "", description: "", githubURL: "" });
        setPreviewCover("");
        setSelectedCover(null);
        setExistingGallery([]);
        setNewGallery([]);
        setDeletedGalleryIds([]);
      }
    };
    fetchProjectData();
  }, [id, isEditMode]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- ฟังก์ชันจัดการ Cover Image ---
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCover(file);
      setPreviewCover(URL.createObjectURL(file));
    }
  };
  const removeCover = () => {
    setSelectedCover(null);
    setPreviewCover("");
  };

  // --- ฟังก์ชันจัดการ Gallery Images ---
  const handleAddGalleryImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newItems = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      caption: "" 
    }));
    setNewGallery(prev => [...prev, ...newItems]);
  };

  // แก้ไขคำบรรยายรูปใหม่
  const handleGalleryCaptionChange = (index: number, caption: string) => {
    setNewGallery(prev => prev.map((item, i) => i === index ? { ...item, caption } : item));
  };

  // 🌟 แก้ไขคำบรรยายรูปเก่า (ที่โหลดมาจาก DB)
  const handleExistingGalleryCaptionChange = (imageId: string, newCaption: string) => {
    setExistingGallery(prev => 
      prev.map(img => img.id === imageId ? { ...img, caption: newCaption } : img)
    );
  };

  const removeNewGalleryImage = (index: number) => {
    setNewGallery(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (imageId: string) => {
    setExistingGallery(prev => prev.filter(img => img.id !== imageId));
    setDeletedGalleryIds(prev => [...prev, imageId]); 
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('githubURL', formData.githubURL);
      
      if (selectedCover) submitData.append('coverImage', selectedCover);

      newGallery.forEach((item) => {
        submitData.append('galleryImages', item.file);
        submitData.append('galleryCaptions', item.caption); 
      });

      // 🌟 ส่งข้อมูลรูปเก่าที่ถูกแก้คำบรรยายไปให้ Go อัปเดต
      existingGallery.forEach((img) => {
        submitData.append('existingImageIds', img.id);
        submitData.append('existingImageCaptions', img.caption || "");
      });

      deletedGalleryIds.forEach(id => {
        submitData.append('deletedGalleryIds', id);
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Console log เพื่อดูว่ามีคีย์อะไรถูกใส่ลงไปบ้าง (ลบออกได้ตอนใช้งานจริง)
      for (const pair of submitData.entries()) {
        console.log(pair[0], ':', pair[1]); 
      }

      alert(isEditMode ? "อัปเดตข้อมูลสำเร็จ!" : "เพิ่มโปรเจกต์ใหม่สำเร็จ!");
      navigate("/admin/projects");
    } catch  {
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isEditMode, formData, previewCover, isLoading, isFetching, 
    existingGallery, newGallery, 
    handleChange, handleCoverChange, removeCover, 
    handleAddGalleryImages, handleGalleryCaptionChange, 
    handleExistingGalleryCaptionChange, // Export เพิ่ม
    removeNewGalleryImage, removeExistingGalleryImage, 
    handleSubmit 
  };
};