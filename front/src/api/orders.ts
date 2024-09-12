import { TStatusNumber } from './../types/types';
import { IOrder } from "../types"
import { http } from "./api"

const URL = 'orders/'

export interface IGetOrdersParams {
    _page: number;
    _per_page: number;
    _sort?: 'total' | '-total';
}

export const getOrders = async (params: IGetOrdersParams) => {
    return http.get<{ data: IOrder[], items: number }>(URL, { params })
}

export const getOrderById = async (id: string) => {
    return http.get<IOrder>(`${URL}${id}`)
}

export interface IChangeOrderStatusParams {
    id: string;
    status: TStatusNumber;
}

export const changeOrderStatus = async (params: IChangeOrderStatusParams) => {
    const { id, status } = params;
    return http.patch<IOrder>(`${URL}${id}`, { status });
}