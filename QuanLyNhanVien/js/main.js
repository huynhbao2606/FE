import NhanVien from "../js/NhanVien.js";

const API_URL = "https://688bbf842a52cabb9f52ba45.mockapi.io/api/NhanVien";
let isEditing;
let editId;
let allNhanVien = [];
const modal = $('#myModal');

// validate rules
const validationRules = {
    username: {
        check: v => /^[A-Za-z0-9]{4,6}$/.test(v),
        message: "Tài khoản phải từ 4-6 ký tự chữ hoặc số!"
    },
    hoTen: {
        check: v => /^[A-Za-zÀ-ỹ\s]+$/.test(v),
        message: "Tên nhân viên chỉ chứa chữ!"
    },
    email: {
        check: v => /^\S+@\S+\.\S+$/.test(v),
        message: "Email không hợp lệ!"
    },
    password: {
        check: v => /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/.test(v),
        message: "Mật khẩu 6-10 ký tự, có số, in hoa và ký tự đặc biệt!"
    },
    ngayLam: {
        check: v => /^\d{2}\/\d{2}\/\d{4}$/.test(v),
        message: "Ngày làm phải định dạng mm/dd/yyyy!"
    },
    luongCoBan: {
        check: v => {
            const num = parseFloat(v);
            return num >= 1000000 && num <= 20000000;
        },
        message: "Lương cơ bản từ 1,000,000 đến 20,000,000!"
    },
    chucVu: {
        check: v => ["GiamDoc", "TruongPhong", "NhanVien"].includes(v),
        message: "Chức vụ phải hợp lệ!"
    },
    gioLam: {
        check: v => {
            const num = parseInt(v);
            return num >= 80 && num <= 200;
        },
        message: "Giờ làm từ 80 đến 200 giờ!"
    }
};

// Valdation
function validateForm() {
    let formIsValid = true;
    for (const id in validationRules) {
        const el = document.getElementById(id);
        const invalidFeedback = el.parentElement.querySelector(".invalid-feedback");

        const value = el.value.trim();
        const isValid = validationRules[id].check(value);

        el.classList.toggle("is-valid", isValid);
        el.classList.toggle("is-invalid", !isValid);

        if (!isValid) {
            invalidFeedback.textContent = validationRules[id].message;
            formIsValid = false;
        }
    }
    return formIsValid;
}

function loadLiveValidations() {
    for (const id in validationRules) {
        const el = document.getElementById(id);
        el.addEventListener("input", function () {
            const value = el.value.trim();
            const isValid = validationRules[id].check(value);
            el.classList.toggle("is-valid", isValid);
            if (isValid) el.classList.remove("is-invalid");
        });
    }
}
loadLiveValidations();

function resetValidation() {
    for (const id in validationRules) {
        const el = document.getElementById(id);
        el.classList.remove("is-valid", "is-invalid");
        const invalidFeedback = el.parentElement.querySelector(".invalid-feedback");
        if (invalidFeedback) invalidFeedback.textContent = "";
    }
}

// Get Form Data
function getFormData() {
    return {
        username: document.getElementById('username').value,
        hoTen: document.getElementById('hoTen').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        ngayLam: document.getElementById('ngayLam').value,
        luongCoBan: parseFloat(document.getElementById("luongCoBan").value),
        chucVu: document.getElementById("chucVu").value,
        gioLam: parseFloat(document.getElementById("gioLam").value)
    };
}

// CRUD
function tableNhanVien(arr) {
    document.getElementById('tableDanhSach').innerHTML = arr.map(nv => `
    <tr>
      <td>${nv.username}</td>
      <td>${nv.hoTen}</td>
      <td>${nv.email}</td>
      <td>${nv.ngayLam}</td>
      <td>${nv.chucVu === "GiamDoc" ? "Giám Đốc" : nv.chucVu === "TruongPhong" ? "Trưởng Phòng" : "Nhân Viên"}</td>
      <td>${parseFloat(nv.tongLuong())} VND</td>
      <td>${nv.xepLoai()}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="editNV('${nv.id}')">Sửa</button>
        <button class="btn btn-sm btn-danger" onclick="deleteNV('${nv.id}','${nv.username}')">Xóa</button>
      </td>
    </tr>`).join('');
}

function getListNhanVien() {
    axios.get(API_URL)
        .then(res => {
            const arr = res.data.map(item => new NhanVien(
                item.id, item.username, item.hoTen, item.email, item.password,
                item.ngayLam, item.luongCoBan, item.chucVu, item.gioLam
            ));
            allNhanVien = arr;
            tableNhanVien(arr);
        })
        .catch(err => console.error(err));
}
getListNhanVien();

function editNV(id) {
    resetValidation();
    isEditing = true;
    editId = id;

    $('#ngayLam').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true,
        todayBtn: "linked",
        clearBtn: true
    });


    document.getElementById('btnLuu').innerText = "Cập Nhật";
    document.getElementById('header-title').innerText = "Cập Nhật Nhân Viên";
    document.getElementById('username').disabled = true

    axios.get(`${API_URL}/${id}`)
        .then(res => {
            const nv = res.data;
            fillFormData(nv)
            modal.modal("show");
        })
        .catch(err => console.error(err));
}
window.editNV = editNV;

function fillFormData(nv) {
    document.getElementById('username').value = nv.username;
    document.getElementById('hoTen').value = nv.hoTen;
    document.getElementById('email').value = nv.email;
    document.getElementById('password').value = nv.password;
    document.getElementById('ngayLam').value = nv.ngayLam;
    document.getElementById('luongCoBan').value = nv.luongCoBan;
    document.getElementById('chucVu').value = nv.chucVu;
    document.getElementById('gioLam').value = nv.gioLam;
}


function deleteNV(id, username) {
    Swal.fire({
        title: `Bạn có chắc muốn xóa nhân viên ${username} ?`,
        text: "Hành động này sẽ không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${API_URL}/${id}`)
                .then(() => {
                    getListNhanVien();
                    Swal.fire("Đã xóa!", "Nhân viên đã được xóa.", "success");
                })
                .catch(() => {
                    Swal.fire("Lỗi!", "Không thể xóa nhân viên.", "error");
                });
        }
    });
}
window.deleteNV = deleteNV;

// Element Click
document.getElementById('btnThemNhanVien').onclick = function () {
    document.getElementById('formNhanVien').reset();
    resetValidation();
    isEditing = false;
    editId = null;

    $('#ngayLam').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        todayHighlight: true,
        todayBtn: "linked",
        clearBtn: true
    });


    document.getElementById('header-title').textContent = "Thêm Nhân Viên";
    document.getElementById('btnLuu').textContent = "Thêm";
    document.getElementById('username').disabled = false;

    modal.modal("show");
};

document.getElementById('btnLuu').onclick = function () {
    if (!validateForm()) return;
    const nv = getFormData();

    const request = isEditing
        ? axios.put(`${API_URL}/${editId}`, nv)
        : axios.post(API_URL, nv);

    request.then(() => {
        getListNhanVien();
        modal.modal("hide");
        Swal.fire({
            icon: "success",
            title: isEditing ? "Cập nhật Nhân Viên Thành Công!" : "Thêm Nhân Viên Thành Công!",
            showConfirmButton: false,
            timer: 1500
        });
    }).catch(err => console.error(err));
};

//Search
document.getElementById('btnTimNV').onclick = function () {
    const keyword = document.getElementById('searchName').value.trim().toLowerCase();
    if (!keyword) return tableNhanVien(allNhanVien);

    const filtered = allNhanVien.filter(nv =>
        nv.xepLoai().toLowerCase().includes(keyword) ||
        nv.hoTen.toLowerCase().includes(keyword)
    );
    tableNhanVien(filtered);
};


document.getElementById('sidebarCollapse').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('d-none');
});
