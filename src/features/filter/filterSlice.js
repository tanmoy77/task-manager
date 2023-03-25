import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: '',
    tagSelected: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeSearch: (state, action) => {
            state.search = action.payload
        },
        changeTagSelected: (state, action) => {
            const item = action.payload;
            if (state.tagSelected.includes(item)) {
                state.tagSelected = state.tagSelected.filter(tag => tag !== item)
            } else {
                state.tagSelected.push(item)
            }
        },
        fillInitialTags: (state, action) => {
            state.tagSelected = action.payload;
        }
    }
});

export default filterSlice.reducer;
export const {changeSearch, changeTagSelected, fillInitialTags} = filterSlice.actions;