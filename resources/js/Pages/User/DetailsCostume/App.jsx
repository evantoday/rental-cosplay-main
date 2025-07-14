import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function DetailCostume({ costume }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail Costume
                </h2>
            }
        >
            <Head title={`Detail Costume - ${costume.name}`} />

            <div className="p-8 min-h-screen">
                <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-4 bg-slate-700 flex flex-col items-center">
                            <div className="relative mb-4 w-full max-w-lg">
                                <img
                                    id="main-image"
                                    src={
                                        costume.images_of_costum[0]
                                            ?.images_link ||
                                        "https://via.placeholder.com/150"
                                    }
                                    alt={costume.name}
                                    className="w-full max-h-[500px] object-cover rounded-lg shadow-lg"
                                />
                            </div>

                            {costume.images_of_costum.length > 5 ? (
                                <Swiper
                                    slidesPerView={5}
                                    spaceBetween={8}
                                    breakpoints={{
                                        640: { slidesPerView: 3 },
                                        768: { slidesPerView: 4 },
                                        1024: { slidesPerView: 5 },
                                    }}
                                    className="mySwiper w-full max-w-lg"
                                >
                                    {costume.images_of_costum.map(
                                        (image, index) => (
                                            <SwiperSlide key={index}>
                                                <button
                                                    className="w-16 h-16 border rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transform hover:scale-105 transition"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                "main-image"
                                                            )
                                                            .setAttribute(
                                                                "src",
                                                                image.images_link
                                                            )
                                                    }
                                                >
                                                    <img
                                                        src={image.images_link}
                                                        alt={`Thumbnail ${
                                                            index + 1
                                                        }`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            </SwiperSlide>
                                        )
                                    )}
                                </Swiper>
                            ) : (
                                <div className="flex justify-center mt-4 space-x-3">
                                    {costume.images_of_costum.map(
                                        (image, index) => (
                                            <button
                                                key={index}
                                                className="w-16 h-16 border rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transform hover:scale-105 transition"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "main-image"
                                                        )
                                                        .setAttribute(
                                                            "src",
                                                            image.images_link
                                                        )
                                                }
                                            >
                                                <img
                                                    src={image.images_link}
                                                    alt={`Thumbnail ${
                                                        index + 1
                                                    }`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Bagian Detail */}
                        <div className="bg-gray-800 text-white flex flex-col justify-between">
                            <div>
                                <h1 className="text-lg font-bold mb-2 flex items-center gap-2 bg-blue-400 h-16 p-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                                    </svg>
                                    {costume.cosrent.cosrent_name}
                                </h1>
                                <div className="p-5">
                                    <h2 className="text-3xl font-bold mb-4">
                                        {costume.name}
                                    </h2>
                                    <p className="mb-6 leading-relaxed">
                                        {costume.description}
                                    </p>
                                    <div className="text-lg font-bold mb-4">
                                        Harga:{" "}
                                        <span className="text-blue-500">
                                            Rp {costume.price.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-2 p-5">
                                    <li>
                                        <strong>Category:</strong>{" "}
                                        {costume.category.name}
                                    </li>
                                    <li>
                                        <strong>Size:</strong> {costume.size}
                                    </li>
                                    <li>
                                        <strong>Brand:</strong> {costume.brand}
                                    </li>
                                    <li>
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`font-bold ${
                                                costume.status === "ready"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {costume.status === "ready"
                                                ? "Ready"
                                                : "Unavailable"}
                                        </span>
                                    </li>
                                    <li>
                                        <strong>Stock:</strong> {costume.stock}{" "}
                                        pcs
                                    </li>
                                </ul>
                            </div>
                            <div className="p-5">
                                <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 flex items-center gap-2 justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        />
                                    </svg>
                                    Rent Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
