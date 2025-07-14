import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";

export default function FormRent({ datas }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const user_id = usePage().props.auth.user.id;
    const { flash = {}, errors = {} } = usePage().props;
    const { data, setData, post, processing } = useForm({
        user_id: user_id,
        costum_id: datas.id,
        cosrent_id: datas.cosrent.id,
        tanggal_mulai_rental: "",
    });

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const handleSubmit = (e, id) => {
        e.preventDefault();
        router.post(route("rent.submit", id), data);
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

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
                <div className="bg-gray-900 text-gray-200 flex justify-center items-center">
                    <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-8">
                        <h1 className="text-2xl font-semibold text-center mb-6">
                            Rental Kostum - {datas.name}
                        </h1>
                        <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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

                        <div className="flex flex-wrap justify-between my-8">
                            <div className="w-full md:w-1/2">
                                <p className="text-lg font-semibold">
                                    Detail Kostum:
                                </p>
                                <div className="list-disc ml-5 mt-2 space-y-1">
                                    <p>
                                        Cosrent: {datas.cosrent?.cosrent_name}
                                    </p>
                                    <p>Size : {datas.size}</p>
                                    <p>
                                        Status :{" "}
                                        {datas.status === "ready" ? (
                                            <span className="text-green-500">
                                                {datas.status}
                                            </span>
                                        ) : (
                                            <span className="text-red-500">
                                                {datas.status}
                                            </span>
                                        )}
                                    </p>
                                    <p>
                                        Harga :{" "}
                                        <span className="font-semibold text-blue-500">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })
                                                .format(datas.price)
                                                .replace("Rp", "")
                                                .trim()}
                                            / 3 Hari
                                        </span>
                                    </p>
                                </div>
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
                                            <span className="font-medium">
                                                Error!
                                            </span>{" "}
                                            {flash.error}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="list-disc ml-5 mt-2 space-y-1">
                                    <p>Kategori: {datas.category?.name}</p>
                                    <p>Deskripsi: {datas.description}</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={(e) => handleSubmit(e, datas.id)}>
                            <div className="mb-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                <label
                                    htmlFor="tanggal_mulai_rental"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Tanggal Mulai Rental
                                </label>
                                <input
                                    type="date"
                                    id="tanggal_mulai_rental"
                                    value={data.tanggal_mulai_rental}
                                    onChange={(e) =>
                                        setData(
                                            "tanggal_mulai_rental",
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg px-3 py-2 focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    required
                                />
                                {errors?.tanggal_mulai_rental && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.tanggal_mulai_rental}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing
                                    ? "Mengirim..."
                                    : "Lanjutkan ke Pembayaran"}
                            </button>
                        </form>
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
            </div>
        </AuthenticatedLayout>
    );
}
