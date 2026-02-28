import React, { useState } from "react";
import { router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Swal from "sweetalert2";

export default function ButtonRunPython({
    label,
    routeUrl,
    userId,
    messageSuccess,
    messageFailed,
    className,
}) {

    
    const [isProcess, setIsProcess] = useState(false);

    const runfunction = (e) => {
        e.preventDefault();
        setIsProcess(true);

        Swal.fire({
            title: "Mengambil lokasi...",
            text: "Mohon tunggu",
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
        });

        // Ambil lokasi user
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                let address = "";

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
                        { headers: { "User-Agent": "absensi-app/1.0" } },
                    );
                    const data = await res.json();
                    address = data.display_name ?? "Alamat tidak ditemukan";
                } catch (error) {
                    console.error(error);
                    address = "Gagal mengambil alamat";
                }

                Swal.close();

                // Kirim data ke backend
                router.post(
                    route(routeUrl, userId ?? null),
                    {
                        status: "attend",
                        latitude: lat,
                        longitude: lng,
                        address: address,
                    },{
                    onSuccess: () => {
                        setIsProcess(false);
                        Swal.fire({
                            icon: "success",
                            title: "Sukses",
                            text: messageSuccess,
                            toast: true,
                            position: "top-end",
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                        });
                    },
                    onError: () => {
                        setIsProcess(false);
                        Swal.fire({
                            icon: "error",
                            title: "Gagal",
                            text: messageFailed,
                            confirmButtonColor: "#ef4444",
                        });
                    },
                });
            },
            () => {
                Swal.close();
                Swal.fire({
                    icon: "warning",
                    title: "Lokasi Tidak Aktif",
                    text: "Aktifkan GPS untuk melakukan absensi",
                    confirmButtonColor: "#f59e0b",
                });
                setIsProcess(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
        );
    };

    return (
        <PrimaryButton
            disabled={isProcess}
            onClick={runfunction}
            className={`${className} flex items-center gap-2`}
        >
            {label}
            {isProcess && (
                <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            )}
        </PrimaryButton>
    );
}