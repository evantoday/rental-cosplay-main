import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Detail({ datas }) {
    const {
        costum,
        tanggal_mulai_rental,
        tanggal_kembali_kostum,
        bukti_pembayaran,
        status,
    } = datas;

    const handleLanjutkanPembayaran = () => {
        router.get(route("rent.payment", datas.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Detail Order
                </h2>
            }
        >
            <Head title="Detail Order" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
            {/* Export Invoice PDF Button */}
            <div className="mb-6 text-right">
                <a
                    href={route('user.history.export.invoice', datas.id)}
                    target="_blank"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
                >
                    Export Invoice PDF
                </a>
            </div>
                            {/* Title */}
                            <h2 className="text-2xl font-semibold text-center mb-6">
                                Detail Penyewaan Kostum
                            </h2>

                            {/* Kostum Information */}
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Kostum Images */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={
                                            costum.images_of_costum[0]
                                                ?.images_link
                                        }
                                        alt={costum.name}
                                        className="w-64 h-64 object-cover rounded-lg"
                                    />
                                </div>
                                {/* Kostum Details */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {costum.name}
                                    </h3>
                                    <ul className="text-gray-300 space-y-1">
                                        <li>Brand: {costum.brand}</li>
                                        <li>
                                            Kategori: {costum.category?.name}
                                        </li>
                                        <li>
                                            Harga Sewa: Rp{" "}
                                            {parseInt(
                                                costum.price
                                            ).toLocaleString()}
                                        </li>
                                        <li>Ukuran: {costum.size}</li>
                                        <li>Stok: {costum.stock}</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Rental Information */}
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4">
                                    Informasi Penyewaan
                                </h3>
                                <ul className="text-gray-300 space-y-1">
                                    <li>
                                        Status Order:{" "}
                                        <span
                                            className={
                                                status === "pending"
                                                    ? "text-yellow-500"
                                                    : status === "confirmed"
                                                    ? "text-green-500"
                                                    : status ===
                                                      "awaiting_payment"
                                                    ? "text-rose-300"
                                                    : status ===
                                                      "waiting_confirmation"
                                                    ? "text-blue-600"
                                                    : status === "done"
                                                    ? "text-emerald-500"
                                                    : "text-red-500"
                                            }
                                        >
                                            {status}
                                        </span>
                                    </li>
                                    <li>
                                        Tanggal Mulai: {tanggal_mulai_rental}
                                    </li>
                                    <li>
                                        Tanggal Kembali:{" "}
                                        {tanggal_kembali_kostum}
                                    </li>
                                    <li>
                                        Bukti Pembayaran:{" "}
                                        <Link
                                            href={bukti_pembayaran}
                                            target="_blank"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Lihat Bukti
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Cosrent Information */}
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4">
                                    Informasi Penyedia
                                </h3>
                                <ul className="text-gray-300 space-y-1">
                                    <li>
                                        Nama Penyedia:{" "}
                                        {costum.cosrent.cosrent_name}
                                    </li>
                                    <li>Alamat: {costum.cosrent.address}</li>
                                    <li>
                                        Nomor Telepon:{" "}
                                        {costum.cosrent.telp_number}
                                    </li>
                                </ul>
                            </div>

                            {/* Additional Images */}
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4">
                                    Foto Tambahan Kostum
                                </h3>
                                <div className="flex gap-4">
                                    {costum.images_of_costum
                                        .slice(1)
                                        .map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.images_link}
                                                alt={`Kostum Tambahan ${
                                                    index + 1
                                                }`}
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                        ))}
                                </div>
                            </div>

                            {/* Deadline */}
                            {datas.status === "awaiting_payment" && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold mb-4">
                                        Lanjutkan Pembayaran
                                    </h3>
                                    <button
                                        onClick={handleLanjutkanPembayaran}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                    >
                                        Lanjut Bayar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
