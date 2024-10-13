import { createSlice } from "@reduxjs/toolkit";

const whislistSlice = createSlice({
    name: 'whislist',
    initialState: [],
    reducers: {
        addToWhislist: (state, action) => {
            if(!state.some(product => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },
        removeFromWhislist: (state, action) => {
            return state.filter(product => product._id !== action.payload._id);
        },
        setWhislist: (state, action) => {
            return action.payload;
        }
    }
});

export const { addToWhislist, removeFromWhislist, setWhislist } = whislistSlice.actions;
export const selectWhislist = (state) => state.whislist;
export default whislistSlice.reducer;
