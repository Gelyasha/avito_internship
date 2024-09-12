import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../../types";
import { changeOrderStatus, getOrders, IChangeOrderStatusParams, IGetOrdersParams } from "../../api/orders";

export const getOrdersThunk = createAsyncThunk(
    'orders/getOrdersThunk',
    async (params: IGetOrdersParams) => {
        const response = await getOrders(params);
        return response.data;
    },
);

export const changeOrderStatusThunk = createAsyncThunk(
    'orders/changeOrderStatusThunk',
    async (params: IChangeOrderStatusParams) => {
        const response = await changeOrderStatus(params);
        return response.data;
    }
)

interface IOrderState {
    orders: IOrder[];
    total: number;
}

const initialState: IOrderState = {
    orders: [],
    total: 0
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        clearOrders(state) {
            state.orders = [];
            state.total = 0;
        },
    },
    extraReducers(builder) {
        builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
            const { data, items } = action.payload;
            state.orders = data;
            state.total = items;
        });
        builder.addCase(changeOrderStatusThunk.fulfilled, (state, action) => {
            const updatedOrders = state.orders.map(order => {
                if (order.id === action.payload.id) {
                    return action.payload
                }
                return order
            });
            state.orders = updatedOrders;
        })
    },
})

export const { clearOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
