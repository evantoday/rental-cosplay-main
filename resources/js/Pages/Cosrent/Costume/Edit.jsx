import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { router } from "@inertiajs/react";

export default function Edit({ datas, categories, sizes, cosrent }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);
    const { flash = {}, errors: pageErrors = {} } = usePage().props;

    // Initialize form with existing data
    const { data, setData, post, processing, errors } = useForm({
        name: datas.name,
        description: datas.description,
        price: datas.price,
        category_id: datas.category_id,
        size: datas.size,
        brand: datas.brand,
        new_images: [],
        _method: "PUT",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === "new_images") {
                if (data.new_images) {
                    data.new_images.forEach((image) => {
                        formData.append("new_images[]", image);
                    });
                }
            } else {
                formData.append(key, data[key]);
            }
        });

        router.post(route("cosrent.costum.update", datas.id), formData, {
            preserveScroll: true,
            onSuccess: () => {
                setPreviewImages([]);
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleDeleteImage = async (imageId) => {
        try {
            await router.delete(route("cosrent.costum.delete-image", imageId), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    // Update the datas.images_of_costum state directly
                    datas.images_of_costum = datas.images_of_costum.filter(
                        (image) => image.id !== imageId
                    );

                    // Clear selected image and close modal
                    setSelectedImage(null);
                    setIsModalOpen(false);

                    // Reload the page data without full page refresh
                    router.reload({
                        only: ["datas"],
                        preserveState: true,
                        preserveScroll: true,
                    });
                },
                onError: (errors) => {
                    console.error("Error deleting image:", errors);
                },
            });
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleNewImages = (files) => {
        const newFiles = Array.from(files);

        // Create preview URLs with unique IDs
        const newPreviews = newFiles.map((file, index) => ({
            id: `preview-${Date.now()}-${index}`,
            preview: URL.createObjectURL(file),
            file: file,
        }));

        // Update preview images state
        setPreviewImages((prevPreviews) => [...prevPreviews, ...newPreviews]);

        // Update form data
        setData("new_images", [...(data.new_images || []), ...newFiles]);
    };

    const handleRemovePreview = (previewId) => {
        // Find the index of the preview image in the previewImages array
        const previewIndex = previewImages.findIndex(
            (img) => img.id === previewId
        );

        if (previewIndex !== -1) {
            // Create new array of preview images without the removed one
            const updatedPreviews = previewImages.filter(
                (img) => img.id !== previewId
            );
            setPreviewImages(updatedPreviews);

            // Remove the corresponding file from form data
            const updatedNewImages = [...data.new_images];
            updatedNewImages.splice(previewIndex, 1);
            setData("new_images", updatedNewImages);

            // Cleanup object URL
            URL.revokeObjectURL(previewImages[previewIndex].preview);
        }
    };

    // Clean up preview URLs when component unmounts
    React.useEffect(() => {
        return () => {
            previewImages.forEach((image) => {
                if (image.preview) {
                    URL.revokeObjectURL(image.preview);
                }
            });
        };
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Edit Costume" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-lg p-10">
                        <h2 className="text-3xl font-semibold mb-8 text-gray-200">
                            Edit Costume
                        </h2>

                        {/* Flash Message */}
                        {flash.success && (
                            <div
                                className="flex items-center p-4 my-3 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                                role="alert"
                            >
                                <svg
                                    className="flex-shrink-0 inline w-4 h-4 me-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">
                                        Success!
                                    </span>{" "}
                                    {flash.success}
                                </div>
                            </div>
                        )}
                        {flash.error && (
                            <div
                                className="flex items-center p-4 mb-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                role="alert"
                            >
                                <svg
                                    className="flex-shrink-0 inline w-4 h-4 me-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">Error!</span>{" "}
                                    {flash.error}
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-200">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-200">
                                        Category
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200"
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                {/* Size */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-200">
                                        Size
                                    </label>
                                    <select
                                        value={data.size}
                                        onChange={(e) =>
                                            setData("size", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200"
                                    >
                                        <option value="">Select Size</option>
                                        {sizes.map((size) => (
                                            <option key={size} value={size}>
                                                {size.toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.size && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.size}
                                        </p>
                                    )}
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-200">
                                        Price
                                    </label>
                                    <input
                                        type="text"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200"
                                        onInput={(e) => {
                                            e.target.value =
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                );
                                        }}
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Brand */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    value={data.brand}
                                    onChange={(e) =>
                                        setData("brand", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200"
                                />
                                {errors.brand && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.brand}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    rows="4"
                                    className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Existing Images */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-4">
                                    Current Images
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {datas.images_of_costum.map((image) => (
                                        <div
                                            key={image.id}
                                            className="relative group cursor-pointer"
                                            onClick={() =>
                                                handleImageClick(image)
                                            }
                                        >
                                            <img
                                                src={image.images_link}
                                                alt={datas.name}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                <span className="text-white">
                                                    Click to manage
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* New Images Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-4">
                                    Add New Images
                                </label>
                                <div
                                    className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        handleNewImages(
                                            Array.from(e.dataTransfer.files)
                                        );
                                    }}
                                >
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) =>
                                            handleNewImages(
                                                Array.from(e.target.files)
                                            )
                                        }
                                        className="hidden"
                                        id="new-images"
                                        accept="image/*"
                                    />
                                    <label
                                        htmlFor="new-images"
                                        className="cursor-pointer text-gray-400"
                                    >
                                        <span className="text-blue-500">
                                            Click to upload
                                        </span>{" "}
                                        or drag and droppp
                                    </label>
                                </div>

                                {/* New Images Preview */}
                                {previewImages.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                        {previewImages.map((image) => (
                                            <div
                                                key={image.id}
                                                className="relative group"
                                            >
                                                <img
                                                    src={image.preview}
                                                    alt={`Preview ${image.id}`}
                                                    className="w-full h-48 object-cover rounded-lg"
                                                />
                                                <div
                                                    className="absolute top-0 right-0 p-1 cursor-pointer"
                                                    onClick={() =>
                                                        handleRemovePreview(
                                                            image.id
                                                        )
                                                    }
                                                >
                                                    <span className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                                                        ×
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
                            >
                                {processing ? "Updating..." : "Update Costume"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Image Management Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    {selectedImage && (
                        <>
                            <img
                                src={selectedImage.images_link}
                                alt="Selected costume"
                                className="w-full h-auto max-h-96 object-contain mb-4"
                            />
                            <button
                                onClick={() =>
                                    handleDeleteImage(selectedImage.id)
                                }
                                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                            >
                                Delete Image
                            </button>
                        </>
                    )}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
