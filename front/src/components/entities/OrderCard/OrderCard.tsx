import React, { FC, useState } from 'react';
import { COMPLETED_ORDER_STATUS, IOrder, OrderStatusName } from '../../../types';
import { Button, Card, Collapse } from 'antd';

import classes from './OrderCard.module.css';
import AdvertisementCard from '../AdvertisementCard';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { changeOrderStatusThunk } from '../../../store/slices/ordersSlice';

interface IProps {
    order: IOrder;
}

const OrderCard: FC<IProps> = ({
    order,
}) => {

    const { id, createdAt, items, status, total } = order;
    const isCompleted = status === COMPLETED_ORDER_STATUS;
    const date = (new Date(createdAt)).toLocaleString('ru');

    const dispatch = useAppDispatch();
    
    const [isItemsVisible, setIsItemsVisible] = useState(false);

    const handleChangeItemsVisible = () => {
        setIsItemsVisible(prev => !prev)
    };

    const handleCompleteOrder = async () => {
        try {
            await dispatch(changeOrderStatusThunk({ id: order.id, status: COMPLETED_ORDER_STATUS }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card
            className={classes.card}
        >
            <p className={classes.itemProperty}>Номер заказа: #{id}</p>
            <p className={classes.itemProperty}>Статус: {OrderStatusName[status]}</p>
            <p className={classes.itemProperty}>Количество позиций: {items.length}</p>
            <p className={classes.itemProperty}>Стоимость: {total}</p>
            <p className={classes.itemProperty}>Дата создания заказа: {date}</p>
            <Button
                onClick={handleCompleteOrder}
                disabled={isCompleted}
            >
                Завершить заказ
            </Button>

            <Collapse onChange={handleChangeItemsVisible}>
                <Collapse.Panel
                    key={1}
                    header={isItemsVisible ? 'Скрыть товары' : 'Показать все товары'}
                >
                    <div className={classes.advertisements}>
                        {items.map((item) => {
                            return (
                                <AdvertisementCard
                                    key={item.id}
                                    advertisement={item}
                                    count={item.count}
                                />
                            )
                        })}
                    </div>
                </Collapse.Panel>
            </Collapse>
        </Card>
    )
};

export default OrderCard;
