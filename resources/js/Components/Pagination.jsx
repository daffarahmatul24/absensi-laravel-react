import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="flex mt-8 space-x-2">
            {links.map((link, index) => {
                // If link.url is null (disabled state), render as span
                if (!link.url) {
                    return (
                        <span
                            key={index}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-gray-100 text-gray-400 cursor-not-allowed"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={
                            link.active
                                ? "bg-indigo-600 text-white px-4 py-2 border border-indigo-600 rounded-md"
                                : "text-primary hover:bg-indigo-600 px-4 py-2 hover:text-white border rounded-md"
                        }
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}
