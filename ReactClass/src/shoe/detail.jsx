import { useEffect } from "react";

export default function Detail({ open, detailShoe, onClose, handleAddToCart }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || !detailShoe) return null;

    const rows = [
        { label: "Name", value: detailShoe?.name },
        { label: "Alias", value: detailShoe?.alias },
        { label: "Price", value: detailShoe?.price },
        { label: "Description", value: detailShoe?.description },
        { label: "ShortDescription", value: detailShoe?.shortDescription },
        { label: "Quantity", value: detailShoe?.quantity },
    ];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
        >
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
            />

            <div className="relative z-10 w-full max-w-4xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Thông số kỹ thuật
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        aria-label="Đóng"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    <div className="flex items-center justify-center">
                        <img
                            src={detailShoe?.image}
                            alt={detailShoe?.name}
                            className="max-h-[420px] w-full object-contain rounded-lg"
                        />
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <tbody>
                            {rows.map((r, idx) => (
                                <tr
                                    key={r.label}
                                    className={`${
                                        idx % 2
                                            ? "bg-white dark:bg-gray-900"
                                            : "bg-gray-50 dark:bg-gray-800"
                                    } border-b last:border-b-0 dark:border-gray-700`}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap w-40"
                                    >
                                        {r.label}
                                    </th>
                                    <td className="px-6 py-4">{r.value || "-"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-gray-200 dark:border-gray-700 p-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                        Đóng
                    </button>
                    <button
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                        onClick={() => handleAddToCart?.(detailShoe)}
                    >
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    );
}
