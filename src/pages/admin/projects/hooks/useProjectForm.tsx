import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authApi, publicApi } from '../../../../api/axios';
import type { ProjectImage, Technology, Project , NewGalleryItem , ProjectFormData} from '../../../../types';

export const useProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    githubURL: "",
  });

  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [previewCover, setPreviewCover] = useState<string>("");

  const [existingGallery, setExistingGallery] = useState<ProjectImage[]>([]); 
  const [newGallery, setNewGallery] = useState<NewGalleryItem[]>([]); 
  const [deletedGalleryIds, setDeletedGalleryIds] = useState<string[]>([]); 

  const [availableTechs, setAvailableTechs] = useState<Technology[]>([]); 
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([]); 

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsFetching(true);
      try {
        const techResponse = await authApi.get('/member/tech');
        setAvailableTechs(techResponse.data);

        if (isEditMode) {
          const response = await publicApi.get('/projects'); 
          const existingProject = response.data.find((p: Project) => p.id === id);

          if (existingProject) {
            setFormData({
              title: existingProject.title,
              description: existingProject.description || "",
              githubURL: existingProject.githubURL || "",
            });
            if (existingProject.coverImageURL) {
              setPreviewCover(existingProject.coverImageURL);
            }
            if (existingProject.images) {
              setExistingGallery(existingProject.images);
            }
            if (existingProject.technologies) {
              setSelectedTechIds(existingProject.technologies.map((t: Technology) => t.id));
            }
          }
        } else {
          setFormData({ title: "", description: "", githubURL: "" });
          setPreviewCover("");
          setSelectedCover(null);
          setExistingGallery([]);
          setNewGallery([]);
          setDeletedGalleryIds([]);
          setSelectedTechIds([]); 
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProjectData();
  }, [id, isEditMode]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleAddGalleryImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newItems = files.map(file => ({
      file, preview: URL.createObjectURL(file), caption: "" 
    }));
    setNewGallery(prev => [...prev, ...newItems]);
  };

  const handleGalleryCaptionChange = (index: number, caption: string) => {
    setNewGallery(prev => prev.map((item, i) => i === index ? { ...item, caption } : item));
  };

  const handleExistingGalleryCaptionChange = (imageId: string, newCaption: string) => {
    setExistingGallery(prev => prev.map(img => img.id === imageId ? { ...img, caption: newCaption } : img));
  };

  const removeNewGalleryImage = (index: number) => {
    setNewGallery(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (imageId: string) => {
    setExistingGallery(prev => prev.filter(img => img.id !== imageId));
    setDeletedGalleryIds(prev => [...prev, imageId]); 
  };

  const addTech = (techId: string) => {
    if (!selectedTechIds.includes(techId)) {
      setSelectedTechIds(prev => [...prev, techId]);
    }
  };

  const removeTech = (techId: string) => {
    setSelectedTechIds(prev => prev.filter(id => id !== techId));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();
      
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('githubURL', formData.githubURL); 
      
      if (selectedCover) {
        submitData.append('coverImage', selectedCover);
      }

      newGallery.forEach((item) => {
        submitData.append('galleryImages', item.file);
        submitData.append('galleryCaptions', item.caption); 
      });

      existingGallery.forEach((img) => {
        submitData.append('existingImageIds', img.id);
        submitData.append('existingImageCaptions', img.caption || "");
      });

      deletedGalleryIds.forEach(id => {
        submitData.append('deletedGalleryIds', id);
      });

      selectedTechIds.forEach(id => {
        submitData.append('techIds', id); 
      });

      if (isEditMode) {
        await authApi.put(`/member/projects/${id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("อัปเดตข้อมูลสำเร็จ!");
      } else {
        await authApi.post(`/member/projects`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("เพิ่มโปรเจกต์ใหม่สำเร็จ!");
      }

      navigate("/admin/projects");
      
    } catch (error) {
      console.error("Submit Error:", error);
      alert("เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    isEditMode, formData, previewCover, isLoading, isFetching, 
    existingGallery, newGallery, 
    availableTechs, selectedTechIds, 
    handleChange, handleCoverChange, removeCover, 
    handleAddGalleryImages, handleGalleryCaptionChange, 
    handleExistingGalleryCaptionChange,
    removeNewGalleryImage, removeExistingGalleryImage, 
    addTech, removeTech, 
    handleSubmit 
  };
};