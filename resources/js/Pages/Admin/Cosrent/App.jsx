import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Cosrent({ datas = [] }) {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(datas);
    const { flash = {}, errors: pageErrors = {} } = usePage().props;

    const handleDelete = (e, id) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this costume?")) {
            router.delete(route("admin.cosrent.destroy", id));
            window.location.reload();
        }
    };

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredData(datas);
            return;
        }

        fetch(
            route("admin.cosrent.search") +
                `?search=${encodeURIComponent(search)}`
        )
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
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Cosrent
                    </h2>
                </div>
            }
        >
            <Head title="Cosrent" />

            <div className="m-10">
                <div className="flex items-center justify-between mb-4">
                    {/* Tombol Create Cosrent */}
                    <div className="flex items-center space-x-1">
                        <NavLink href={route("admin.cosrent.create")}>
                            <button
                                type="button"
                                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                Create Cosrent
                            </button>
                        </NavLink>

                        <NavLink href={route("admin.cosrent.getrequest")}>
                            <button
                                type="button"
                                className="flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
                            >
                                Lihat Request Cosrent
                            </button>
                        </NavLink>
                    </div>

                    {/* Search Input */}
                    <div className="relative max-w-xs">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full"
                            placeholder="Search Cosrent..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
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
                            <span className="font-medium">Success!</span>{" "}
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

                {/* Tabel */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Cosrent Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Number Telp
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4">
                                        No data found.
                                    </td>
                                </tr>
                            )}
                            {filteredData.map((data) => (
                                <tr
                                    key={data.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-4">
                                        {data.cosrent_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.telp_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        {data.address}
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        {/* Tombol Edit */}
                                        <Link
                                            type="button"
                                            className="text-blue-600 hover:text-blue-800 flex gap-2"
                                            title="Edit"
                                            href={route(
                                                "admin.cosrent.edit",
                                                data.id
                                            )}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 3.487c.39-.39.902-.586 1.414-.586h.086c.51 0 1.025.195 1.414.586.78.779.78 2.047 0 2.828L7.75 18.414 3 19.75l1.336-4.75L16.862 3.487z"
                                                />
                                            </svg>
                                            Edit
                                        </Link>

                                        {/* Tombol Delete */}

                                        <button
                                            type="button"
                                            className="text-red-600 hover:text-red-800 flex gap-2"
                                            onClick={(e) =>
                                                handleDelete(e, data.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
