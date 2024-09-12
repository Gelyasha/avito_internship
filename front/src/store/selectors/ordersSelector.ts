import { TState } from "../store";

export const selectOrders = (state: TState) => {
    return state.orders.orders;
}

export const selectTotalOrders = (state: TState) => {
    return state.orders.total;
}
