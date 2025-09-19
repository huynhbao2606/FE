import { useDispatch, useSelector } from "react-redux";
import { deleteSinhVien, setEditing } from "../redux/sinhVienSlice.js";
import Swal from "sweetalert2";

export default function TableSinhVien() {
    const dispatch = useDispatch();
    const { list, search } = useSelector((state) => state.sinhVienReducer);

    const filtered = list.filter((item) => {
        if (!search.trim("")) return true;
        return (
            item.hoTen.toLowerCase().includes(search.toLowerCase()) ||
            item.maSv.toLowerCase().includes(search.toLowerCase())
        );
    });

    const deleteButton = (maSv) => {
        Swal.fire({
            title: "Bạn có chắc xoá sinh viên này?",
            text: "Điều này sẽ không thể phục hồi!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng Ý"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Đã xoá",
                    text: "Sinh viên đã được xoá!!",
                    icon: "success"
                });
                dispatch(deleteSinhVien(maSv));
            }
        });
    }


    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left font-semibold">Mã SV</th>
                    <th className="px-4 py-2 text-left font-semibold">Họ tên</th>
                    <th className="px-4 py-2 text-left font-semibold">SĐT</th>
                    <th className="px-4 py-2 text-left font-semibold">Email</th>
                    <th className="px-4 py-2 text-center font-semibold">Hành động</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {filtered.map((sv) => (
                    <tr key={sv.maSv} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{sv.maSv}</td>
                        <td className="px-4 py-2">{sv.hoTen}</td>
                        <td className="px-4 py-2">{sv.sdt}</td>
                        <td className="px-4 py-2">{sv.email}</td>
                        <td className="px-4 py-2 text-center space-x-2">
                            <button
                                onClick={() => dispatch(setEditing(sv))}
                                className="rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                            >
                                Sửa
                            </button>
                            <button
                                onClick={() => deleteButton(sv.maSv)}
                                className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                            >
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                {filtered.length === 0 && (
                    <tr>
                        <td
                            colSpan="5"
                            className="px-4 py-3 text-center text-gray-500 italic"
                        >
                            Không tìm thấy sinh viên
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
