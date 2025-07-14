import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { Head, usePage, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function Biodata({ biodata = {} }) {
    const { flash = {}, errors: pageErrors = {} } = usePage().props;
    const user_data = usePage().props.auth.user;

    const [ktpPreview, setKtpPreview] = useState(null);
    const [selfiePreview, setSelfiePreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: user_data.id,
        name: user_data.name,
        email: user_data.email,
        phone_whatsapp: biodata?.phone_whatsapp || "",
        parents_phone: biodata?.parents_phone || "",
        full_address: biodata?.full_address || "",
        instagram: biodata?.instagram || "",
        tiktok: biodata?.tiktok || "",
        friends_social_media: biodata?.friends_social_media || "",
        ktp: biodata?.ktp || "",
        selfie_with_ktp: biodata?.selfie_with_ktp || "",
    });

    useEffect(() => {
        if (biodata?.ktp) {
            setKtpPreview(`/storage/${biodata.ktp}`);
        }
        if (biodata?.selfie_with_ktp) {
            setSelfiePreview(`/storage/${biodata.selfie_with_ktp}`);
        }
    }, [biodata]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Buat FormData object
        const formData = new FormData();

        // Tambahkan semua field ke FormData
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        if (biodata?.id) {
            // Tambahkan method PUT karena Laravel mengharapkan ini
            formData.append("_method", "PUT");

            router.post(route("biodata.update", biodata?.id), formData, {
                forceFormData: true,
                onError: (response) => {
                    console.log("Error Response:", response);
                },
                onSuccess: () => {
                    reset();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                },
            });
        } else {
            post(route("biodata.store"), formData, {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                },
            });
        }
    };

    const handleKTPUpload = (e) => {
        const file = e.target.files[0];
        setData("ktp", file);
        if (file) {
            setKtpPreview(URL.createObjectURL(file));
        }
    };

    const handleSelfieUpload = (e) => {
        const file = e.target.files[0];
        setData("selfie_with_ktp", file);
        if (file) {
            setSelfiePreview(URL.createObjectURL(file));
        }
    };

    const FileInput = ({
        id,
        label,
        onChange,
        preview,
        accept = "image/*",
    }) => (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-200"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    type="file"
                    id={id}
                    onChange={onChange}
                    accept={accept}
                    className="hidden"
                />
                <label
                    htmlFor={id}
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                    Choose File
                </label>
            </div>
            {preview && (
                <div className="mt-3">
                    <div className="relative group">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-600"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">Preview</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Biodata
                </h2>
            }
        >
            <Head title="Biodata" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
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

                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    disabled
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    disabled
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone WhatsApp */}
                            <div>
                                <label
                                    htmlFor="phone_whatsapp"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    WhatsApp Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone_whatsapp"
                                    value={data.phone_whatsapp}
                                    required
                                    onChange={(e) =>
                                        setData(
                                            "phone_whatsapp",
                                            e.target.value
                                        )
                                    }
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(
                                            /[^0-9]/g,
                                            ""
                                        );
                                    }}
                                    className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                                />
                                {errors.phone_whatsapp && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.phone_whatsapp}
                                    </p>
                                )}
                            </div>

                            {/* Parents Phone */}
                            <div>
                                <label
                                    htmlFor="parents_phone"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    Parents Phone
                                </label>
                                <input
                                    type="tel"
                                    id="parents_phone"
                                    value={data.parents_phone}
                                    required
                                    onChange={(e) =>
                                        setData("parents_phone", e.target.value)
                                    }
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(
                                            /[^0-9]/g,
                                            ""
                                        );
                                    }}
                                    className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                                />
                                {errors.parents_phone && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.parents_phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label
                                htmlFor="full_address"
                                className="block text-sm font-medium text-gray-200"
                            >
                                Full Address
                            </label>
                            <textarea
                                id="full_address"
                                value={data.full_address}
                                required
                                onChange={(e) =>
                                    setData("full_address", e.target.value)
                                }
                                rows={3}
                                className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                            />
                            {errors.full_address && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.full_address}
                                </p>
                            )}
                        </div>

                        {/* Social Media */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Instagram */}
                            <div>
                                <label
                                    htmlFor="instagram"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    Instagram
                                </label>
                                <input
                                    type="text"
                                    id="instagram"
                                    value={data.instagram}
                                    required
                                    onChange={(e) =>
                                        setData("instagram", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                                />
                                {errors.instagram && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.instagram}
                                    </p>
                                )}
                            </div>

                            {/* TikTok */}
                            <div>
                                <label
                                    htmlFor="tiktok"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    TikTok
                                </label>
                                <input
                                    type="text"
                                    id="tiktok"
                                    value={data.tiktok}
                                    onChange={(e) =>
                                        setData("tiktok", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                                />
                                {errors.tiktok && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.tiktok}
                                    </p>
                                )}
                            </div>

                            {/* Friends Social Media */}
                            <div>
                                <label
                                    htmlFor="friends_social_media"
                                    className="block text-sm font-medium text-gray-200"
                                >
                                    Friends Social Media
                                </label>
                                <input
                                    type="text"
                                    id="friends_social_media"
                                    value={data.friends_social_media}
                                    required
                                    onChange={(e) =>
                                        setData(
                                            "friends_social_media",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200 placeholder-gray-400"
                                />
                                {errors.friends_social_media && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.friends_social_media}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* KTP Upload */}
                            <div>
                                <FileInput
                                    id="ktp"
                                    label="Upload KTP"
                                    onChange={handleKTPUpload}
                                    preview={ktpPreview}
                                />
                                {errors.ktp && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.ktp}
                                    </p>
                                )}
                            </div>

                            {/* Selfie Upload */}
                            <div>
                                <FileInput
                                    id="selfie_with_ktp"
                                    label="Upload Selfie with KTP"
                                    onChange={handleSelfieUpload}
                                    preview={selfiePreview}
                                />
                                {errors.selfie_with_ktp && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.selfie_with_ktp}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                    processing
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={processing}
                            >
                                {processing
                                    ? "Processing..."
                                    : biodata?.id
                                    ? "Update Biodata"
                                    : "Submit Biodata"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
