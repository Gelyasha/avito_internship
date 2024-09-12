
import React, { FC } from 'react';
import { Select } from 'antd';
import { OrderStatusName, TStatusNumber } from '../../../types';

import classes from './OrdersFilter.module.css';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { setOrderFilter } from '../../../store/slices/filtersSlice';

const OPTION_NUMBERS = [0, 1, 2, 3, 4, 5, 6];

const OPTIONS = OPTION_NUMBERS.map((option) => {
    return {
        value: option,
        label: OrderStatusName[option],
    }
})

const OrdersFilter: FC = () => {

    const dispatch = useAppDispatch();

    const handleSelect = (value: TStatusNumber[]) => {
        dispatch(setOrderFilter(value))
    }

    return (
        <div>
            <p>Фильтровать по:</p>
            <Select
                className={classes.filterSelect}
                options={OPTIONS}
                mode='multiple'
                placeholder='Выбери статус заказа'
                onChange={handleSelect}
                allowClear
            />
        </div>
    )
};

export default OrdersFilter;