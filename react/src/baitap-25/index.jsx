import { useState } from "react";
import "./style.css";
import Swal from "sweetalert2";


export default function BaiTap25() {
    const [glasses] = useState([
        { id: "v1", label: "Mẫu 1", thumb: "/images/g1.jpg", overlay: "/images/v1.png" },
        { id: "v2", label: "Mẫu 2", thumb: "/images/g2.jpg", overlay: "/images/v2.png" },
        { id: "v3", label: "Mẫu 3", thumb: "/images/g3.jpg", overlay: "/images/v3.png" },
        { id: "v4", label: "Mẫu 4", thumb: "/images/g4.jpg", overlay: "/images/v4.png" },
        { id: "v5", label: "Mẫu 5", thumb: "/images/g5.jpg", overlay: "/images/v5.png" },
        { id: "v6", label: "Mẫu 6", thumb: "/images/g6.jpg", overlay: "/images/v6.png" },
        { id: "v7", label: "Mẫu 7", thumb: "/images/g7.jpg", overlay: "/images/v7.png" },
        { id: "v8", label: "Mẫu 8", thumb: "/images/g8.jpg", overlay: "/images/v8.png" },
        { id: "v9", label: "Mẫu 9", thumb: "/images/g9.jpg", overlay: "/images/v9.png" },
    ]);

    const [selected, setSelected] = useState(null);


    const selectedGlass = glasses.find(g => g.id === selected) || null;


    const renderImage = () => {
        return(
            selectedGlass && (
                <img
                    src={selectedGlass.overlay}
                    alt={`Kính ${selectedGlass.label}`}
                    className="overlay"
                />
            )
        )
    }

    const renderStatus = () => {
        return(
            selectedGlass ? (
                <span className="badge text-bg-primary px-3 py-2">
                Đang chọn: {selectedGlass.label}
              </span>
            ) : (
                <span className="text-muted">Hãy chọn một mẫu kính phía dưới</span>
            )
        )
    }

    const renderGlass = () => {
        return(
            glasses.map(g => {
                const isActive = g.id === selected;
                return (
                    <div className="col" key={g.id}>
                        <button
                            type="button"
                            className={`btn p-0 w-100 border rounded-3 overflow-hidden thumb-btn ${isActive ? "active" : ""}`}
                            onClick={() => setSelected(g.id)}
                            aria-pressed={isActive}
                            aria-label={`Chọn ${g.label}`}
                        >
                            <img src={g.thumb} alt={g.label} className="w-100 d-block" loading="lazy" />
                        </button>
                    </div>
                );
            })
        )
    }

    const alert = (message) => {
        return Swal.fire({
            title: 'Success!',
            text: `${message}`,
            icon: 'success',
            confirmButtonText: 'Nice'
        }).then(r =>{
            console.log(r.dismiss)
        } )
    }

    return (
        <div className="container py-4 bg-body-tertiary rounded-3">
            <h1 className="text-center mb-4">Đổi Kính Online</h1>

            <div className="row g-4 align-items-start">
                <div className="col-12 col-lg-6 text-center">
                    <div className="model-wrap mx-auto">
                        <img
                            src="/images/model.jpg"
                            alt="Người mẫu"
                            className="img-thumbnail base"
                        />
                        {renderImage()}
                    </div>
                    <div className="pt-3">
                        {renderStatus()}
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="row row-cols-3 row-cols-md-4 g-3" role="grid" aria-label="Chọn mẫu kính">
                        {renderGlass()}
                    </div>

                    <div className="d-flex gap-2 mt-3">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setSelected(null)}
                        >
                            Bỏ chọn
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={!selectedGlass}
                            onClick={() => alert(`Đã chọn: ${selectedGlass?.label || ""}`)}
                        >
                            Xác nhận mẫu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
