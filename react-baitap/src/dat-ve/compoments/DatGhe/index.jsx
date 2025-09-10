import {useDispatch, useSelector} from "react-redux";
import {datGhe, huyGhe, huyTatCa } from "../../../store/datVe.js";
import Swal from 'sweetalert2'

const DatGhe = () => {
    const dispatch = useDispatch();
    const list = useSelector(s => s.datVe.gheDangChon);
    const VND = n => n.toLocaleString("vi-VN");
    const tong = list.reduce((t, g) => t + (g.gia || 0), 0);

    const handleHuyTatCa = () => {
        if(list.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Chưa có ghế nào được chọn',
                showConfirmButton: false,
                timer: 1500
            });
        }else {
            Swal.fire({
                title: 'Bạn có chắc muốn hủy tất cả ghế đã chọn?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Huỷ Tất Cả',
                cancelButtonText: 'Giữ Lại'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(huyTatCa());
                    Swal.fire({
                        icon: 'success',
                        title: 'Đã hủy tất cả ghế đã chọn',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        }
    }

    const handleDatGhe = () => {
        if(list.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Chưa có ghế nào được chọn',
                showConfirmButton: false,
                timer: 1500
            });
        }else {
            Swal.fire({
                title: 'Xác nhận đặt ghế?',
                text: `Bạn có chắc muốn đặt ${list.length} ghế với tổng tiền ${VND(tong)}đ?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đặt Ghế',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(datGhe());
                    Swal.fire({
                        icon: 'success',
                        title: 'Đặt ghế thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        }
    }


    return(
        <div className="bg-white/10 p-4 rounded-lg text-white">
            <h2 className="text-xl mb-3 font-semibold">Danh sách ghế bạn chọn</h2>

            {list.length === 0 ? (
                <p className="italic opacity-80">Chưa chọn ghế nào.</p>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                    <tr>
                        <th className="text-left py-2">Số ghế</th>
                        <th className="text-right py-2">Giá</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(g => (
                        <tr key={g.soGhe} className="border-t border-white/20">
                            <td className="py-2">{g.soGhe}</td>
                            <td className="py-2 text-right">{VND(g.gia)}đ</td>
                            <td className="py-2 text-right">
                                <button
                                    className="px-2 py-1 rounded bg-red-600 hover:bg-red-700"
                                    onClick={() => dispatch(huyGhe(g.soGhe))}
                                >
                                    Hủy
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot className="border-t border-white/30">
                    <tr>
                        <td className="py-3 font-semibold">Tổng tiền</td>
                        <td className="py-3 text-right font-bold">{VND(tong)}đ</td>
                        <td></td>
                    </tr>
                    </tfoot>
                </table>
            )}

            <div className="flex gap-2 mt-4">
                <button
                    className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
                    onClick={() => handleHuyTatCa()}
                >
                    Hủy tất cả
                </button>
                <button
                    className="px-4 py-2 rounded bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
                    onClick={() => handleDatGhe()}
                >
                    Đặt ghế
                </button>
            </div>
        </div>
    )
}

export default DatGhe;