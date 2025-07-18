// ============================
// Bài 1: Tính Lương
// ============================

// Phân Tích
//  Nhập vào: lương một ngày và số ngày làm.
//  Kiểm tra cả hai có hợp lệ không (phải là số, không để trống).
//  Nếu hợp lệ:
//      Tính tổng lương = lương/ngày × số ngày làm.
//      Định dạng kết quả sang tiền Việt Nam (VND).
//      Hiển thị thông báo kết quả.
//  Nếu sai:
//      Hiển thị thông báo lỗi.

// Xử Lý
//  Lấy giá trị từ input: luongMotNgay, soNgayLam.
//  Ép kiểu bằng parseFloat hoặc nhân trực tiếp.
//  Nếu hợp lệ:
//      Tính tổng lương.
//      Dùng Intl.NumberFormat("vi-VN") định dạng tiền.
//      Gọi hienThongBao("alertBai1", ..., "success").
//  Nếu sai:
//      Gọi hienThongBao("alertBai1", ..., "error").

// Đầu Ra
//  Nếu đúng: "Số Tiền Lương: 3.000.000 ₫"
//  Nếu sai: "Vui lòng nhập đúng số!"
document.getElementById("tinhLuong").onclick = function () {
    let luongMotNgay = document.getElementById("luongMotNgay").value;
    let soNgayLam = document.getElementById("soNgayLam").value;

    if (luongMotNgay && soNgayLam) {
        const tinhLuong = luongMotNgay * soNgayLam;
        const tingLuongVND = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
        }).format(tinhLuong);

        hienThongBao("alertBai1", "Số Tiền Lương: " + tingLuongVND, "success");
    } else {
        hienThongBao("alertBai1", "Vui lòng nhập số!", "error");
    }
}

// ============================
// Bài 2: Tính Trung Bình
// ============================

// Phân Tích
//  Nhập 5 số từ người dùng.
//  Kiểm tra tất cả số có hợp lệ hay không (là số, không rỗng).
//  Nếu hợp lệ → tính trung bình 5 số.
//  Nếu sai → báo lỗi.

// Xử Lý
//  Lấy từng giá trị: soThuNhat → soThuNam.
//  Ép kiểu bằng parseFloat.
//  Nếu hợp lệ:
//      Tính tổng và chia cho 5.
//      Gọi hienThongBao("alertBai2", ..., "success").
//  Nếu sai:
//      Gọi hienThongBao("alertBai2", ..., "error").

// Đầu Ra
//  Nếu đúng: "Tính Trung Bình Là: X"
//  Nếu sai: "Vui lòng nhập số!"
document.getElementById("tinhTrungBinh").onclick = function () {
    let soThuNhat = parseFloat(document.getElementById("soThuNhat").value);
    let soThuHai = parseFloat(document.getElementById("soThuHai").value);
    let soThuBa = parseFloat(document.getElementById("soThuBa").value);
    let soThuTu = parseFloat(document.getElementById("soThuTu").value);
    let soThuNam = parseFloat(document.getElementById("soThuNam").value);

    if (soThuNhat && soThuHai && soThuBa && soThuTu && soThuNam) {
        const tinhTrungBinh = (soThuNhat + soThuHai + soThuBa + soThuTu + soThuNam) / 5;

        hienThongBao("alertBai2", "Tính Trung Bình Là: " + tinhTrungBinh, "success");
    } else {
        hienThongBao("alertBai2", "Vui lòng nhập số!", "error");
    }
}

// ============================
// Bài 3: Quy Đổi Tiền Tệ
// ============================

// Phân Tích
//  Nhập tỷ giá quy đổi và số USD.
//  Kiểm tra cả hai giá trị có hợp lệ không (là số, không rỗng).
//  Nếu hợp lệ:
//      Tính số tiền VND bằng USD × tỷ giá.
//      Định dạng theo chuẩn VND.
//      Hiển thị kết quả.
//  Nếu sai → hiển thị thông báo lỗi.

// Xử Lý
//  Lấy tyLeTienTe và quyDoi.
//  Ép kiểu bằng parseFloat.
//  Nếu hợp lệ:
//      Tính tiền: USD × tỷ lệ.
//      Dùng Intl.NumberFormat("vi-VN") định dạng VND.
//      Gọi hienThongBao("alertBai3", ..., "success").
//  Nếu sai:
//      Gọi hienThongBao("alertBai3", ..., "error").

// Đầu Ra
//  Nếu đúng: "Tiền VND Là: xxx.xxx ₫"
//  Nếu sai: "Vui lòng nhập đúng số!"
document.getElementById("quyDoiTien").onclick = function () {
    let tyLeTienTe = document.getElementById("tyLeTienTe").value;
    let quyDoi = document.getElementById("quyDoi").value;

    if (tyLeTienTe && quyDoi) {
        const tinhTienTe = tyLeTienTe * quyDoi;
        const tienVND = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
        }).format(tinhTienTe);

        hienThongBao("alertBai3", "Tiền VND Là: " + tienVND, "success");
    } else {
        hienThongBao("alertBai3", "Vui lòng nhập số!", "error");
    }
}

// ============================
// Bài 4: Tính Chu Vi – Diện Tích
// ============================

// Phân Tích
//  Nhập chiều dài và chiều rộng hình chữ nhật.
//  Kiểm tra cả hai có hợp lệ (số, không rỗng).
//  Nếu hợp lệ:
//      Tính diện tích = dài × rộng.
//      Tính chu vi = (dài + rộng) × 2.
//      Hiển thị kết quả 2 dòng.
//  Nếu sai → thông báo lỗi.

// Xử Lý
//  Lấy chieuDai và chieuRong.
//  Ép kiểu bằng parseFloat.
//  Nếu hợp lệ:
//      Tính diện tích, chu vi.
//      Gộp 2 dòng bằng `\n`.
//      Gọi hienThongBao("alertBai4", ..., "success").
//  Nếu sai:
//      Gọi hienThongBao("alertBai4", ..., "error").

// Đầu Ra
//  Nếu đúng: "Diện Tích: X\nChu Vi: Y"
//  Nếu sai: "Vui lòng nhập đúng số!"
document.getElementById("tinhCVDT").onclick = function () {
    let chieuDai = parseFloat(document.getElementById("chieuDai").value);
    let chieuRong = parseFloat(document.getElementById("chieuRong").value);

    if (chieuDai && chieuRong) {
        const tinhDienTich = chieuDai * chieuRong;
        const tinhChuVi = (chieuDai + chieuRong) * 2;

        const noiDung = "Diện Tích: " + tinhDienTich + "\n" + "Chu Vi: " + tinhChuVi;

        hienThongBao("alertBai4", noiDung, "success");
    } else {
        hienThongBao("alertBai4", "Vui lòng nhập số!", "error");
    }
}

// ============================
// Bài 5: Tính Tổng 2 Ký Tự Số
// ============================

// Phân Tích
//  Nhập một số nguyên có 2 chữ số (từ 10 đến 99).
//  Kiểm tra có hợp lệ không.
//  Nếu hợp lệ:
//      Lấy chữ số hàng chục và hàng đơn vị.
//      Tính tổng 2 chữ số.
//      Hiển thị kết quả.
//  Nếu sai:
//      Hiển thị thông báo lỗi.

// Xử Lý
//  Lấy giá trị từ input → parseInt.
//  Kiểm tra !isNaN() và từ 10 đến 99.
//  Nếu hợp lệ:
//      donVi = so % 10
//      hangChuc = Math.floor(so / 10)
//      tổng = donVi + hangChuc
//      Gọi hienThongBao("alertBai5", ..., "success")
//  Nếu sai:
//      Gọi hienThongBao("alertBai5", ..., "error")

// Đầu Ra
//  Nếu đúng: "Cộng 2 Ký Tự Số Là: X"
//  Nếu sai: "Vui lòng nhập số có đúng 2 chữ số!"
document.getElementById("tinhTong").onclick = function () {
    let nhap2So = parseInt(document.getElementById("nhap2So").value);


    if (!isNaN(nhap2So) && nhap2So >= 10 && nhap2So <= 99) {
        const donVi = nhap2So % 10;
        const hangChuc = Math.floor(nhap2So / 10);

        const tinhTong = donVi + hangChuc;

        hienThongBao("alertBai5", "Cộng 2 Ký Tự Số Là: " + tinhTong, "success");
    } else {
        hienThongBao("alertBai5", "Vui Lòng Nhập 2 SỐ!!", "error");
    }
}


// Hàm: hienThongBao
// Phân Tích
// Nhận vào id thẻ thông báo, nội dung cần hiển thị, và loại kết quả (thành công hoặc lỗi).
// Mục đích: gom toàn bộ logic xử lý alertBox để tái sử dụng cho tất cả các bài.

// Xử Lý
// Thay class hidden → flex để hiển thị.
// Tìm phần tử <span> chứa kết quả, cập nhật nội dung.
// Xóa các màu có sẵn trước khi thêm màu mới.
// Nếu thành công → thêm màu xanh. Nếu lỗi → thêm màu đỏ.

// Đầu Ra
// Hiển thị kết quả hoặc thông báo lỗi trong thẻ alert theo ID truyền vào.
function hienThongBao(idAlert, noiDung, loai = "success") {
    const alertBox = document.getElementById(idAlert);
    alertBox.classList.replace("hidden", "flex");

    const textTarget = alertBox.querySelector("span.font-medium");
    textTarget.innerText = noiDung;


    alertBox.classList.remove("text-red-400", "text-green-400");


    if (loai === "success") {
        alertBox.classList.add("text-green-400");
    } else {
        alertBox.classList.add("text-red-400");
    }
}




