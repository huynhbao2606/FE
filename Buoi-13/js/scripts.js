function QuanLyTuyenSinh() {
    const inputDiemChuan  = parseFloat(getId('inputDiemChuan'));
    const inputDiemThu1   = parseFloat(getId('inputDiemThu1'));
    const inputDiemThu2   = parseFloat(getId('inputDiemThu2'));
    const inputDiemThu3   = parseFloat(getId('inputDiemThu3'));
    const inputKhuVuc     = getId('inputKhuVuc');
    const inputDoiTuong   = parseInt(getId('inputDoiTuong'));

    if (
        isNaN(inputDiemChuan) || isNaN(inputDiemThu1) || isNaN(inputDiemThu2) || isNaN(inputDiemThu3)
    ) {
        hienThongBao("Lỗi", "Vui lòng nhập đầy đủ!!", "error");
        return;
    }

    let uuTienKhuVuc = 0;
    if (inputKhuVuc === 'A') uuTienKhuVuc = 2;
    else if (inputKhuVuc === 'B') uuTienKhuVuc = 1;
    else if (inputKhuVuc === 'C') uuTienKhuVuc = 0.5;

    let uuTienDoiTuong = 0;
    if (inputDoiTuong === 1) uuTienDoiTuong = 2.5;
    else if (inputDoiTuong === 2) uuTienDoiTuong = 1.5;
    else if (inputDoiTuong === 3) uuTienDoiTuong = 1;

    if (inputDiemThu1 === 0 || inputDiemThu2 === 0 || inputDiemThu3 === 0) {
        hienThongBao(`Thông báo kết quả`, `Bạn đã rớt vì có môn bị điểm 0`, 'error');
        return;
    }

    let tongDiem = inputDiemThu1 + inputDiemThu2 + inputDiemThu3 + uuTienKhuVuc + uuTienDoiTuong;

    if (tongDiem >= inputDiemChuan) {
        hienThongBao(`Kết quả`, `Bạn đã đậu.\nTổng điểm: ${tongDiem}`, 'success');
    } else {
        hienThongBao(`Kết quả`, `Bạn đã rớt.\nTổng điểm: ${tongDiem}`, 'error');
    }
}

function TinhTienDien() {
    const txtTen = getId('txtTen');
    const inputSoKw = parseFloat(getId('inputSoKw'));

    if (txtTen.trim() === '' || isNaN(inputSoKw)) {
        hienThongBao("Lỗi", "Vui lòng nhập họ tên và số Kw hợp lệ!", "error");
        return;
    }

    let tongTien;

    if (inputSoKw <= 50) {
        tongTien = inputSoKw * 500;
    } else if (inputSoKw <= 100) {
        tongTien = 50 * 500 + (inputSoKw - 50) * 650;
    } else if (inputSoKw <= 200) {
        tongTien = 50 * 500 + 50 * 650 + (inputSoKw - 100) * 850;
    } else if (inputSoKw <= 350) {
        tongTien = 50 * 500 + 50 * 650 + 100 * 850 + (inputSoKw - 200) * 1100;
    } else {
        tongTien = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (inputSoKw - 350) * 1300;
    }

    hienThongBao(`Tính tiền điện`, `Họ tên: ${txtTen} | Tổng tiền: ${tongTien.toLocaleString()}đ`, 'success');
}

function TinhThueCaNhan() {
    const txtTenCaNhan = getId('txtTenCaNhan');
    const inputThuNhap = parseFloat(getId('inputThuNhap'));
    const inputPhuThuoc = parseInt(getId('inputPhuThuoc'));

    if (!txtTenCaNhan.trim() || inputThuNhap === "" || isNaN(inputThuNhap) || inputPhuThuoc === "" || isNaN(inputPhuThuoc)) {
        hienThongBao("Lỗi", "Vui lòng nhập đầy đủ!", "error");
        return;
    }



    let tinhThue = inputThuNhap - 4e6 - inputPhuThuoc * 1.6e6;

    let thue;

    if(tinhThue > 0 && tinhThue <= 6e7) {
        thue = tinhThue * 0.05;
    }else if(tinhThue <= 12e7) {
        thue = tinhThue * 0.10;
    }else if(tinhThue <= 21e7) {
        thue = tinhThue * 0.15;
    }else if(tinhThue <= 384e6) {
        thue = tinhThue * 0.20;
    }else if(tinhThue <= 624e6) {
        thue = tinhThue * 0.25;
    }else if(tinhThue <= 960e6) {
        thue = tinhThue * 0.30;
    }else if(tinhThue > 960e6) {
        thue = tinhThue * 0.35;
    }else {
        hienThongBao("Lỗi", "Số Tiền Không Hợp Lệ!!",'error')
    }

    const formatThue = new Intl.NumberFormat("vi-VN").format(thue);

    hienThongBao("Tiền Thuế",`Họ Tên: ${txtTenCaNhan} | Tiền Thu Nhập Cá Nhân: ${formatThue} VNĐ`,'success');

}

function TinhTienCap() {
    const value = this.value;
    const inputSoKetNoi = document.getElementById("divKetNoi");

    if (value === "DoanhNghiep") {
        inputSoKetNoi.classList.remove("hidden");
        inputSoKetNoi.classList.add("block");
    } else {
        inputSoKetNoi.classList.remove("block");
        inputSoKetNoi.classList.add("hidden");
    }
}


document.getElementById('btnTinhTienCap').onclick = function () {
    const inputKhachHang = getId('inputKhachHang');
    const txtMaKhachHang = getId('txtMaKhachHang');
    const inputSoKenh = parseFloat(getId('inputSoKenh'));
    const inputSoKetNoi = parseFloat(getId('inputSoKetNoi'));

    if (txtMaKhachHang.trim() === '' || isNaN(inputSoKenh)) {
        hienThongBao("Lỗi", "Vui lòng nhập mã khách hàng và số kênh hợp lệ!", "error");
        return;
    }

    let tongTien = 0;

    if (inputKhachHang === "NhaDan") {
        tongTien = 4.5 + 20.5 + inputSoKenh * 7.5;
    } else if (inputKhachHang === "DoanhNghiep") {
        if (isNaN(inputSoKetNoi)) {
            hienThongBao("Lỗi", "Vui lòng nhập số kết nối!", "error");
            return;
        }

        let phiCoBan = 75;
        if (inputSoKetNoi > 10) {
            phiCoBan += (inputSoKetNoi - 10) * 5;
        }

        tongTien = 15 + phiCoBan + inputSoKenh * 50;
    } else {
        hienThongBao("Lỗi", "Vui lòng chọn loại khách hàng!", "error");
        return;
    }

    const formatTongTien = new Intl.NumberFormat("vi-VN").format(tongTien);

    hienThongBao("Tính Tiền Cáp", `Mã khách hàng: ${txtMaKhachHang} | Tiền cáp: ${formatTongTien} VNĐ`, "success");
};

document.getElementById('btnKetQua').onclick = QuanLyTuyenSinh;
document.getElementById('btnTinhTienDien').onclick = TinhTienDien;
document.getElementById('btnTinhTienThue').onclick = TinhThueCaNhan;
document.getElementById('inputKhachHang').onchange = TinhTienCap;


function getId(id) {
    return document.getElementById(id).value;
}

function hienThongBao(tieuDe, noiDung, loai = "success") {
    Swal.fire({
        title: tieuDe,
        text: noiDung,
        icon: loai,
        confirmButtonText: "Đóng",
        timer: 3000,
        timerProgressBar: true,
    });
}
