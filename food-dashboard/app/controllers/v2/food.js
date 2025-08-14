export default class Food {
    constructor(foodID, tenMon, loai, giaMon, khuyenMai, tinhTrang, hinhMon, moTa) {
        this.foodID = foodID;
        this.tenMon = tenMon;
        this.loai = loai;
        this.giaMon = giaMon;
        this.khuyenMai = khuyenMai;
        this.tinhTrang = tinhTrang;
        this.hinhMon = hinhMon;
        this.moTa = moTa;
    }

    giaKhuyenMai() {
        return this.giaMon * (1 - this.khuyenMai / 100);
    }
}