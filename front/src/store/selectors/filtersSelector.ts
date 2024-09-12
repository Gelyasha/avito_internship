import { TState } from "../store";

export const selectPage = (state: TState) => {
    return state.filters.page;
}

export const selectPerPage = (state: TState) => {
    return state.filters.perPage;
}

export const selectSearch = (state: TState) => {
    return state.filters.search;
}

export const selectOrderFilter = (state: TState) => {
    return state.filters.orderFilter;
}

export const selectOrderSort = (state: TState) => {
    return state.filters.orderSort;
}