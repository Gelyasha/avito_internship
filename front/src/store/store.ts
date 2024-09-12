import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/ordersSlice";
import advertisementsReducer from "./slices/advertisementsSlice";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
    reducer: {
        orders: ordersReducer,
        advertisements: advertisementsReducer,
        filters: filtersReducer,
    }
});

export type TState = ReturnType<typeof store.getState>;
export type TDispatch = typeof store.dispatch;