"use client"
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface Option {
  color: string[];
  size: string[];
}

interface CreateProductDto {
  title: string;
  price: number;
  old_price?: number;
  assessment?: number;
  promotion_time?: Date;
  description: string;
  products_sold?: number;
  endDate?: Date;
  bigsale?: boolean;
  stock: number;
  category: string;
  brand: string;
  tags: string[];
  options?: { create: Option[] }[];
  images: { image: string }[];
}

export function CreateProduct() {
  const [formData, setFormData] = useState<CreateProductDto>({
    title: '',
    price: 0,
    description: '',
    stock: 0,
    category: '',
    brand: '',
    tags: [],
    images: [],
    options: [{ create: [{ color: [], size: [] }] }]
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 0.1, // 100KB
      maxWidthOrHeight: 1024,
      useWebWorker: true
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Compress and convert images to base64
      const imagesBase64 = await Promise.all(
        selectedImages.map(async (file) => {
          const compressedFile = await compressImage(file);
          return new Promise<{ image: string }>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve({ image: reader.result as string });
            reader.onerror = reject;
            reader.readAsDataURL(compressedFile);
          });
        })
      );

      const dataToSend = {
        ...formData,
        images: imagesBase64
      };

      const response = await fetch('http://localhost:3333/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to create product');
      }

      // Reset form after successful submission
      setFormData({
        title: '',
        price: 0,
        description: '',
        stock: 0,
        category: '',
        brand: '',
        tags: [],
        images: [],
        options: [{ create: [{ color: [], size: [] }] }]
      });
      setSelectedImages([]);

      alert('Product created successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white px-8 py-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Product</h2>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                />
              </div>

              <div>
                <label htmlFor="old_price" className="block text-sm font-medium text-gray-700">
                  Old Price
                </label>
                <input
                  type="number"
                  id="old_price"
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.old_price || ''}
                  onChange={(e) => setFormData({ ...formData, old_price: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <input
                  type="text"
                  id="category"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand *
                </label>
                <input
                  type="text"
                  id="brand"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock *
              </label>
              <input
                type="number"
                id="stock"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags (comma separated) *
              </label>
              <input
                type="text"
                id="tags"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Images * (Will be compressed before upload)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload files</span>
                      <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB (will be compressed)</p>
                </div>
              </div>
              {selectedImages.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{selectedImages.length} files selected</p>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}