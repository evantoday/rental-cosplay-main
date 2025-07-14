import { Head, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Welcome({ auth, datas }) {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(datas);
    const [selectedCostume, setSelectedCostume] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openDetailModal = (costume) => {
        setSelectedCostume(costume);
        setIsModalOpen(true);
    };

    const handleRent = (id) => {
        router.get(route("rental.form", id));
    };

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredData(datas);
            return;
        }

        fetch(route("search") + `?search=${encodeURIComponent(search)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setFilteredData(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error.message);
            });
    }, [search]);

    return (
        <>
            <Head title="Rental Kostum Cosplay" />
            <div className="bg-gray-100 text-black/50 dark:bg-gray-900 dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex justify-between my-10 ">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <ApplicationLogo className="w-40" />
                            </div>
                            <nav className="flex lg:col-start-3 lg:justify-center">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="flex lg:col-start-1 lg:justify-center max-w-80 mb-10 ms">
                                <div className="relative w-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-lg px-10 py-2 w-96 max-w-lg text-black dark:text-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Search Karakter, Anime, atau Game..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {filteredData.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-14">
                                    {filteredData.map((costume) => (
                                        <div
                                            key={costume.id}
                                            onClick={() =>
                                                openDetailModal(costume)
                                            }
                                            className="max-w-full mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
                                        >
                                            <img
                                                src={
                                                    costume.images_of_costum[0]
                                                        ?.images_link ||
                                                    "https://via.placeholder.com/150"
                                                }
                                                alt={costume.name}
                                                className="object-cover max-w-full max-h-72"
                                            />
                                            <div className="p-4 flex-grow">
                                                <h3 className="text-lg font-bold text-white truncate">
                                                    {costume.name}
                                                </h3>
                                                <span
                                                    className={`inline-block mt-2 px-3 py-1 text-xs font-bold text-white ${
                                                        costume.status ===
                                                        "ready"
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                    } rounded-full`}
                                                >
                                                    {costume.status === "ready"
                                                        ? "Ready"
                                                        : "Unavailable"}
                                                </span>
                                            </div>
                                            <div className="p-4 border-t flex items-center justify-between gap-5">
                                                <span className="text-md font-bold text-white">
                                                    Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID"
                                                    ).format(costume.price)}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRent(costume.id)
                                                    }
                                                    className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="size-6"
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
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-16 h-16 mb-4 text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-600 dark:text-gray-300">
                                        Hasil pencarian "{search}" tidak
                                        ditemukan
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Silakan coba dengan kata kunci lain
                                    </p>
                                </div>
                            )}
                        </main>

                        {/* modal detail */}
                        <Modal
                            show={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            maxWidth="5xl"
                        >
                            {selectedCostume && (
                                <div className="">
                                    <div className="mx-auto rounded-xl shadow-2xl overflow-hidden">
                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <div className="p-4 bg-slate-700 flex flex-col items-center">
                                                <div className="relative mb-4 w-full max-w-lg h-[550px]">
                                                    <img
                                                        id="main-image"
                                                        src={
                                                            selectedCostume
                                                                .images_of_costum[0]
                                                                ?.images_link ||
                                                            "https://via.placeholder.com/150"
                                                        }
                                                        alt={
                                                            selectedCostume.name
                                                        }
                                                        className="w-full max-h-[550px] object-cover rounded-lg shadow-lg"
                                                    />
                                                </div>

                                                {selectedCostume
                                                    .images_of_costum.length >
                                                5 ? (
                                                    <Swiper
                                                        slidesPerView={5}
                                                        spaceBetween={8}
                                                        breakpoints={{
                                                            640: {
                                                                slidesPerView: 3,
                                                            },
                                                            768: {
                                                                slidesPerView: 4,
                                                            },
                                                            1024: {
                                                                slidesPerView: 5,
                                                            },
                                                        }}
                                                        className="mySwiper w-full max-w-lg"
                                                    >
                                                        {selectedCostume.images_of_costum.map(
                                                            (image, index) => (
                                                                <SwiperSlide
                                                                    key={index}
                                                                >
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
                                                                            src={
                                                                                image.images_link
                                                                            }
                                                                            alt={`Thumbnail ${
                                                                                index +
                                                                                1
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
                                                        {selectedCostume.images_of_costum.map(
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
                                                                        src={
                                                                            image.images_link
                                                                        }
                                                                        alt={`Thumbnail ${
                                                                            index +
                                                                            1
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
                                                        {
                                                            selectedCostume
                                                                .cosrent
                                                                .cosrent_name
                                                        }
                                                    </h1>
                                                    <div className="p-5">
                                                        <h2 className="text-3xl font-bold mb-4">
                                                            {
                                                                selectedCostume.name
                                                            }
                                                        </h2>
                                                        <p className="mb-6 leading-relaxed">
                                                            {
                                                                selectedCostume.description
                                                            }
                                                        </p>
                                                        <div className="text-lg font-bold mb-4">
                                                            Harga:{" "}
                                                            <span className="text-blue-500">
                                                                Rp{" "}
                                                                {new Intl.NumberFormat(
                                                                    "id-ID",
                                                                    {
                                                                        style: "currency",
                                                                        currency:
                                                                            "IDR",
                                                                        minimumFractionDigits: 0,
                                                                        maximumFractionDigits: 0,
                                                                    }
                                                                )
                                                                    .format(
                                                                        selectedCostume.price
                                                                    )
                                                                    .replace(
                                                                        "Rp",
                                                                        ""
                                                                    )
                                                                    .trim()}
                                                                <span className="dark:text-gray-200 mx-1">
                                                                    / 3 Hari
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <ul className="space-y-2 p-5">
                                                        <li>
                                                            <strong>
                                                                Category:
                                                            </strong>{" "}
                                                            {
                                                                selectedCostume
                                                                    .category
                                                                    .name
                                                            }
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Size:
                                                            </strong>{" "}
                                                            {
                                                                selectedCostume.size
                                                            }
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Brand:
                                                            </strong>{" "}
                                                            {
                                                                selectedCostume.brand
                                                            }
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Status:
                                                            </strong>{" "}
                                                            <span
                                                                className={`font-bold ${
                                                                    selectedCostume.status ===
                                                                    "ready"
                                                                        ? "text-green-500"
                                                                        : "text-red-500"
                                                                }`}
                                                            >
                                                                {selectedCostume.status ===
                                                                "ready"
                                                                    ? "Ready"
                                                                    : "Unavailable"}
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <strong>
                                                                Stock:
                                                            </strong>{" "}
                                                            {
                                                                selectedCostume.stock
                                                            }{" "}
                                                            pcs
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="p-5">
                                                    <button
                                                        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium py-3 px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 flex items-center gap-2 justify-center"
                                                        onClick={() =>
                                                            handleRent(
                                                                selectedCostume.id
                                                            )
                                                        }
                                                    >
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
                            )}
                        </Modal>
                    </div>
                </div>
            </div>

            <footer className="py-8 bg-gray-800 text-white text-center">
                <div className="container mx-auto">
                    <p className="mb-4">
                        © 2025 FNDP RENT. All rights reserved.
                    </p>
                    <div className="flex justify-center items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Fauzi Nur Dwi Prayoga
                        <span className="mx-3">|</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6"
                        >
                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg>
                        fauzinurd25@gmail.com
                    </div>

                    <div className="mt-4 flex justify-center space-x-6">
                        <a
                            href="https://www.facebook.com/fauzi.n.p.5"
                            className="text-gray-400 hover:text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.876v-6.993H7.896v-2.883h2.542V9.797c0-2.513 1.492-3.897 3.776-3.897 1.094 0 2.238.194 2.238.194v2.462h-1.261c-1.244 0-1.63.773-1.63 1.563v1.874h2.773l-.443 2.883h-2.33v6.993C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>
                        <a
                            href="https://twitter.com"
                            className="text-gray-400 hover:text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M8.29 20.251c7.547 0 11.675-6.155 11.675-11.495 0-.175 0-.349-.012-.522A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.642A4.118 4.118 0 0 0 21.447 4.2a8.273 8.273 0 0 1-2.605.98A4.108 4.108 0 0 0 15.448 4c-2.28 0-4.128 1.82-4.128 4.07 0 .319.036.63.106.93A11.65 11.65 0 0 1 3.1 4.89a4.032 4.032 0 0 0-.556 2.045c0 1.412.727 2.656 1.826 3.387a4.09 4.09 0 0 1-1.87-.51v.05c0 1.974 1.428 3.623 3.321 3.994a4.142 4.142 0 0 1-1.857.07c.524 1.626 2.048 2.81 3.847 2.844A8.252 8.252 0 0 1 2 18.136a11.615 11.615 0 0 0 6.29 1.841" />
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/fauzinurd?igsh=MXZjYzlzMGRwaWhtNQ=="
                            className="text-gray-400 hover:text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zM12 7.498a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zM18.25 5.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm-6.25 3a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
