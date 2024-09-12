import React, { FC, useEffect } from 'react';
import { selectOrders, selectTotalOrders } from '../../../store/selectors/ordersSelector';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { clearOrders, getOrdersThunk } from '../../../store/slices/ordersSlice';
import OrderCard from '../../entities/OrderCard';
import OrdersFilter from '../../entities/OrdersFilter';
import { selectOrderFilter, selectOrderSort, selectPage, selectPerPage } from '../../../store/selectors/filtersSelector';
import OrdersSort from '../../entities/OrdersSort';

import classes from './OrdersPage.module.css';
import { clearFilters, setPage, setPerPage, TSortType } from '../../../store/slices/filtersSlice';
import Paginate from '../../entities/Paginate';

const OrdersPage: FC = () => {

    const dispatch = useAppDispatch();

    const orders = useAppSelector(selectOrders);
    const totalOrders = useAppSelector(selectTotalOrders);
    const orderFilter = useAppSelector(selectOrderFilter);
    const orderSort = useAppSelector(selectOrderSort);
    const page = useAppSelector(selectPage);
    const perPage = useAppSelector(selectPerPage);

    const currentOrders = orders.filter((order) => {
        if (!orderFilter.length) {
            return true
        }
        return orderFilter.includes(order.status)
    })

    const handleChangePage = (page: number) => {
        dispatch(setPage(page))
    }

    const handleChangePerPage = (perPage: number) => {
        dispatch(setPerPage(perPage))
    }

    const handleGetOrders = async (_page: number, _per_page: number, sort: TSortType) => {
        try {
            const params = {
                _page,
                _per_page
            };
            if (sort) {
                Object.assign(params, { _sort: sort === 'asc' ? 'total' : '-total' })
            }
            dispatch(getOrdersThunk(params))
        } catch (error) {
            console.log(error)
        }
    }

    const handleClearStores = () => {
        dispatch(clearFilters());
        dispatch(clearOrders());
    }

    useEffect(() => {
        handleGetOrders(page, perPage, orderSort)
    }, [page, perPage, orderSort])

    useEffect(() => {
        return () => {
            handleClearStores()
        }
    }, [])

    return (
        <div>
            <div className={classes.filters}>
                <OrdersFilter />
                <OrdersSort />
            </div>
            <div className={classes.cards}>
                {currentOrders.map(order => {
                    return (
                        <OrderCard
                            key={order.id}
                            order={order}
                        />
                    )
                })}
            </div>
            <div className={classes.paginate}>
                <Paginate
                    current={page}
                    onChangePage={handleChangePage}
                    onChangeSize={handleChangePerPage}
                    pageSize={perPage}
                    total={totalOrders}
                />
            </div>
        </div>
    )
};

export default OrdersPage;