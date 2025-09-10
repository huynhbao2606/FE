import { configureStore } from '@reduxjs/toolkit';
import datVeReducer from './datVe.js';

export const store = configureStore({
    reducer: {
        datVe: datVeReducer,
    },
})