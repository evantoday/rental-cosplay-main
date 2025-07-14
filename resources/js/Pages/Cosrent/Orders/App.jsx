import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function App({ datas }) {
    const { flash = {}, errors: pageErrors = {} } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    OrderList
                </h2>
            }
        >
            <Head title="OrderList" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
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
                    {datas.map((data) => (
                        <Link
                            key={data.id}
                            href={route("cosrent.order.show", data.id)}
                            className="group"
                        >
                            <div
                                className={`overflow-hidden shadow-sm sm:rounded-lg mb-5 ${
                                    data.status === "pending"
                                        ? "bg-yellow-400 dark:bg-yellow-600"
                                        : data.status === "confirmed"
                                        ? "bg-sky-400 dark:bg-sky-600"
                                        : data.status === "awaiting_payment"
                                        ? "bg-gray-500 dark:bg-gray-700"
                                        : data.status === "rejected"
                                        ? "bg-red-400 dark:bg-red-700"
                                        : data.status === "cancelled"
                                        ? "bg-red-400 dark:bg-red-700"
                                        : "bg-green-400 dark:bg-green-800"
                                } transition duration-300`}
                            >
                                <div className="p-6 text-gray-900 dark:text-gray-100 text-left flex justify-between items-center relative">
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            {data.user_name}
                                        </h2>
                                        <p className="mt-2">
                                            {data.costume_name}
                                        </p>
                                    </div>
                                    <p className="text-right font-extrabold">
                                        {data.status.toUpperCase()}
                                    </p>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 text-white text-center">
                                        <span className="text-lg hidden group-hover:block">
                                            Click for details
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {datas.length === 0 && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                No Data!
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
