import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./features/cards/cardsSlice";
import statsReducer from "./features/stats/statsSlice";

export default configureStore({
    reducer: {
        cards: cardsReducer,
        stats: statsReducer
    }
});
