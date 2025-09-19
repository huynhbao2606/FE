import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    list : [],
    editing : null,
    search : "",
}

const sinhVienSlice = createSlice({
    name : "sinhVienReducer",
    initialState: initialState,
    reducers: {
        addSinhVien : (state, action) => {
            state.list.push(action.payload)
        },
        deleteSinhVien : (state, action) => {
            state.list = state.list.filter(item => item.maSv !== action.payload)
        },
        setEditing : (state, action) => {
            state.editing = action.payload
        },
        updateSinhVien : (state, action) => {
          state.list = state.list.map(item =>
              item.maSv === action.payload.maSv ? action.payload : item
          )
            state.editing == null;
        },
        setSearch : (state, action) => {
            state.search = action.payload
        }
    }
})
export const {addSinhVien, deleteSinhVien, setEditing, updateSinhVien, setSearch } = sinhVienSlice.actions;
export default sinhVienSlice.reducer