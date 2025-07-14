import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import PaymentTimer from "@/Components/PaymentTimer";

export default function PaymentForm({ order }) {
    const { data, setData, post, errors, processing } = useForm({
        bukti_pembayaran: null,
    });
    const { flash = {} } = usePage().props;

    const [previewImage, setPreviewImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bukti_pembayaran", data.bukti_pembayaran);
        formData.append("other_data", JSON.stringify(data));

        router.post(route("rent.payment.submit", order.id), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPreviewImage(URL.createObjectURL(file));
        setData("bukti_pembayaran", file);
    };

    const deadlineHandler = () => {
        return new Date(order.deadline_payment) <= new Date();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Form Rent
                </h2>
            }
        >
            <Head title="Form Rent" />
            <div className="mt-10 bg-gray-900 text-gray-200 flex justify-center items-center">
                <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-semibold text-center mb-6">
                        Pembayaran Rental
                    </h1>
                    <div className="flex justify-center items-center">
                        <PaymentTimer deadline={order.deadline_payment} />
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-center items-center my-3">
                            <img
                                src={`/storage/images/qris_dana.png`}
                                className="max-w-xs rounded-lg"
                                alt="QRIS DANA"
                            />
                        </div>
                        <p className="text-lg font-semibold">Detail Order:</p>
                        <ul className="list-disc ml-5 mt-2 space-y-1">
                            <li>Nama Kostum: {order.costum.name}</li>
                            <li>
                                Harga Kostum:{" "}
                                <span className="font-semibold text-green-400">
                                    {Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(order.costum.price)}
                                </span>
                            </li>
                            <li>Tanggal Mulai: {order.tanggal_mulai_rental}</li>
                            <li>
                                Tanggal Kembali: {order.tanggal_kembali_kostum}
                            </li>
                        </ul>
                    </div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                className="flex items-center p-4 my-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
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

                        <div className="mb-4">
                            <label
                                htmlFor="bukti_pembayaran"
                                className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Upload Bukti Pembayaran
                            </label>
                            <input
                                type="file"
                                id="bukti_pembayaran"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            {previewImage && (
                                <div className="mt-2">
                                    <img
                                        src={previewImage}
                                        alt="Bukti Pembayaran Preview"
                                        className="w-full max-h-40 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            {errors?.bukti_pembayaran && (
                                <p className="text-red-500 mt-2">
                                    {errors?.bukti_pembayaran}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                            disabled={
                                !previewImage || processing || deadlineHandler()
                            }
                            style={{
                                cursor: !previewImage
                                    ? "not-allowed"
                                    : "pointer",
                            }}
                        >
                            {processing
                                ? "Mengirim..."
                                : "Selesaikan Pembayaran"}
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
