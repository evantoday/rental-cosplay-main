import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Create() {
    const { flash = {}, errors: pageErrors = {} } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        cosrent_name: "",
        email: "",
        telp_number: "",
        address: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.cosrent.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Cosrent
                </h2>
            }
        >
            <Head title="Create Cosrent" />

            <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
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

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="cosrent_name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3"
                        >
                            Cosrent Name
                        </label>
                        <input
                            type="text"
                            id="cosrent_name"
                            value={data.cosrent_name}
                            onChange={(e) =>
                                setData("cosrent_name", e.target.value)
                            }
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                                errors.cosrent_name ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {errors.cosrent_name && (
                            <span className="text-sm text-red-600 dark:text-red-400">
                                {errors.cosrent_name}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3"
                        >
                            Cosrent Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                                errors.email ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {errors.email && (
                            <span className="text-sm text-red-600 dark:text-red-400">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="telp_number"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            keyboardtype="phone-pad"
                            id="telp_number"
                            value={data.telp_number}
                            onChange={(e) =>
                                setData("telp_number", e.target.value)
                            }
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                                errors.telp_number ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {errors.telp_number && (
                            <span className="text-sm text-red-600 dark:text-red-400">
                                {errors.telp_number}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3"
                        >
                            Address
                        </label>
                        <textarea
                            id="address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                                errors.address ? "border-red-500" : ""
                            }`}
                            required
                        />
                        {errors.address && (
                            <span className="text-sm text-red-600 dark:text-red-400">
                                {errors.address}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
                        >
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
