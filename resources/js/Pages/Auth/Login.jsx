import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <div className="flex justify-between">
                        <InputLabel htmlFor="password" value="Password" />

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex justify-center">
                    <PrimaryButton
                        className="w-full text-center flex justify-center"
                        disabled={processing}
                    >
                        login
                    </PrimaryButton>
                </div>

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300 "></div>
                    <span className="mx-2 text-gray-500 text-sm">or</span>
                    <div className="flex-grow border-t border-gray-300 "></div>
                </div>

                <div className="mt-4 flex just-center">
                    <PrimaryButton
                        className="w-full text-center flex justify-center"
                        disabled={processing}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            className="h-5 w-5 mr-2"
                        >
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.2 0 6.2 1.2 8.5 3.3l6.4-6.4C34.6 3 29.6 1 24 1 14.7 1 7 7.6 4.1 16.2l7.5 5.8C13.4 14 18.2 9.5 24 9.5z"
                            />
                            <path
                                fill="#34A853"
                                d="M9.6 26c-1.2-3.4-1.2-7.2 0-10.6l-7.5-5.8C.3 14.3 0 19.1 0 24c0 4.9.3 9.7 2.1 14.4l7.5-5.8c-1.3-3.3-1.3-7.2 0-10.6z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M24 46c-5.4 0-10.4-2-14.3-5.4l-7.5 5.8C7 46.4 15.4 48 24 48c5.6 0 10.6-1.2 14.9-3.5l-6.4-6.4c-2.4 1.6-5.3 2.4-8.5 2.4z"
                            />
                            <path
                                fill="#4285F4"
                                d="M47.5 20H24v8h13.1c-1.3 3.4-3.7 6.2-6.7 8.2l6.4 6.4C43.2 38 48 31.6 48 24c0-1.3-.2-2.6-.5-4z"
                            />
                        </svg>
                        <span> Sign in with Google</span>
                    </PrimaryButton>
                </div>

                <div className="mt-4">
                    <p className="text-gray-400">
                        Dont have account?
                        <Link
                            href={route("register")}
                            className="ml-2 hover:text-blue-400"
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
