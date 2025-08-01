export default class NhanVien {
    constructor(id, username, hoTen, email, password, ngayLam, luongCoBan, chucVu, gioLam) {
        this.id = id;
        this.username = username;
        this.hoTen = hoTen;
        this.email = email;
        this.password = password;
        this.ngayLam = ngayLam;
        this.luongCoBan = parseFloat(luongCoBan);
        this.chucVu = chucVu;
        this.gioLam = parseFloat(gioLam);
    }

    tongLuong() {
        if (this.chucVu === "GiamDoc") return this.luongCoBan * 3;
        if (this.chucVu === "TruongPhong") return this.luongCoBan * 2;
        return this.luongCoBan;
    }

    xepLoai() {
        if (this.gioLam >= 192) return "Xuất Xắc";
        if (this.gioLam >= 176) return "Giỏi";
        if (this.gioLam >= 160) return "Khá";
        return "Trung Bình";
    }
}
