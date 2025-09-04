import data from '../shoe/data.json';
import {createSlice} from '@reduxjs/toolkit';
import Swal from "sweetalert2";

const initialState = {
    listShoe: data,
    detailShoe: null,
    listCart: [],
}

const shoppingShoeReducer = createSlice({
    name: "shoppingShoeReducer",
    initialState,
    reducers: {
        setDetail: (state, action) => {
            const { payload } = action;
            state.detailShoe = payload;
        },
        setCart: (state, action) => {
            const { payload } = action;
            const productToCart = {
                id: payload.id,
                name: payload.name,
                image: payload.image,
                price: payload.price,
                quantity: 1,
            }
            const index = state.listCart.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                const newListCart = [...state.listCart];
                newListCart[index].quantity += 1;
                state.listCart = newListCart;
            }else {
                state.listCart = [...state.listCart, productToCart];
            }
        },
        setRemoveCart: (state, action) => {
            const { payload } = action;
            state.listCart = state.listCart.filter((item) => item.id !== payload);
        },
        setUpdateQuanTity: (state, action) => {
            const {payload} = action;
            const index = state.listCart.findIndex(item => item.id === payload.id);
            if (index !== -1) {
                const newListCart = [...state.listCart];
                if (payload.isPlus) {
                    newListCart[index].quantity += 1;
                } else {
                    if (newListCart[index].quantity > 1) {
                        newListCart[index].quantity -= 1;
                    }
                }
                state.listCart = newListCart;
            }
        },
        setPayment: (state) => {
            state.listCart = [];
            Swal.fire(
                'Thanh toán thành công!',
                'Cảm ơn bạn đã mua hàng!',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            })
        }
    }
})

export const {setDetail, setCart, setRemoveCart, setUpdateQuanTity, setPayment} = shoppingShoeReducer.actions;
export default shoppingShoeReducer.reducer;