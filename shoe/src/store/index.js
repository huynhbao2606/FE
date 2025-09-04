import { configureStore } from '@reduxjs/toolkit'
import shoppingShoeReducer from './shoppingShoeReducer'
export const store = configureStore({
    reducer: {
        shoppingShoeReducer,
    }
})