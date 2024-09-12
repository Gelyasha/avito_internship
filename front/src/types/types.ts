export interface IAdvertisment {
    /* Уникальный идентификатор. */
    id: string;
    /* Название. */
    name: string;
    /* Описание. */
    description?: string;
    /* Цена. */
    price: number;
    /* Дата и время создания. */
    createdAt: string;
    /* Количество просмотров. */
    views: number;
    /* Количество лайков. */
    likes: number;
    /* Ссылка на изображение. */
    imageUrl?: string;
}

export const OrderStatus = {
    Created: 0,
    Paid: 1,
    Transport: 2,
    DeliveredToThePoint: 3,
    Received: 4,
    Archived: 5,
    Refund: 6
} as const;

export const COMPLETED_ORDER_STATUS = 4;

export type TStatus = keyof typeof OrderStatus;
export type TStatusNumber = typeof OrderStatus[TStatus]

export const StatusName: Record<TStatus, string> = {
    Archived: 'В архиве',
    Created: 'Создан',
    DeliveredToThePoint: 'В пункте выдачи',
    Paid: 'Оплачен',
    Received: 'Получен',
    Refund: 'Возврат',
    Transport: 'В пути',
}

export const OrderStatusName = Object.fromEntries(Object.entries(OrderStatus).map(([key, value]) => [value, StatusName[key as TStatus]]));

export interface IOrderItem extends IAdvertisment {
    count: number;
};

export interface IOrder {
    /* Уникальный идентификатор. */
    id: string;
    /* Статус. */
    status: TStatusNumber;
    /* Дата и время создания. */
    createdAt: string;
    /* Дата и время завершения. */
    finishedAt?: string;
    /* Товары в заказе. */
    items: Array<IOrderItem>;
    /* Способ доставки(Почта, СДЭК...) */
    deliveryWay: string;
    /* Сумма заказа */
    total: number;
}

export interface IImage {
    /* Уникальный идентификатор. */
    id: number;
    /* Ссылка. */
    url: string;
    /* Название. */
    name: string;
}