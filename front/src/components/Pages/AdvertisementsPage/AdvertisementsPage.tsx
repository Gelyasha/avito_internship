import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { selectTotalAdvertisments, selectAdvertisements } from '../../../store/selectors/advertisementsSelectors';
import { clearAdvertisements, getAdvertisementsThunk } from '../../../store/slices/advertisementsSlice';

import classes from './AdvertisementsPage.module.css';
import AdvertisementCard from '../../entities/AdvertisementCard';
import Paginate from '../../entities/Paginate';
import { selectPage, selectPerPage, selectSearch } from '../../../store/selectors/filtersSelector';
import { clearFilters, setPage, setPerPage } from '../../../store/slices/filtersSlice';
import Search from '../../entities/Search';
import AddAdvertisement from '../../entities/AddAdvertisement';

const AdvertisementsPage: FC = () => {

    const advertisements = useAppSelector(selectAdvertisements);
    const totalAdvertisements = useAppSelector(selectTotalAdvertisments);

    const page = useAppSelector(selectPage);
    const perPage = useAppSelector(selectPerPage);
    const search = useAppSelector(selectSearch);

    const dispatch = useAppDispatch();

    const handleChangePage = (page: number) => {
        dispatch(setPage(page))
    }

    const handleChangePerPage = (perPage: number) => {
        dispatch(setPerPage(perPage))
    }

    const handleGetAdvertisements = (page: number, perPage: number, search?: string) => {
        dispatch(getAdvertisementsThunk({ _page: page, _per_page: perPage, name: search }));
    }

    const handleClearStores = () => {
        dispatch(clearFilters());
        dispatch(clearAdvertisements());
    }

    useEffect(() => {
        handleGetAdvertisements(page, perPage, search)
    }, [page, perPage, search])

    useEffect(() => {
        return () => {
            handleClearStores();
        }
    }, [])

    return (
        <>
            <Search />
            <AddAdvertisement />
            <div className={classes.list}>
                {advertisements.map(item => {
                    return (
                        <AdvertisementCard
                            key={item.id}
                            advertisement={item}
                        />
                    )
                })}
            </div>
            <div className={classes.paginate}>
                <Paginate
                    current={page}
                    pageSize={perPage}
                    total={totalAdvertisements}
                    onChangePage={handleChangePage}
                    onChangeSize={handleChangePerPage}
                />
            </div>
        </>
    )
};

export default AdvertisementsPage;