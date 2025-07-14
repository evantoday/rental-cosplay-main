import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function DetailOrder({ datas }) {
    const {
        costum,
        tanggal_mulai_rental,
        tanggal_kembali_kostum,
        bukti_pembayaran,
        status,
        user,
    } = datas;
    const biodata = user.biodata;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage("");
    };

    const handleReject = (e, id) => {
        e.preventDefault();
        if (confirm("Are you sure you want to reject this order?")) {
            router.post(route("order.reject", id));
        }
    };

    const handleConfirm = (e, id) => {
        e.preventDefault();
        if (confirm("Are you sure you want to approve this order?")) {
            router.post(route("order.confirm", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail Order
                </h2>
            }
        >
            <Head title="Detail Order" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Card Pesanan */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 mb-8">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-semibold mb-4">
                                Detail Pesanan
                            </h3>
                            <p>
                                <strong>Nama Kostum:</strong> {costum.name}
                            </p>
                            <p>
                                <strong>Merek:</strong> {costum.brand}
                            </p>
                            <p>
                                <strong>Ukuran:</strong> {costum.size}
                            </p>
                            <p>
                                <strong>Harga:</strong> Rp {costum.price}
                            </p>
                            <p>
                                <strong>Tanggal Mulai Rental:</strong>{" "}
                                {tanggal_mulai_rental}
                            </p>
                            <p>
                                <strong>Tanggal Kembali Kostum:</strong>{" "}
                                {tanggal_kembali_kostum}
                            </p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span
                                    className={
                                        status === "pending"
                                            ? "text-yellow-500"
                                            : status === "confirmed"
                                            ? "text-green-500"
                                            : status === "awaiting_payment"
                                            ? "text-rose-300"
                                            : status === "waiting_confirmation"
                                            ? "text-blue-600"
                                            : status === "done"
                                            ? "text-emerald-500"
                                            : "text-red-500"
                                    }
                                >
                                    {status}
                                </span>
                            </p>
                            <p>
                                <strong>Bukti Pembayaran:</strong>
                                <a
                                    onClick={() => openModal(bukti_pembayaran)}
                                    className="text-blue-500 underline ml-2"
                                >
                                    Lihat Bukti
                                </a>
                            </p>
                        </div>
                        <div className="flex justify-end mb-5 me-5">
                            <button
                                onClick={(e) => {
                                    handleReject(e, datas.id);
                                }}
                                disabled={status !== "waiting_confirmation"}
                                className={
                                    status !== "waiting_confirmation"
                                        ? "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-4 cursor-not-allowed"
                                        : "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-4"
                                }
                            >
                                Tolak Pesanan
                            </button>
                            <button
                                onClick={(e) => {
                                    handleConfirm(e, datas.id);
                                }}
                                disabled={status !== "waiting_confirmation"}
                                className={
                                    status !== "waiting_confirmation"
                                        ? "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-not-allowed"
                                        : "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                }
                            >
                                Konfirmasi Pesanan
                            </button>
                        </div>
                    </div>

                    <div>
                            {/* Ini harusnya di Orders */}
                     <a href="#">
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 flex gap-3 items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                />
                            </svg>
                            Export Laporan PDF
                        </button>
                    </a>
                    </div>

                    {/* Card Biodata User */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-semibold mb-4">
                                Biodata User
                            </h3>
                            <p>
                                <strong>Nama:</strong> {user.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Alamat:</strong> {biodata.full_address}
                            </p>
                            <p>
                                <strong>No. WhatsApp:</strong>{" "}
                                {biodata.phone_whatsapp}
                            </p>
                            <p>
                                <strong>No. Telepon Orang Tua:</strong>{" "}
                                {biodata.parents_phone}
                            </p>
                            <p>
                                <strong>Instagram:</strong> {biodata.instagram}
                            </p>
                            <p>
                                <strong>TikTok:</strong> {biodata.tiktok}
                            </p>
                            <p>
                                <strong>KTP:</strong>
                                <a
                                    onClick={() => openModal(biodata.ktp)}
                                    className="text-blue-500 underline ml-2"
                                >
                                    Lihat KTP
                                </a>
                            </p>
                            <p>
                                <strong>Selfie dengan KTP:</strong>
                                <button
                                    onClick={() =>
                                        openModal(biodata.selfie_with_ktp)
                                    }
                                    className="text-blue-500 underline ml-2"
                                >
                                    Lihat Selfie
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Modal untuk melihat foto */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                        <div className="relative max-w-3xl mx-auto">
                            <button
                                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full p-2"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="max-w-full max-h-screen rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
