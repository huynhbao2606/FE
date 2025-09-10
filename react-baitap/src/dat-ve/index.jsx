import {useSelector} from "react-redux";
import DatGhe from "./compoments/DatGhe/index.jsx";
import HangGhe from "./compoments/HangGhe/index.jsx";

export default function DatVe() {
    const soDoGhe = useSelector( (state) => state.datVe.soDoGhe );
    return (
        <div className="bookingMovie min-h-screen bg-black">
            <div className="bg-black/70 min-h-screen">
                <div className="container mx-auto px-4 py-10">
                    <h1 className="text-3xl text-center text-white font-bold mb-6">
                        ĐẶT VÉ XEM PHIM
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3">
                            <div className="flex justify-center mb-6">
                                <div className="screen text-center">Màn hình</div>
                            </div>

                            {soDoGhe.map((row, i) => (
                                <HangGhe key={row.hang || `row-${i}`} row={row} />
                            ))}


                        </div>

                        <div className="lg:w-1/3">
                            <div className="text-white mb-6 grid gap-3 grid-cols-1 sm:grid-cols-3">
                                <div className="flex items-center gap-2">
                                    <span className="ghe"></span> Ghế trống
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="ghe gheDangChon"></span> Ghế đang chọn
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="ghe gheDuocChon"></span> Ghế đã đặt
                                </div>
                            </div>

                            <DatGhe />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}