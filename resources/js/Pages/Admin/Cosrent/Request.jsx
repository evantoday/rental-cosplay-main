import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { use, useState } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";

export default function Cosrent({ datas = [], auth }) {
    const { flash = {}, errors: pageErrors = {} } = usePage().props;

    const handleApprove = (id, user_id, status) => {
        if (!window.confirm("Are you sure you want to approve this request?")) {
            return;
        }

        router.post(
            route("admin.user.approve", id),
            {
                status,
                user_id: user_id,
            },
            {
                onSuccess: () => {
                    alert("Request approved successfully!");
                },
                onError: (errors) => {
                    alert(
                        errors.message ||
                            "An error occurred while processing the request."
                    );
                },
            }
        );
    };

    const handleReject = (id, user_id, status) => {
        if (!window.confirm("Are you sure you want to reject this request?")) {
            return;
        }

        router.post(
            route("admin.user.approve", id),
            {
                status,
                user_id: user_id,
            },
            {
                onSuccess: () => {
                    alert("Request rejected successfully!");
                },
                onError: (errors) => {
                    alert(
                        errors.message ||
                            "An error occurred while processing the request."
                    );
                },
            }
        );
    };

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="w-40" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("admin.dashboard")}
                                >
                                    Dashboard
                                </NavLink>

                                <>
                                    <NavLink
                                        href={route("admin.category")}
                                        active={route().current(
                                            "admin.category"
                                        )}
                                    >
                                        Manajemen Kategori
                                    </NavLink>
                                    <NavLink
                                        href={route("admin.cosrent")}
                                        active={route().current(
                                            "admin.cosrent"
                                        )}
                                    >
                                        Manajemen Cosrent
                                    </NavLink>
                                    <NavLink
                                        href={route("admin.user")}
                                        active={route().current("admin.user")}
                                    >
                                        Manajemen User
                                    </NavLink>
                                </>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {auth.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 1 011.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="bg-white shadow dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        See Request Cosrent
                    </h2>
                </div>
            </header>

            <main>
                <Head title="See Request Cosrent" />

                <div className="m-10">
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

                    {/* Table */}
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Reason
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4">
                                            No data found.
                                        </td>
                                    </tr>
                                )}
                                {datas.map((data) => (
                                    <tr
                                        key={data.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4">
                                            {data.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.reason_to_be_cosrent}
                                        </td>

                                        {data.status === "approved" && (
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <button
                                                    disabled
                                                    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline cursor-not-allowed opacity-50"
                                                >
                                                    Approved
                                                </button>
                                            </td>
                                        )}

                                        {data.status === "rejected" && (
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <button
                                                    disabled
                                                    className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline cursor-not-allowed opacity-50"
                                                >
                                                    Rejected
                                                </button>
                                            </td>
                                        )}

                                        {data.status === "notyet" && (
                                            <td className="px-6 py-4 flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleReject(
                                                            data.id,
                                                            data.user_id,
                                                            "rejected"
                                                        )
                                                    }
                                                    className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                                                >
                                                    Reject
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleApprove(
                                                            data.id,
                                                            data.user_id,
                                                            "approved"
                                                        )
                                                    }
                                                    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                                                >
                                                    Approve
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
