import { createSlice } from "@reduxjs/toolkit";

export const cardsSlice = createSlice({
    name: "cards",
    initialState: {
        cardInfo: {
            0: {
                index: 0,
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            1: {
                index: 1,
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            2: {
                index: 2,
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            3: {
                index: 3,
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            4: {
                index: 4,
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            5: {
                index: 5,
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            6: {
                index: 6,
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            7: {
                index: 7,
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            8: {
                index: 8,
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            },
            9: {
                index: 9,
                prompt: "",
                answer: "",
                correctParaphrase: "",
                incorrectParaphrase: ""
            }
        }
    },
    reducers: {
        // Action Format:
        //{
        //     index: X,
        //     card: {
        //         ...CARD INFORMATION
        //     }
        // }
        changeCard: (state, action) => {
            const index = action.payload.index;
            state.cardInfo = {
                ...state.cardInfo,
                [index]: action.payload.card
            };
        }
    }
});

// Action creators are generated for each case reducer function
export const { changeCard } = cardsSlice.actions;

export const selectCards = (state) => {
    return state.cards.cardInfo;
};

export default cardsSlice.reducer;
