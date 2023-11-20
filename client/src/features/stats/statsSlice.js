import { createSlice } from "@reduxjs/toolkit";

export const statsSlice = createSlice({
    name: "stats",
    initialState: {
        truePositives: 0,
        trueNegatives: 0,
        falsePositives: 0,
        falseNegatives: 0
    },
    reducers: {
        addTP: (state) => {
            state.truePositives += 1;
        },
        addTN: (state) => {
            state.trueNegatives += 1;
        },
        addFP: (state) => {
            state.falsePositives += 1;
        },
        addFN: (state) => {
            state.falseNegatives += 1;
        }
    }
});

// Action creators are generated for each case reducer function
export const { addTP, addTN, addFP, addFN } = statsSlice.actions;

export default statsSlice.reducer;
