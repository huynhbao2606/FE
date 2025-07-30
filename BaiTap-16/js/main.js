// Mảng lưu dữ liệu
let numArray = [];
let arrayFloat = [];

// Hàm lấy element value
function getId(id) {
    return document.getElementById(id).value;
}

// Hàm hiện kết quả
function setText(id, text) {
    document.getElementById(id).innerText = text;
}

// Các hàm xử lý
function handleThemSo() {
    const n = Number(getId("inputNum"));
    numArray.push(n);
    setText("txtMang", numArray);
}


function handleTongSoDuong() {
    let tong = 0;
    numArray.forEach(num => { if (num > 0) tong += num; });
    setText("txtTongSoDung", `Tổng số dương: ${tong}`);
}


function handleDemSoDuong() {
    let count = numArray.filter(num => num > 0).length;
    setText("txtDemSoDuong", `Số dương: ${count}`);
}


function handleSoNhoNhat() {
    if (numArray.length === 0) return;
    const min = Math.min(...numArray);
    setText("txtSoNhoNhat", `Số nhỏ nhất: ${min}`);
}

function handleSoDuongNhoNhat() {
    const duong = numArray.filter(num => num > 0);
    if (duong.length > 0) {
        const minPos = Math.min(...duong);
        setText("txtSoDuongNhoNhat", `Số dương nhỏ nhất: ${minPos}`);
    } else {
        setText("txtSoDuongNhoNhat", "Không có số dương trong mảng");
    }
}


function handleTimSoChan() {
    const chanCuoi = [...numArray].reverse().find(num => num % 2 === 0);
    setText("txtTimSoChan", `Số chẵn cuối cùng: ${chanCuoi ?? "Không có"}`);
}

function doiViTri(i, j) {
    [numArray[i], numArray[j]] = [numArray[j], numArray[i]];
}

function handleDoiCho() {
    const i1 = Number(getId("inputViTri1"));
    const i2 = Number(getId("inputViTri2"));
    doiViTri(i1, i2);
    setText("txtDoiCho", `Mảng sau khi đổi: ${numArray}`);
}

function handleSapXep() {
    numArray.sort((a, b) => a - b);
    setText("txtSapXep", `Mảng sau khi sắp xếp: ${numArray}`);
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function handleTimSoNguyen() {
    const prime = numArray.find(isPrime);
    setText("txtTimSoNguyen", prime !== undefined ? prime : "Không có số nguyên tố");
}

function handleThemSoNguyen() {
    const n = Number(getId("inputFloat"));
    arrayFloat.push(n);
    setText("txtMangSoNguyen", arrayFloat);
}

function handleDemSoNguyen() {
    const countInt = arrayFloat.filter(Number.isInteger).length;
    setText("txtDemSoNguyen", `Số nguyên: ${countInt}`);
}


function handleSoSanh() {
    let soDuong = numArray.filter(num => num > 0).length;
    let soAm = numArray.filter(num => num < 0).length;
    let message = soDuong > soAm ? "Số dương > Số âm" :
        soDuong < soAm ? "Số âm > Số dương" :
            "Số âm = Số dương";
    setText("txtSoSanh", message);
}

//Gắn sự kiện
document.getElementById("btnThemSo").onclick = handleThemSo;
document.getElementById("btnTongSoDuong").onclick = handleTongSoDuong;
document.getElementById("btnDemSoDuong").onclick = handleDemSoDuong;
document.getElementById("btnSoNhoNhat").onclick = handleSoNhoNhat;
document.getElementById("btnSoDuongNhoNhat").onclick = handleSoDuongNhoNhat;
document.getElementById("btnTimSoChan").onclick = handleTimSoChan;
document.getElementById("btnDoiCho").onclick = handleDoiCho;
document.getElementById("btnSapXep").onclick = handleSapXep;
document.getElementById("btnTimSoNguyen").onclick = handleTimSoNguyen;
document.getElementById("btnThemSoNguyen").onclick = handleThemSoNguyen;
document.getElementById('btnDemSoNguyen').onclick = handleDemSoNguyen
document.getElementById("btnSoSanh").onclick = handleSoSanh;
