import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import cardsReducer from "./features/cards/cardsSlice";
import statsReducer from "./features/stats/statsSlice";
import stepsReducer from "./features/steps/stepsSlice";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage
};

const rootReducer = combineReducers({
    cards: cardsReducer,
    stats: statsReducer,
    steps: stepsReducer
});

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: [thunk]
});

export const persistor = persistStore(store);
