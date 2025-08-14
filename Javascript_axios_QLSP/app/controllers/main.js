let listProduct = [];

function getListProduct(){
    const promise = axios({
        url: 'https://688b65932a52cabb9f519547.mockapi.io/api/Product',
        method: 'GET',
    });

    promise.then(function (response){
        listProduct = response.data;
        renderProduct(listProduct);
    })
        .catch(function (error){
            console.log(error)
        })
        .finally(function (){

        })
}

function renderProduct(products) {
    let contentProduct = '';
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        contentProduct += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price.toLocaleString()} $</td>
        <td><img src="${product.image}" alt="${product.name}" width="50"></td>
        <td>${product.description.substring(0, 50)}...</td>
        <td>
          <button class="btn btn-sm btn-primary">Sửa</button>
          <button class="btn btn-sm btn-danger">Xóa</button>
        </td>
      </tr>
    `;
    }
    document.getElementById('tblDanhSachSP').innerHTML = contentProduct;
}

document.getElementById('btnLuu').onclick = function () {
    let tenSP = document.getElementById('tenSP').value;
    let giaSP = document.getElementById('giaSP').value;
    let hinhAnh = document.getElementById('hinhAnh').value;
    let moTa = document.getElementById('moTa').value;

    const newProduct = {
        name : tenSP,
        price : giaSP,
        image : hinhAnh,
        description : moTa
    };

    console.log(newProduct)

    axios.post('https://688b65932a52cabb9f519547.mockapi.io/api/Product',newProduct)
        .then(() => {
            getListProduct();
        })
        .catch(err => console.error(err));
}

getListProduct()