import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAdvertisment } from "../../types";
import { createAdvertisement, getAdvertisementById, getAdvertisements, IGetAdvertisementsParams, IPostAdvertisementParams, IUpdateAdvertisementParams, updateAdvertisement } from "../../api/advertisements";

export const getAdvertisementsThunk = createAsyncThunk(
    'advertisements/getAdvertisements',
    async (params: IGetAdvertisementsParams) => {
        const response = await getAdvertisements(params);
        return response.data;
    },
);

export const createAdvertisementThunk = createAsyncThunk(
    'advertisements/createAdvertisement',
    async (params: IPostAdvertisementParams) => {
        const response = await createAdvertisement(params);
        return response.data;
    },
);

export const getAdvertisementByIdThunk = createAsyncThunk(
    'advertisements/getAdvertisement',
    async (id: string) => {
        const response = await getAdvertisementById(id);
        return response.data;
    },
);

export const updateAdvertisementThunk = createAsyncThunk(
    'advertisements/updateAdvertisement',
    async (params: IUpdateAdvertisementParams) => {
        const response = await updateAdvertisement(params);
        return response.data;
    },
);

interface IAdvertismentsState {
    items: IAdvertisment[];
    total: number;
    currentAdvertisement: IAdvertisment | null;
}

const initialState: IAdvertismentsState = {
    items: [],
    total: 0,
    currentAdvertisement: null
}

export const advertisementsSlice = createSlice({
    name: 'advertisements',
    initialState: initialState,
    reducers: {
        clearAdvertisements(state) {
            state.items = [];
            state.total = 0;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAdvertisementsThunk.fulfilled, (state, action) => {
            const { data, items } = action.payload;
            state.items = data;
            state.total = items;
        });
        builder.addCase(createAdvertisementThunk.fulfilled, (state, action) => {
            const updatedItems = [action.payload, ...state.items];
            state.items = updatedItems;
        });
        builder.addCase(getAdvertisementByIdThunk.fulfilled, (state, action) => {
            state.currentAdvertisement = action.payload;
        });
        builder.addCase(updateAdvertisementThunk.fulfilled, (state, action) => {
            const updatedItems = state.items.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload
                }
                return item
            });

            state.currentAdvertisement = action.payload;
            state.items = updatedItems;
        })
    }
});

export const { clearAdvertisements } = advertisementsSlice.actions;

export default advertisementsSlice.reducer;
