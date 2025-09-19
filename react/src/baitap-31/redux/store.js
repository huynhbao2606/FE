import { configureStore } from "@reduxjs/toolkit";
import sinhVienReducer from "./sinhVienSlice.js";


export const store = configureStore({
    reducer: {
        sinhVienReducer: sinhVienReducer
    }
})