import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import { Button } from 'antd';

import classes from './Header.module.css';

const Navbar: FC = () => {

    const navigate = useNavigate();

    return (
        <div className={classes.navbar}>
            <Button
                onClick={() => {
                    navigate('/')
                }}
            >
                Объявления
            </Button>
            <Button
                onClick={() => {
                    navigate('/orders')
                }}
            >
                Заказы
            </Button>
        </div>
    )
}

export default Navbar;