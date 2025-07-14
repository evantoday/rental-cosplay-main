import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Dashboard({ username, cosrent }) {
    const handleExportPDF = async (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to export this data?")) {
            try {
                const response = await fetch(
                    route("cosrent.export-pdf", cosrent.id),
                    {
                        method: "GET",
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                        },
                    }
                );

                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;

                    link.download = `${
                        cosrent.cosrent_name
                    }-${new Date().toISOString()}.pdf`;
                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                }
            } catch (error) {
                console.error("Error downloading PDF:", error);
                alert("Failed to download PDF");
            }
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <button
                        onClick={(e) => {
                            handleExportPDF(e);
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex gap-2 items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-6"
                        >
                            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                        </svg>
                        Export PDF
                    </button>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in! {username}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
