import data from "../data/danhSachGhe.json";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    soDoGhe : data,
    gheDangChon: [],

}

const datVeReducer = createSlice({
    name : "datVeReducer",
    initialState,
    reducers: {
        chonGhe : (state, action) => {
            const ghe  = action.payload

            const daCo = state.gheDangChon.find(g => g.soGhe === ghe.soGhe);

            if(daCo){
                state.gheDangChon = state.gheDangChon.filter(g => g.soGhe !== ghe.soGhe);
            } else {
                state.gheDangChon.push({ soGhe: ghe.soGhe, gia: ghe.gia, dangChon: true });
            }
        },

        huyGhe : (state, action) => {
            state.gheDangChon = state.gheDangChon.filter(g => g.soGhe !== action.payload);
        },

        huyTatCa: (state) => {
            state.gheDangChon = [];
        },

        datGhe: (state) => {
            const chonGhe = new Set(state.gheDangChon.map(g => g.soGhe));
            state.soDoGhe = state.soDoGhe.map(row => {
                if(!row.hang) return row;
                return {
                    ...row,
                    danhSachGhe: row.danhSachGhe.map(g =>
                        chonGhe.has(g.soGhe) ? {...g, daDat: true} : g
                    ),
                }
            })
            state.gheDangChon = [];
        }
    }
})

export const {chonGhe, huyGhe, datGhe, huyTatCa} = datVeReducer.actions;
export default datVeReducer.reducer;