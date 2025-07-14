import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage, router } from "@inertiajs/react";
import Cosrent from "@/Pages/Admin/Cosrent/App";

export default function UpdateProfileInformation({
    userRole,
    mustVerifyEmail,
    status,
    className = "",
    cosrent_account = [],
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            cosrent_name: cosrent_account.cosrent_name || "",
            telp_number: cosrent_account.telp_number || "",
            address: cosrent_account.address || "",
            cosrent_id: cosrent_account.id,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    const submitCosrent = (e) => {
        e.preventDefault();
        router.post(route("profile.cosrent.update"), data, {
            preserveScroll: true,
            onSuccess: () => {
                recentlySuccessful(true);
            },
        });
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                {userRole === "cosrent" && (
                    <div className="space-y-6">
                        <div>
                            <InputLabel
                                htmlFor="cosrent_name"
                                value="Nama Cosrent"
                            />
                            <TextInput
                                id="cosrent_name"
                                placeholder="Masukan Nama Cosrent..."
                                type="text"
                                className="mt-1 block w-full"
                                value={data.cosrent_name}
                                onChange={(e) =>
                                    setData("cosrent_name", e.target.value)
                                }
                                required
                                autoComplete="off"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.cosrent_name}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="telp_number"
                                value="Nomor Telepon"
                            />
                            <TextInput
                                id="telp_number"
                                type="number"
                                placeholder="Masukan Nomor Telepon..."
                                className="mt-1 block w-full"
                                value={data.telp_number}
                                onChange={(e) =>
                                    setData("telp_number", e.target.value)
                                }
                                required
                                autoComplete="off"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.telp_number}
                            />
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="address"
                                value="Alamat Lengkap"
                            />
                            <TextInput
                                id="address"
                                type="text"
                                placeholder="Masukan Alamat Lengkap Cosrent..."
                                className="mt-1 block w-full"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                required
                                autoComplete="off"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.address}
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    {userRole === "cosrent" ? (
                        <PrimaryButton
                            onClick={submitCosrent}
                            disabled={processing}
                        >
                            Save
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton disabled={processing}>
                            Save
                        </PrimaryButton>
                    )}

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
