// Import module
import Food from "../v2/food.js";
import FoodList from "../v2/foodList.js";

// Global variables
const foodList = new FoodList();
let isEditing = false;
let currentPage = 1;
const pageSize = 10;
let sortField = null;
let sortDirection = 'asc';
let selectedIds = new Set();

// Initial load
foodList.loadFromLocalStorage();
applyFilterSearch();
foodList.generateSampleFoods()
Fancybox.bind("[data-fancybox='gallery']", {
    Thumbs: {
        autoStart: true,
    },
});

// UI Events

document.getElementById('btnThem').onclick = () => {
    isEditing = false;
    clearValidation();
    clearForm();
    document.getElementById('foodModalLabel').innerText = "Thêm Món Ăn";
    document.getElementById('btnThemMon').innerText = "Thêm";
    $('#foodModal').modal('show');
};

document.querySelectorAll("th.sortable").forEach(th => {
    th.style.cursor = "pointer";
    th.addEventListener("click", () => {
        const clickedField = th.getAttribute("data-sort");

        if (sortField === clickedField) {
            if (sortDirection === "asc") {
                sortDirection = "desc";
            } else if (sortDirection === "desc") {
                sortField = null;
                sortDirection = "asc"; // reset
            }
        } else {
            sortField = clickedField;
            sortDirection = "asc";
        }

        applyFilterSearch();
    });
});

document.getElementById('btnThemMon').onclick = () => {
    if (!validateForm()) return;

    const food = new Food(
        getID('foodID'),
        getID('tenMon'),
        getSelectedValue('loai'),
        parseFloat(getID('giaMon')),
        getSelectedValue('khuyenMai'),
        getID('tinhTrang'),
        getID('hinhMon'),
        getID('moTa')
    );

    if (isEditing) {
        foodList.updateFood(food);
        alert("Cập Nhật Món Thành Công!!");
    } else {
        foodList.addFood(food);
        alert("Thêm Món Thành Công!!");
    }

    clearValidation();
    applyFilterSearch();
    $('#foodModal').modal('hide');
    clearForm();
    isEditing = false;
};

// Edit and delete handlers
function editFood(foodId) {
function editFood(foodId) {
    isEditing = true;
    const food = foodList.getFoodById(foodId);
    if (!food) return;

    setID('foodID', food.foodID);
    setID('tenMon', food.tenMon);
    setID('giaMon', food.giaMon);
    setSelectValue('loai', food.loai);
    setSelectValue('khuyenMai', food.khuyenMai);
    setSelectValue('tinhTrang', food.tinhTrang);
    setID('moTa', food.moTa);
    setID('hinhMon', food.hinhMon);

    document.getElementById('foodID').disabled = true;
    document.getElementById('foodModalLabel').innerText = "Cập Nhật Món Ăn";
    document.getElementById('btnThemMon').innerText = "Cập Nhật";
    $('#foodModal').modal('show');
}
window.editFood = editFood;

function deleteFood(foodId, tenMon) {
    Swal.fire({
        title: `Bạn có chắc muốn xóa món ${tenMon}?`,
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa"
    }).then(result => {
        if (result.isConfirmed) {
            foodList.deleteFood(foodId);
            applyFilterSearch();
            Swal.fire("Đã xóa!", "Món ăn đã được xóa.", "success");
        }
    });
}
window.deleteFood = deleteFood;

// Display food
function getInforFood(data) {
    let contentFood = "";
    data.forEach(food => {
        const formatGiaMonVND = food.giaMon.toLocaleString('vi', { style: 'currency', currency: 'VND' });
        const formatGiaKMVND = food.giaKhuyenMai().toLocaleString('vi', { style: 'currency', currency: 'VND' });
        // language=HTML
        const checked = selectedIds.has(food.foodID) ? "checked" : "";
        contentFood += `
        <tr class="table table-secondary">
            <td>${food.tenMon}</td>
            <td>${food.loai === 'loai1' ? "Chay" : "Mặn"}</td>
            <td>${formatGiaMonVND}</td>
            <td>${food.khuyenMai === '0.1' ? "10%" : "20%"}</td>
            <td>${formatGiaKMVND}</td>
            <td>${food.tinhTrang === 'Het' ? "Hết" : "Còn"}</td>
            <td>${food.moTa}</td>
            <td>
                <a href="${food.hinhMon}" data-fancybox="gallery" data-caption="${food.tenMon}">
                    <img src="${food.hinhMon}" alt="${food.tenMon}" style="width: 50px; height: 50px;"/>
                </a>
            </td>
            <td>
                <button class="btn btn-info" onclick="editFood('${food.foodID}')">Sửa</button>
                <button class="btn btn-danger" onclick="deleteFood('${food.foodID}','${food.tenMon}')">Xóa</button>
            </td>
            <td><input type="checkbox" class="food-checkbox" value="${food.foodID}"  ${checked}></td>
        </tr>`;
    });
    document.getElementById('tbodyFood').innerHTML = contentFood;
    updateDeleteButtonVisibility();
    updateSelectAllCheckbox();
}


function updateDeleteButtonVisibility() {
    const checkedCount = document.querySelectorAll('.food-checkbox:checked').length;
    if(checkedCount > 0){
        document.getElementById('btnDeleteAll').classList.remove('d-none')
    }else{
        document.getElementById('btnDeleteAll').classList.add('d-none')

    }
}

function updateSelectAllCheckbox() {
    const allCheckboxes = document.querySelectorAll('.food-checkbox');
    const checkedCheckboxes = document.querySelectorAll('.food-checkbox:checked');
    document.getElementById('selectAll').checked =
        allCheckboxes.length > 0 && allCheckboxes.length === checkedCheckboxes.length;
}

document.addEventListener('change', function (e) {
    if (e.target.classList.contains('food-checkbox')) {
        const id = e.target.value;
        if (e.target.checked) {
            selectedIds.add(id);
        } else {
            selectedIds.delete(id);
        }
        updateDeleteButtonVisibility();
        updateSelectAllCheckbox();
    }
});

document.getElementById('selectAll').addEventListener('change', function () {
    const checkboxes = document.querySelectorAll('.food-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = this.checked;
        if (this.checked) {
            selectedIds.add(cb.value);
        } else {
            selectedIds.delete(cb.value);
        }
    });
    updateDeleteButtonVisibility();
});



document.getElementById('btnDeleteAll').onclick = deletedSelect

function deletedSelect(){
    const selectedCheckBox = document.querySelectorAll('.food-checkbox:checked');

    Swal.fire({
        title: `Bạn có chắc muốn xóa hết ${selectedCheckBox.length} món đã chọn?`,
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xóa"
    }).then(result => {
        if (result.isConfirmed) {
            foodList.selectDeletedFood(selectedCheckBox)
            applyFilterSearch()
            console.log("Da xoa")
            Swal.fire("Đã xóa!", "Các Món ăn đã được xóa.", "success");
        }
    });

}

// Filters
['selLoai', 'selTinhTrang'].forEach(id => {
    document.getElementById(id).addEventListener("change", applyFilterSearch);
});

document.getElementById('searchButton').addEventListener("click", applyFilterSearch);

document.querySelectorAll("#foodForm input, #foodForm select, #foodForm textarea").forEach(input => {
    input.addEventListener("input", () => input.classList.remove("is-invalid"));
    input.addEventListener("change", () => input.classList.remove("is-invalid"));
});



function applyFilterSearch() {
    const keyword = getID("searchInputText").trim().toLowerCase();
    const loai = getSelectedValue("selLoai");
    const tinhTrang = getSelectedValue("selTinhTrang");

    const filtered = foodList.searchAndFilter(keyword, loai, tinhTrang);

    if (sortField) {
        filtered.sort((a, b) => {
            let aVal = getSortValue(a, sortField);
            let bVal = getSortValue(b, sortField);

            if (typeof aVal === "string") {
                return sortDirection === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        });
    }


    currentPage = 1;
    const paginated = foodList.paginate(filtered, currentPage, pageSize);


    getInforFood(paginated);
    renderPagination(filtered.length);
    renderSortIcons();

    updateSelectAllCheckbox();
    updateDeleteButtonVisibility();
}

function renderSortIcons() {
    document.querySelectorAll("th.sortable").forEach(th => {
        const field = th.getAttribute("data-sort");

        // Lấy nội dung gốc (không bao gồm icon cũ)
        const originalText = th.textContent.replace("▲", "").replace("▼", "").trim();

        // Reset lại nội dung
        th.innerHTML = originalText;

        // Nếu cột đang được sort, thêm icon mũi tên
        if (field === sortField) {
            const arrow = sortDirection === "asc" ? " ▲" : " ▼";
            th.innerHTML = originalText + arrow;
        }
    });
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / pageSize);
    let html = '';

    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">&laquo;</a>
        </li>`;

    for (let i = 1; i <= totalPages; i++) {
        html += `
        <li class="page-item ${currentPage === i ? 'active' : ''}">
            <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
        </li>`;
    }

    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">&raquo;</a>
        </li>`;

    document.getElementById('pagination').innerHTML = html;
}

window.changePage = function (page) {
    const keyword = getID("searchInputText").trim().toLowerCase();
    const loai = getSelectedValue("selLoai");
    const tinhTrang = getSelectedValue("selTinhTrang");

    const filtered = foodList.searchAndFilter(keyword, loai, tinhTrang);
    const totalPages = Math.ceil(filtered.length / pageSize);

    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        const paginated = foodList.paginate(filtered, currentPage, pageSize);
        getInforFood(paginated);
        renderPagination(filtered.length);
    }

    updateSelectAllCheckbox();
    updateDeleteButtonVisibility();
};

// Hàm
function alert(title) {
    Swal.fire({
        icon: "success",
        title,
        showConfirmButton: true,
        timer: 3000
    });
}

function getID(id) {
    return document.getElementById(id).value;
}

function setID(id, value) {
    document.getElementById(id).value = value;
}

function setSelectValue(id, value) {
    const select = document.getElementById(id);
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === value) {
            select.selectedIndex = i;
            break;
        }
    }
}

function getSelectedValue(id) {
    return document.getElementById(id).value;
}

function clearForm() {
    document.getElementById('foodForm').reset();
    document.getElementById('foodID').disabled = false;
}

function getSortValue(food, field) {
    if (field === "giaKM") {
        return food.giaKhuyenMai();
    }
    if (typeof food[field] === "string") {
        return food[field].toLowerCase();
    }
    return food[field];
}

function validateForm() {
    let isValid = true;
    const get = id => document.getElementById(id);

    const errorMap = {
        foodID: "invalidID",
        tenMon: "invalidTen",
        loai: "invalidLoai",
        giaMon: "invalidGia",
        khuyenMai: "invalidKM",
        tinhTrang: "invalidTT",
        moTa: "invalidMoTa"
    };

    const setError = (id, message) => {
        const input = get(id);
        const error = get(errorMap[id]);
        input.classList.add("is-invalid");
        error.textContent = message;
        isValid = false;
    };

    const values = {
        foodID: get("foodID").value.trim(),
        tenMon: get("tenMon").value.trim(),
        loai: get("loai").value,
        giaMon: get("giaMon").value.trim(),
        khuyenMai: get("khuyenMai").value,
        tinhTrang: get("tinhTrang").value,
        moTa: get("moTa").value.trim()
    };

    clearValidation();

    if (!values.foodID || isNaN(values.foodID) || parseInt(values.foodID) < 0) {
        setError("foodID", "Vui lòng nhập mã hợp lệ");
    } else if (!isEditing && foodList.getFoodById(values.foodID)) {
        setError("foodID", "Mã ID đã tồn tại");
    }

    if (!values.tenMon || values.tenMon.length < 2) {
        setError("tenMon", "Tên món phải từ 2 ký tự trở lên");
    }

    if (!values.loai) {
        setError("loai", "Vui lòng chọn loại món");
    }

    if (!values.giaMon || isNaN(values.giaMon) || parseFloat(values.giaMon) <= 0) {
        setError("giaMon", "Giá món phải lớn hơn 0");
    }

    if (!values.khuyenMai) {
        setError("khuyenMai", "Vui lòng chọn khuyến mãi");
    }

    if (!values.tinhTrang) {
        setError("tinhTrang", "Vui lòng chọn tình trạng");
    }

    if (!values.moTa || values.moTa.length < 5) {
        setError("moTa", "Mô tả phải từ 5 ký tự trở lên");
    }

    return isValid;
}

function clearValidation() {
    const errorMap = {
        foodID: "invalidID",
        tenMon: "invalidTen",
        loai: "invalidLoai",
        giaMon: "invalidGia",
        khuyenMai: "invalidKM",
        tinhTrang: "invalidTT",
        moTa: "invalidMoTa"
    };

    Object.keys(errorMap).forEach(id => {
        const input = document.getElementById(id);
        const error = document.getElementById(errorMap[id]);
        if (input) input.classList.remove("is-invalid");
        if (error) error.textContent = "";
    });
}
