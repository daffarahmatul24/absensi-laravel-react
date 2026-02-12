import Pagination from "@/Components/Pagination";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AttendanceIndex({ auth, attendances }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Attendances
                </h2>
            }
        >
            <Head title="Attendances" />
            <div className="p-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between p-5 border-b">
                        <h2 className="text-lg font-semibold text-gray-700">
                            📋 Data Absensi
                        </h2>
                        <span className="text-sm text-gray-500">
                            Total: {attendances.total}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="px-6 py-3 text-left font-medium">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium">
                                        Alamat
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {attendances.data.map((row, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 text-gray-700">
                                            {row.created_at}
                                        </td>

                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {row.user.name}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold 
                                    ${
                                        row.status === "attend"
                                            ? "bg-green-100 text-green-700"
                                            : row.status === "sick"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                            >
                                                {row.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-gray-600 max-w-md truncate">
                                            {row.address}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between p-4 border-t">
                        <div className="text-sm text-gray-500">
                            Page {attendances.current_page} of{" "}
                            {attendances.last_page}
                        </div>

                        <div className="flex items-center gap-1">
                            {/* Prev */}
                            <a
                                href={attendances.prev_page_url || "#"}
                                onClick={(e) =>
                                    !attendances.prev_page_url &&
                                    e.preventDefault()
                                }
                                className={`px-3 py-2 rounded-lg border text-sm transition
                ${
                    !attendances.prev_page_url
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                            >
                                «
                            </a>

                            {/* Number Pages */}
                            {attendances.links
                                .filter(
                                    (link) =>
                                        !["Previous", "Next"].includes(
                                            link.label
                                        ) && !link.label.includes("&")
                                )
                                .map((link, i) => (
                                    <a
                                        key={i}
                                        href={link.url || "#"}
                                        onClick={(e) =>
                                            !link.url && e.preventDefault()
                                        }
                                        className={`px-3 py-2 rounded-lg border text-sm font-medium transition
                        ${
                            link.active
                                ? "bg-indigo-600 text-white border-indigo-600 scale-105"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                        }`}
                                    >
                                        {link.label}
                                    </a>
                                ))}

                            {/* Next */}
                            <a
                                href={attendances.next_page_url || "#"}
                                onClick={(e) =>
                                    !attendances.next_page_url &&
                                    e.preventDefault()
                                }
                                className={`px-3 py-2 rounded-lg border text-sm transition
                ${
                    !attendances.next_page_url
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
                            >
                                »
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-2">
                        <label className="font-bold">
                            Total : {attendances.total}
                        </label>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2">
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black ">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black ">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black ">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black w-1/2">
                                            Alamat
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendances.data.map(
                                        ({
                                            id,
                                            user,
                                            created_at,
                                            address,
                                            status,
                                        }) => (
                                            <tr key={id} className="border-b odd:bg-white even:bg-slate-200">
                                                <td className="px-6 py-4  text-sm">
                                                    {created_at}
                                                </td>
                                                <td className="px-6 py-4  text-sm">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4  text-sm ">
                                                    {status}
                                                </td>
                                                <td className="px-6 py-4  text-sm">
                                                    {address}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            <Pagination links={attendances.links} />
                        </div>
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
