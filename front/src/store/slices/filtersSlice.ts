import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatusNumber } from "../../types";

const DEFAULT_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

export type TSortType = 'asc' | 'desc' | ''

interface IFiltersState {
    page: number;
    perPage: number;
    search?: string;
    orderFilter: TStatusNumber[];
    orderSort: TSortType;
}

const initialState: IFiltersState = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PER_PAGE,
    search: '',
    orderFilter: [],
    orderSort: '',
}

export const filtersSlice = createSlice({
    name: 'advertisements',
    initialState: initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPerPage(state, action: PayloadAction<number>) {
            state.perPage = action.payload;
            state.page = 1;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.page = 1;
        },
        clearFilters(state) {
            state.page = DEFAULT_PAGE;
            state.perPage = DEFAULT_PER_PAGE;
            state.orderFilter = [];
            state.orderSort = '';
            state.search = '';
        },
        setOrderFilter(state, action: PayloadAction<TStatusNumber[]>) {
            state.orderFilter = action.payload;
        },
        setOrderSort(state, action: PayloadAction<TSortType>) {
            state.orderSort = action.payload;
            state.page = 1;
        }
    },
});

export const { setPage, setPerPage, setSearch, clearFilters, setOrderFilter, setOrderSort } = filtersSlice.actions;

export default filtersSlice.reducer;
