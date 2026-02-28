import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Select, Transition } from "@headlessui/react";
import { Link, useForm } from "@inertiajs/react";
import Selectbox from "@/Components/Selectbox";
import { use } from "react";
import roles from "@/roles.json";
import ButtonRunPython from "@/Components/ButtonRunPython";

export default function UserEdit({ auth, user }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            password: "",
            password_confirmation: "",
            role: user.role,
        });

    /* swal.fire alert */
    const toast = (icon, title) => {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon,
            title,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route("users.update", user.id), {
            preserveScroll: true,
            onSuccess: () => toast("success", "User berhasil update"),
            onError: (errors) => {
                if (errors.email) toast("error", errors.email);
                else if (errors.role) toast("error", errors.role);
                else if (errors.password) toast("error", errors.password);
                else toast("error", "Gagal menyimpan data");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <section className="w-3/4">
                            <div className="p-6 text-gray-900">
                                <section className="max-w-xl">
                                    <header>
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Edit User
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Edit user detail.
                                        </p>
                                    </header>

                                    <form
                                        onSubmit={submit}
                                        className="mt-6 space-y-6"
                                    >
                                        <div>
                                            <InputLabel
                                                htmlFor="name"
                                                value="Name"
                                            />

                                            <TextInput
                                                id="name"
                                                className="mt-1 block w-full"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                isFocused
                                                autoComplete="name"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.name}
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="email"
                                                value="Email"
                                            />

                                            <TextInput
                                                id="email"
                                                type="email"
                                                className="mt-1 block w-full"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                autoComplete="username"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.email}
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="role"
                                                value="Role"
                                            />

                                            <Selectbox
                                                onChange={(e) =>
                                                    setData(
                                                        "role",
                                                        e.target.value,
                                                    )
                                                }
                                                id="role"
                                                currentValue={data.role}
                                                options={roles}
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.role}
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="password"
                                                value="New Password"
                                            />

                                            <TextInput
                                                id="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value,
                                                    )
                                                }
                                                type="password"
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                            />

                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="password_confirmation"
                                                value="Confirm Password"
                                            />

                                            <TextInput
                                                id="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value,
                                                    )
                                                }
                                                type="password"
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                            />

                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <PrimaryButton
                                                disabled={processing}
                                            >
                                                Save
                                            </PrimaryButton>

                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">
                                                    Saved.
                                                </p>
                                            </Transition>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </section>
                        <section className="ml-6 pt-6 w-1/4">
                            <ButtonRunPython
                                label="Take Photos"
                                routeUrl="users.takePhoto"
                                className ="mb-6"
                                userId={user.id}
                                messageSuccess="Penyimpanan dataset berhasil"
                                messageFailed="Penyimpanan dataset tidak berhasil"
                            />
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
