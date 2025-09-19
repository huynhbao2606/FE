import { useDispatch, useSelector } from "react-redux";
import {addSinhVien, updateSinhVien, setSearch, setEditing} from "../redux/sinhVienSlice.js";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

export default function FormSinhVien() {
    const dispatch = useDispatch();
    const { editing, list } = useSelector((state) => state.sinhVienReducer);

    const [form, setForm] = useState({
        maSv: "",
        hoTen: "",
        sdt: "",
        email: "",
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (editing) setForm(editing);
    }, [editing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // --- VALIDATION ---
    const errors = useMemo(() => {
        const e = {};
        if (!form.maSv.trim()) e.maSv = "Mã SV không được để trống!!";
        else if (!/^[a-zA-Z0-9_-]{1,20}$/.test(form.maSv))
            e.maSv = "Mã SV chỉ gồm chữ/số/_-, tối đa 20 ký tự.";
        if (!editing && form.maSv && list?.some((x) => x.maSv === form.maSv)) {
            e.maSv = "Mã Sv đã tồn tại.";
        }

        if (!form.hoTen.trim()) e.hoTen = "Họ tên không được để trống!!.";
        else if (form.hoTen.trim().length < 2) e.hoTen = "Họ tên quá ngắn.";

        if (!form.sdt.trim()) e.sdt = "Số điện thoại không được để trống!!";
        else if (!/^0\d{9}$/.test(form.sdt))
            e.sdt = "SĐT phải 10 số và bắt đầu bằng 0.";

        if (!form.email.trim()) e.email = "Email không được để trống!!";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            e.email = "Email không hợp lệ.";

        return e;
    }, [form, editing, list]);

    const hasError = Object.keys(errors).length > 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (hasError) return;
        if (editing) {
            dispatch(updateSinhVien(form));
            dispatch(setEditing(null));
            Swal.fire({
                icon: "success",
                title: "Sữa sinh viên thành công!!",
                showConfirmButton: false,
                timer: 1500
            });

        } else {
            dispatch(addSinhVien(form));
            Swal.fire({
                icon: "success",
                title: "Thêm sinh viên thành công!!",
                showConfirmButton: false,
                timer: 1500
            });
        }
        setForm({ maSv: "", hoTen: "", sdt: "", email: "" });
        setSubmitted(false);
        setEditing(null)
    };

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Tìm sinh viên theo tên hoặc mã sv..."
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />

            {editing && <h2 className="text-lg font-semibold">Sửa Sinh Viên</h2>}

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md md:grid-cols-2"
            >
                <div>
                    <label className="mb-1 block text-sm font-medium">Mã SV</label>
                    <input
                        name="maSv"
                        value={form.maSv}
                        onChange={handleChange}
                        placeholder="Nhập mã sinh viên..."
                        disabled={!!editing}
                        className={`w-full rounded-lg border p-2 focus:ring ${
                            submitted && errors.maSv
                                ? "border-red-500 focus:ring-red-200"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                        }`}
                    />
                    {submitted && errors.maSv && (
                        <p className="mt-1 text-sm text-red-500">{errors.maSv}</p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Họ tên</label>
                    <input
                        name="hoTen"
                        value={form.hoTen}
                        onChange={handleChange}
                        placeholder="Nhập họ tên sinh viên..."
                        className={`w-full rounded-lg border p-2 focus:ring ${
                            submitted && errors.hoTen
                                ? "border-red-500 focus:ring-red-200"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                        }`}
                    />
                    {submitted && errors.hoTen && (
                        <p className="mt-1 text-sm text-red-500">{errors.hoTen}</p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Số điện thoại</label>
                    <input
                        name="sdt"
                        value={form.sdt}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại..."
                        className={`w-full rounded-lg border p-2 focus:ring ${
                            submitted && errors.sdt
                                ? "border-red-500 focus:ring-red-200"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                        }`}
                    />
                    {submitted && errors.sdt && (
                        <p className="mt-1 text-sm text-red-500">{errors.sdt}</p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="nhập email..."
                        className={`w-full rounded-lg border p-2 focus:ring ${
                            submitted && errors.email
                                ? "border-red-500 focus:ring-red-200"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                        }`}
                    />
                    {submitted && errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                </div>

                <div className="col-span-1 md:col-span-2">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                    >
                        {editing ? "Cập nhật" : "Thêm sinh viên"}
                    </button>
                </div>
            </form>
        </div>
    );
}
