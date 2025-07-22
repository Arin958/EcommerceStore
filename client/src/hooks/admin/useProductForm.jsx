import { useState } from "react";

export const useProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    discountPrice: "",
    sku: "",
    gender: "Unisex",
    collections: [],
    isFeatured: false,
    isActive: true,
    colors: [],
    sizes: [],
    images: [],
  });

  const [colorInput, setColorInput] = useState("");
  const [collectionInput, setCollectionInput] = useState("");
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files) {
      setFormData(prev => ({ ...prev, images: files }));
      const imagePreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviewImages(imagePreviews);
    } else if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSizeChange = (size) => {
    setFormData(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleAddColor = () => {
    if (colorInput.trim()) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, colorInput.trim()]
      }));
      setColorInput("");
    }
  };

  const removeColor = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  const handleAddCollection = () => {
    if (collectionInput.trim()) {
      setFormData(prev => ({
        ...prev,
        collections: [...prev.collections, collectionInput.trim()]
      }));
      setCollectionInput("");
    }
  };

  const removeCollection = (col) => {
    setFormData(prev => ({
      ...prev,
      collections: prev.collections.filter(c => c !== col)
    }));
  };

  return {
    isLoading,
    setIsLoading,
    formData,
    setFormData,
    colorInput,
    setColorInput,
    collectionInput,
    setCollectionInput,
    previewImages,
    setPreviewImages,
    handleChange,
    handleSizeChange,
    handleAddColor,
    removeColor,
    handleAddCollection,
    removeCollection
  };
};