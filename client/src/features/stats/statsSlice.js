import { createSlice } from "@reduxjs/toolkit";

export const statsSlice = createSlice({
    name: "stats",
    initialState: {
        CPEvals: [],
        IPEvals: []
    },
    reducers: {
        updateCP: (state, action) => {
            state.CPEvals = action.payload;
        },
        updateIP: (state, action) => {
            state.IPEvals = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { updateCP, updateIP } = statsSlice.actions;

export const getCPEvals = (state) => {
    return state.stats.CPEvals;
};

export const getIPEvals = (state) => {
    return state.stats.IPEvals;
};

export default statsSlice.reducer;
