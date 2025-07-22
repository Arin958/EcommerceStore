import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/Admin/productAdmin";

import { Loader as FiLoader } from "lucide-react";
import { useProductForm } from "../../hooks/admin/useProductForm";
import BasicInfoSection from "../../components/Admin/Prouducts/ProductForm/BasicInfoSection";
import InventorySection from "../../components/Admin/Prouducts/ProductForm/InventorySection";
import SizesSection from "../../components/Admin/Prouducts/ProductForm/SizesSection";
import ColorsSection from "../../components/Admin/Prouducts/ProductForm/ColorsSection";
import ImagesSection from "../../components/Admin/Prouducts/ProductForm/ImagesSection";
import CollectionsSection from "../../components/Admin/Prouducts/ProductForm/CollectionsSection";
import OptionsSection from "../../components/Admin/Prouducts/ProductForm/OptionsSection";


const AddProductForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const {
    isLoading,
    setIsLoading,
    formData,
    handleChange,
    handleSizeChange,
    handleAddColor,
    removeColor,
    handleAddCollection,
    removeCollection,
    colorInput,
    setColorInput,
    collectionInput,
    setCollectionInput,
    previewImages,
    setPreviewImages
  } = useProductForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const data = new FormData();

    for (const key in formData) {
      if (["colors", "sizes", "collections"].includes(key)) {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === "images") {
        for (let file of formData.images) {
          data.append("images", file);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    if (user?.user?.id) {
      data.append("user", user.user.id);
    }

    try {
      await dispatch(createProduct(data)).unwrap();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white">Add New Product</h2>
          <p className="text-indigo-100 mt-1">Fill in the details below to create a new product</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BasicInfoSection formData={formData} handleChange={handleChange} />
            <InventorySection formData={formData} handleChange={handleChange} />
          </div>

          <SizesSection formData={formData} handleSizeChange={handleSizeChange} />
          <ColorsSection 
            formData={formData} 
            colorInput={colorInput} 
            setColorInput={setColorInput}
            handleAddColor={handleAddColor}
            removeColor={removeColor}
          />
          <CollectionsSection 
            formData={formData} 
            collectionInput={collectionInput}
            setCollectionInput={setCollectionInput}
            handleAddCollection={handleAddCollection}
            removeCollection={removeCollection}
          />
          <ImagesSection 
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
            handleChange={handleChange}
          />
          <OptionsSection formData={formData} handleChange={handleChange} />

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin" /> Creating Product...
              </>
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;