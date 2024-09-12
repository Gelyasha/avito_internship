import React, { FC, ReactNode } from 'react';
import Header from '../Header';

import classes from './Layout.module.css';

interface IProps {
    children: ReactNode;
}

const Layout: FC<IProps> = ({
    children,
}) => {
    return (
        <div className={classes.layout}>
            <Header />
            <div className={classes.body}>
                {children}
            </div>
        </div>
    )
};

export default Layout;