import { useForm } from "@inertiajs/react";

const SendRequestCosrent = ({ className = "", status }) => {
    const { data, setData, post, processing, errors } = useForm({
        reason_to_be_cosrent: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("user.request"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Request Cosrent
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Jika Anda ingin menjadi cosrent, silahkan isi form dibawah
                </p>
            </header>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="mb-4">
                    <label
                        htmlFor="reason_to_be_cosrent"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3"
                    >
                        Alasan Anda ingin menjadi cosrent
                    </label>
                    <input
                        type="text"
                        id="reason_to_be_cosrent"
                        value={data.reason_to_be_cosrent}
                        disabled={status}
                        onChange={(e) =>
                            setData("reason_to_be_cosrent", e.target.value)
                        }
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 ${
                            errors.reason_to_be_cosrent ? "border-red-500" : ""
                        }`}
                        required
                    />
                    {errors.reason_to_be_cosrent && (
                        <span className="text-sm text-red-600 dark:text-red-400">
                            {errors.reason_to_be_cosrent}
                        </span>
                    )}
                </div>

                <div className="flex justify-start">
                    <button
                        type="submit"
                        disabled={status}
                        className={
                            "inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-100 dark:hover:bg-white dark:text-gray-600 dark:focus:ring-offset-gray-800" +
                            (status ? " disabled:opacity-50" : "")
                        }
                    >
                        {processing ? "Requesting..." : "Send Request"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SendRequestCosrent;
