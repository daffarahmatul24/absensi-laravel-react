import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import Selectbox from "@/Components/Selectbox";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

export default function SubmitAttendance() {
    const [transitioning, setTransitioning] = useState("false");

    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        transform,
    } = useForm({
        status: "attend",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Mengambil lokasi...",
            text: "Mohon tunggu",
            showConfirmButton: false,
            backdrop: true,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                Swal.close();

                setData({
                    ...data,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

                post(route("attendances.submit"), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Berhasil",
                            text: "Absensi berhasil disubmit",
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            toast: true,
                            position: "top-end",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal",
                            text: "Tidak dapat menyimpan absensi",
                            confirmButtonColor: "#ef4444",
                        });
                    },
                });
            },
            () => {
                Swal.fire({
                    icon: "warning",
                    title: "Lokasi Tidak Aktif",
                    text: "Aktifkan GPS untuk melakukan absensi",
                    confirmButtonColor: "#f59e0b",
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    // const submit = (e) => {
    //     e.preventDefault();

    //     navigator.geolocation.getCurrentPosition(
    //         function (position) {

    //             setData("prepareData", {
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //             });
    //         },
    //         function (error) {
    //             alert("tidak ada lokasi");
    //         }
    //     );
    // };

    // useEffect(() => {
    //     if (
    //         data.prepareData.hasOwnProperty("latitude") &&
    //         data.prepareData.hasOwnProperty("longitude")
    //     ) {
    //         transform((data) => ({
    //             ...data.prepareData,
    //             status: data.status,
    //             description: data.description,
    //         }));

    //         post(route("attendances.submit"), {
    //             preserveScroll: true,
    //             onSuccess: () => {
    //                 alert("Absensi berhasil disubmit");
    //             },
    //             onError: (errors) => {
    //                 alert("Gagal submit absensi");
    //             },
    //         });
    //     }
    // }, [data.prepareData]);

    useEffect(() => {
        if (data.status === "attend") {
            setTransitioning(false);
        } else {
            setTransitioning(true);
        }
    }, [data.status]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="info" value="Silahkan lakukan absensi" />

                <Selectbox
                    onChange={(e) => setData("status", e.target.value)}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                    options={[
                        { value: "attend", label: "Hadir" },
                        { value: "leave", label: "Cuti" },
                        { value: "sick", label: "Sakit" },
                        { value: "permit", label: "Izin" },
                        { value: "business_trip", label: "Perjalanan Dinas" },
                        {
                            value: "remote",
                            label: "Kerja Remote (diluar kantor)",
                        },
                    ]}
                />
                <InputError className="mt-2" message={errors.status} />
            </div>
            <Transition
                show={transitioning}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div>
                    <InputLabel htmlFor="description" value="Penjelasan" />

                    <TextInput
                        onChange={(e) => setData("description", e.target.value)}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>
            </Transition>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Absensi</PrimaryButton>
            </div>
        </form>
    );
}
