import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Select, Transition } from "@headlessui/react";
import { Link, useForm } from "@inertiajs/react";
import Selectbox from "@/Components/Selectbox";
import roles from "@/roles.json";
import Swal from "sweetalert2";

export default function UserCreate({ auth }) {
    const { data, setData, post, errors,reset, processing, recentlySuccessful } =
        useForm({
            uid: "",
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role: "user",
        });

    const submit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Menyimpan data",
            html: "Mohon tunggu...",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
        });

        post(route("users.store"), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "User berhasil ditambahkan",
                    toast: true,
                    position: "top-end",
                    timer: 1800,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            },
            onError: (errors) => {
                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Terjadi kesalahan saat menyimpan data",
                    confirmButtonText: "Tutup",
                    confirmButtonColor: "#ef4444",
                });
            },
        });
    };

    window.Echo.channel("read-rfid-channel").listen("ReadRfidEvent", (e) => {
        if(e.code == "EXISTS"){
            errors.uid = e.message;
            reset('uid');
        } else {
            errors.uid="";
            reset("uid");
            setData("uid", e.uid);
        }
    });

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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <section className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Create User
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Create a new user account.
                                    </p>
                                </header>

                                <form
                                    onSubmit={submit}
                                    className="mt-6 space-y-6"
                                >
                                    <div>
                                        <InputLabel
                                            htmlFor="uid"
                                            value="RFID"
                                        />

                                        <TextInput
                                            id="uid"
                                            className="mt-1 block w-full"
                                            value={data.uid}
                                            onChange={(e) =>
                                                setData("uid", e.target.value)
                                            }
                                            isFocused
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.uid}
                                        />
                                    </div>

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
                                                setData("name", e.target.value)
                                            }
                                            required
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
                                                setData("email", e.target.value)
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
                                                setData("role", e.target.value)
                                            }
                                            id="role"
                                            currentValue="user"
                                            options={roles}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.email}
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
                                                    e.target.value
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
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
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
                                        <PrimaryButton disabled={processing}>
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
