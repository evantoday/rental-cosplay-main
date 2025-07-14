import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Detail({ datas }) {
    const handleBan = () => {
        const confirmBan = window.confirm("Are you sure to Banned this User?");
        if (confirmBan) {
            router.put(route("admin.user.banned", datas.id));
        }
    };

    const handleUnban = () => {
        const confirmUnban = window.confirm(
            "Are you sure to Unbanned this User?"
        );
        if (confirmUnban) {
            router.put(route("admin.user.unban", datas.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail User
                </h2>
            }
        >
            <Head title="Detail User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <p className="text-xl font-semibold">
                                {datas.name}
                            </p>
                            <p className="text-lg">{datas.email}</p>
                            <div className="flex justify-end">
                                {datas.status === "active" ? (
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        onClick={handleBan}
                                    >
                                        Ban
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        onClick={handleUnban}
                                    >
                                        Unban
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
