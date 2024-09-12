import { Select } from 'antd';
import React, { FC } from 'react';

import classes from './OrdersSort.module.css';
import { setOrderSort, TSortType } from '../../../store/slices/filtersSlice';
import { useAppDispatch } from '../../../hooks/storeHooks';

const SORT_OPTIONS = [
    {
        value: 'asc',
        label: 'возрастанию',
    },
    {
        value: 'desc',
        label: 'убыванию',
    },
]

const OrdersSort: FC = () => {

    const dispatch = useAppDispatch();

    const handleSelect = (value: TSortType) => {
        dispatch(setOrderSort(value))
    }

    return (
        <div>
            <p>Сортировать по:</p>
            <Select
                className={classes.sortSelect}
                options={SORT_OPTIONS}
                allowClear
                placeholder='Сумма заказа'
                onChange={handleSelect}
            />
        </div>
    )
};

export default OrdersSort;