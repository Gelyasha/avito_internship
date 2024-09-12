import { IAdvertisment } from "../types";
import { http } from "./api"

const URL = 'advertisements/';

export interface IGetAdvertisementsParams {
    _page: number;
    _per_page: number;
    name?: string;
}

export const getAdvertisements = async (params: IGetAdvertisementsParams) => {
    return http.get<{ data: IAdvertisment[], items: number }>(URL, { params })
}

export const getAdvertisementById = async (id: string) => {
    return http.get<IAdvertisment>(`${URL}${id}`)
}

export interface IPostAdvertisementParams {
    name: string;
    price: number;
    imageUrl?: string;
    description?: string;
}

export const createAdvertisement = async (params: IPostAdvertisementParams) => {
    return http.post<IAdvertisment>(URL, params)
}

export interface IUpdateAdvertisementParams extends IPostAdvertisementParams {
    id: string;
}

export const updateAdvertisement = async (params: IUpdateAdvertisementParams) => {
    const { id, ...rest } = params;
    return http.patch<IAdvertisment>(`${URL}${params.id}`, rest)
}