import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Detail({ datas }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleDelete = (e, id) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this costume?")) {
            router.delete(route("cosrent.costum.destroy", id));
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(price);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail Kostum
                </h2>
            }
        >
            <Head title="Detail Kostum" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-lg">
                        {/* Image Gallery */}
                        <div className="p-6 border-b border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                Galeri Kostum
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {datas.images_of_costum?.map((image) => (
                                    <div
                                        key={image.id}
                                        className="relative group cursor-pointer overflow-hidden rounded-lg"
                                        onClick={() => handleImageClick(image)}
                                    >
                                        <img
                                            src={image.images_link}
                                            alt={datas.name}
                                            className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-sm">
                                                Klik untuk memperbesar
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                        {datas.name}
                                    </h3>
                                    <p className="text-xl font-semibold text-blue-500 dark:text-blue-400">
                                        {formatPrice(datas.price)}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <span className="text-sm text-gray-400">
                                            Brand
                                        </span>
                                        <p className="text-lg text-gray-100">
                                            {datas.brand}
                                        </p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <span className="text-sm text-gray-400">
                                            Ukuran
                                        </span>
                                        <p className="text-lg text-gray-100">
                                            {datas.size.toUpperCase()}
                                        </p>
                                    </div>
                                    <div
                                        className={
                                            datas.status === "ready"
                                                ? "bg-green-700 p-4 rounded-lg"
                                                : "bg-gray-700 p-4 rounded-lg"
                                        }
                                    >
                                        <span className="text-sm text-gray-400">
                                            Status
                                        </span>
                                        <p className="text-lg text-gray-100">
                                            {datas.status}
                                        </p>
                                    </div>
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <span className="text-sm text-gray-400">
                                            Stok
                                        </span>
                                        <p className="text-lg text-gray-100">
                                            {datas.stock}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <span className="text-sm text-gray-400">
                                        Kategori
                                    </span>
                                    <p className="text-lg text-gray-100">
                                        {datas.category.name}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <span className="text-sm text-gray-400">
                                    Deskripsi
                                </span>
                                <p className="mt-2 text-gray-100 whitespace-pre-wrap">
                                    {datas.description}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-6 border-t border-gray-700">
                            <div className="flex gap-4">
                                <Link
                                    href={route(
                                        "cosrent.costum.edit",
                                        datas.id
                                    )}
                                    className="flex-1 px-6 py-3 text-center text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center gap-2 justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="size-6"
                                    >
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                    </svg>
                                    Edit Kostum
                                </Link>
                                <button
                                    onClick={(e) => handleDelete(e, datas.id)}
                                    className="flex-1 px-6 py-3 text-center text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="size-6"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    Hapus Kostum
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-4">
                    {selectedImage && (
                        <img
                            src={selectedImage.images_link}
                            alt="Selected costume"
                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                        />
                    )}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
