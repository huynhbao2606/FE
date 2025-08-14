import Food from "../v2/food.js";
export default class FoodList{
    constructor() {
        this.arr = []
    }

    addFood(Food){
        this.arr.push(Food)
        this.saveToLocalStorage();
    }

    deleteFood(foodId) {
        this.arr = this.arr.filter(food => food.foodID !== foodId);
        this.saveToLocalStorage();
    }

    selectDeletedFood(selectCheckBox) {
        const selectIds = Array.from(selectCheckBox).map(cb => cb.value);
        this.arr = this.arr.filter(food => !selectIds.includes(food.foodID));
        this.saveToLocalStorage();
    }


    getFoodById(foodId){
        return this.arr.find(food => food.foodID == foodId);
    }

    updateFood(updatedFood){
        let index = this.arr.findIndex(food => food.foodID == updatedFood.foodID);
        if(index !== -1){
            this.arr[index] = updatedFood;
        }
        this.saveToLocalStorage();
    }

    searchAndFilter(keyword, loai, tinhTrang, selectCheckBox) {
        let result = this.arr;

        if (loai !== "all") {
            result = result.filter(food => food.loai === loai);
        }

        if (keyword !== "") {
            const lowerKeyword = keyword.toLowerCase();
            result = result.filter(food =>
                food.tenMon.toLowerCase().includes(lowerKeyword) ||
                food.foodID.toString().includes(lowerKeyword) ||
                food.moTa.toLowerCase().includes(lowerKeyword)
            );
        }

        if(tinhTrang !== "all"){
            result = result.filter(food => food.tinhTrang === tinhTrang);
        }

        return result;
    }

    paginate(arr, page = 1, pageSize = 5) {
        const start = (page - 1) * pageSize;
        return arr.slice(start, start + pageSize);
    }


    saveToLocalStorage(){
        localStorage.setItem("foodList",JSON.stringify(this.arr));
    }

    loadFromLocalStorage(){
        const data = JSON.parse(localStorage.getItem('foodList'));
        if(data){
            this.arr = data.map(item => new Food(
                item.foodID,
                item.tenMon,
                item.loai,
                parseFloat(item.giaMon),
                parseFloat(item.khuyenMai),
                item.tinhTrang,
                item.hinhMon,
                item.moTa
            ));
        }
    }
    generateSampleFoods() {
        const sampleFoods = [];

        const names = [
            "Phở Chay", "Bún Riêu Chay", "Cơm Chiên Chay", "Gỏi Cuốn Chay", "Lẩu Nấm Chay",
            "Cà Ri Chay", "Bún Bò Huế Chay", "Cháo Đậu Xanh", "Canh Rong Biển", "Súp Bí Đỏ",
            "Cơm Gà", "Bánh Mì Thịt", "Bún Bò", "Phở Bò", "Gà Rán",
            "Hủ Tiếu Nam Vang", "Cơm Tấm", "Bánh Canh Cua", "Mì Quảng", "Lẩu Thái"
        ];

        for (let i = 0; i < 20; i++) {
            const isChay = i < 10;
            const food = new Food(
                (1000 + i).toString(),                            // foodID
                names[i],                                         // tenMon
                isChay ? "loai1" : "loai2",                      // loai: loai1 = Chay, loai2 = Mặn
                Math.floor(Math.random() * 100) * 1000 + 10000,   // giaMon
                (i % 3 === 0) ? 0.2 : (i % 2 === 0) ? 0.1 : 0.0,   // khuyenMai: 0%, 10%, 20%
                (i % 2 === 0) ? "Con" : "Het",                    // tinhTrang
                `https://static.photos/food/200x150?random=${i}`,               // hinhMon (ảnh giả)
                "Mô tả món ăn " + names[i]                        // moTa
            );

            sampleFoods.push(food);
        }

        localStorage.setItem("foodList", JSON.stringify(sampleFoods));
    }
}
