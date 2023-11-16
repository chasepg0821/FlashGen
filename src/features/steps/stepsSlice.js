import { createSlice } from "@reduxjs/toolkit";

export const stepsSlice = createSlice({
    name: "stats",
    initialState: {
        stepNo: 0,
        status: "process",
        canAdvance: false
    },
    reducers: {
        setStep: (state, action) => {
            state.stepNo = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        nextStep: (state) => {
            state.stepNo += 1;
        },
        prevStep: (state) => {
            state.stepNo -= 1;
        }
    }
});

export const getStepNo = (state) => {
    return state.steps.stepNo;
};

export const getStatus = (state) => {
    return state.steps.status;
};

export const getCA = (state) => {
    return state.steps.canAdvance;
};

// Action creators are generated for each case reducer function
export const { setStep, setStatus, nextStep, prevStep } = stepsSlice.actions;

export default stepsSlice.reducer;
