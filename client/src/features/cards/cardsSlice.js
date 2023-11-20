import { createSlice } from "@reduxjs/toolkit";

export const cardsSlice = createSlice({
    name: "cards",
    initialState: {
        cardInfo: [
            {
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            {
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            {
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            {
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            {
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            {
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            {
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            {
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            {
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            {
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            }
        ]
    },
    reducers: {
        // Action Format:
        //{
        //     index: X,
        //     card: {
        //         ...CARD INFORMATION
        //     }
        // }
        updateCards: (state, action) => {
            state.cardInfo = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { updateCards } = cardsSlice.actions;

export const selectCards = (state) => {
    return state.cards.cardInfo;
};

export default cardsSlice.reducer;
