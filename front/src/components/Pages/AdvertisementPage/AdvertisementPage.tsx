import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import Page404 from '../Page404';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { selectAdvertisement } from '../../../store/selectors/advertisementsSelectors';
import { getAdvertisementByIdThunk } from '../../../store/slices/advertisementsSlice';
import AdvertisementCard from '../../entities/AdvertisementCard';
import UpdateAdvertisement from '../../entities/UpdateAdvertisement';

import classes from './AdvertisementPage.module.css';

const AdvertisementPage: FC = ({ }) => {

    const params = useParams();
    const { advertisementId } = params;

    const advertisement = useAppSelector(selectAdvertisement);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (advertisementId) {
            dispatch(getAdvertisementByIdThunk(advertisementId))
        }
    }, [advertisementId])

    if (advertisement === null) {
        return <Page404 />
    }

    return (
        <div>
            <AdvertisementCard
                advertisement={advertisement}
                withDescription={true}

            />
            <UpdateAdvertisement
                className={classes.updateAdvertisement}
                advertisement={advertisement}
            />
        </div>

    )
};

export default AdvertisementPage;
