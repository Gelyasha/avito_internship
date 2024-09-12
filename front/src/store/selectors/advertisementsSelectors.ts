import { TState } from "../store";

export const selectAdvertisements = (state: TState) => {
    return state.advertisements.items;
}

export const selectTotalAdvertisments = (state: TState) => {
    return state.advertisements.total;
}

export const selectAdvertisement = (state: TState) => {
    return state.advertisements.currentAdvertisement;
}