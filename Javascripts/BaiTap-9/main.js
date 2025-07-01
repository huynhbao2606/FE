// Phân Tích
// Lấy giá trị từ hai ô input (lương một ngày và số ngày làm).
// Kiểm tra xem cả hai giá trị có phải là số hay không.
//     Nếu đúng: tính tổng lương và hiển thị kết quả trong thẻ id #alertBai1.
//     Nếu không đúng: hiển thị thông báo lỗi thẻ id #alertBai1.
//     Màu sắc của thông báo sẽ thay đổi tùy vào kết quả: xanh cho đúng, đỏ cho lỗi.
//
//     Xử Lý
// Hàm onclick được gán cho nút "Tính Lương", xử lý các bước sau:
//
//     Lấy phần tử alertBai1 và tongLuong từ DOM.
//     Lấy giá trị nhập vào từ các input #soThuNam và #soNgayLam, chuyển sang kiểu số nguyên.
//     Dùng classList.replace() để thay hidden sang flex để hiện thẻ id #alertBai1.
//     Nếu cả hai giá trị hợp lệ:
//     Tính tổng lương = lương một ngày * số ngày
// Cập nhật nội dung vào #tongLuong
// Thêm class text-green-400 để hiện màu xanh thành công
// Nếu một trong hai giá trị không hợp lệ:
//     Cập nhật nội dung báo lỗi
// Thêm class text-red-400 để cảnh báo màu đỏ
//
// Đầu Ra
// Kết quả xử lý sẽ được xuất ra dưới dạng:
//
//     Nếu nhập đúng: hiển thị số tiền lương đã tính
// Nếu nhập sai: hiển thị thông báo lỗi như Vui lòng nhập đúng số!.
// Cả hai trường hợp đều được hiển thị bên trong thẻ #alertBai1.
// Bài 1: Tính Lương
// Phân Tích
// Nhập lương một ngày và số ngày làm.
// Kiểm tra tính hợp lệ của cả hai giá trị.
// Nếu hợp lệ → tính tổng tiền lương, hiển thị định dạng VND.
// Nếu không hợp lệ → báo lỗi.

// Xử Lý
// Ép kiểu số cho hai giá trị nhập vào.
// Nếu cả hai là số:
//     Tính lương = lương/ngày × số ngày
//     Định dạng tiền tệ Việt Nam
//     Hiển thị qua hàm hienThongBao()
// Nếu lỗi:
//     Gọi hàm hienThongBao() để báo lỗi.

// Đầu Ra
// Nếu đúng: "Số Tiền Lương: xx.xxx.000 ₫"
// Nếu sai: "Vui lòng nhập đúng số!"
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

// Bài 2: Tính Trung Bình
// Phân Tích
// Nhập 5 số từ người dùng.
// Kiểm tra tất cả số có hợp lệ hay không.
// Nếu hợp lệ → tính trung bình 5 số.
// Nếu sai → báo lỗi.

// Xử Lý
// Dùng parseFloat để ép kiểu 5 giá trị.
// Nếu hợp lệ:
//     Tính trung bình = tổng 5 số / 5
//     Hiển thị kết quả bằng hienThongBao()
// Nếu sai:
//     Hiển thị thông báo lỗi

// Đầu Ra
// Nếu đúng: "Tính Trung Bình Là: X"
// Nếu sai: "Vui lòng nhập đúng số!"
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

// Bài 3: Quy Đổi Tiền Tệ
// Phân Tích
// Nhập tỷ lệ VND và số USD.
// Kiểm tra hợp lệ.
// Nếu đúng: nhân và hiển thị kết quả định dạng VND.
// Nếu sai: thông báo lỗi.

// Xử Lý
// Ép kiểu 2 giá trị tỷ lệ và USD.
// Nếu hợp lệ:
//     Nhân USD × tỷ lệ
//     Định dạng VND
//     Hiển thị bằng hienThongBao()
// Nếu sai:
//     Hiển thị lỗi

// Đầu Ra
// Nếu đúng: "Tiền VND Là: xxx.xxx ₫"
// Nếu sai: "Vui lòng nhập đúng số!"
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

// Bài 4: Tính Chu Vi – Diện Tích
// Phân Tích
// Nhập chiều dài và chiều rộng.
// Kiểm tra hợp lệ.
// Nếu đúng → tính chu vi & diện tích.
// Nếu sai → báo lỗi.

// Xử Lý
// Ép kiểu số cho chiều dài và rộng.
// Nếu hợp lệ:
//     Diện tích = dài × rộng
//     Chu vi = (dài + rộng) × 2
//     Hiển thị bằng hienThongBao() (dùng \n)
// Nếu sai:
//     Hiển thị lỗi

// Đầu Ra
// Nếu đúng: "Diện Tích: X\nChu Vi: Y"
// Nếu sai: "Vui lòng nhập đúng số!"
document.getElementById("tinhCVDT").onclick = function () {
    let chieuDai = parseFloat(document.getElementById("chieuDai").value);
    let chieuRong = parseFloat(document.getElementById("chieuRong").value);

    alertBox.classList.replace("hidden", "flex");

    if (chieuDai && chieuRong) {
        const tinhDienTich = chieuDai * chieuRong;
        const tinhChuVi = (chieuDai + chieuRong) * 2;

        const noiDung = "Diện Tích: " + tinhDienTich + "\n" + "Chu Vi: " + tinhChuVi;

        hienThongBao("alertBai4", noiDung, "success");
    } else {
        hienThongBao("alertBai4", "Vui lòng nhập số!", "error");
    }
}

// Bài 5: Tính Tổng 2 Ký Tự Số
// Phân Tích
// Nhập một số có 2 chữ số.
// Kiểm tra số có hợp lệ không (từ 10 đến 99).
// Nếu đúng: tách chữ số hàng chục và đơn vị → cộng lại.
// Nếu sai: báo lỗi.

// Xử Lý
// Ép kiểu int cho giá trị nhập vào.
// Kiểm tra điều kiện 10 <= số <= 99.
// Nếu đúng:
//     Lấy hàng chục và đơn vị
//     Tính tổng → hiển thị kết quả
// Nếu sai:
//     Hiển thị thông báo lỗi

// Đầu Ra
// Nếu đúng: "Cộng 2 Ký Tự Số Là: X"
// Nếu sai: "Vui lòng nhập số có đúng 2 chữ số!"
document.getElementById("tinhTong").onclick = function () {
    let nhap2So = parseInt(document.getElementById("nhap2So").value);


    if (!isNaN(nhap2So) && nhap2So >= 10 && nhap2So <= 99) {
        const donVi = nhap2So % 10;
        const hangChuc = Math.floor(nhap2So / 10);

        const tinhTong = donVi + hangChuc;

        hienThongBao("alertBai5", "Cộng 2 Ký Tự Số Là: " + tinhTong, "success");
    } else {
        hienThongBao("alertBai5", "Vui Lòng Nhập 2 SỐ!!" + tinhTong, "error");
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




