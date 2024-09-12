import React, { FC } from 'react';
import { IAdvertisment } from '../../../types';
import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';

import classes from './AdvertisementCard.module.css';
import { Link } from 'react-router-dom';

interface IProps {
    advertisement: IAdvertisment;
    withDescription?: boolean;
    count?: number;
}

const AdvertisementCard: FC<IProps> = ({
    advertisement,
    withDescription = false,
    count,
}) => {

    const { id, likes = 0, name, price, views = 0, imageUrl = '', description } = advertisement;

    const showDescription = withDescription && description;

    const inOrderView = Boolean(count);

    return (
        <Link to={`/advertisements/${id}`}>
            <Card
                className={classes.card}
                cover={
                    <Avatar
                        className={classes.avatar}
                        shape='square'
                        alt={name}
                        src={imageUrl}
                    />
                }
            >
                <Meta
                    title={name}
                />
                <p className={classes.itemProperty}>Стоимость: {price}</p>
                {!inOrderView && (
                    <>
                        <p className={classes.itemProperty}>Количество просмотров: {views}</p>
                        <p className={classes.itemProperty}>Количество лайков: {likes}</p>
                    </>
                )}
                {inOrderView && (
                    <p className={classes.itemProperty}>Количество в заказе: {count}</p>
                )}
                {showDescription && <p className={classes.itemProperty}>Описание: {description}</p>}
            </Card>
        </Link>
    )
};

export default AdvertisementCard;