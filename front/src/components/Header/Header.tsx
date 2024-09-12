import React, { FC } from "react";
import classes from './Header.module.css';
import Navbar from "./Navbar";

const Header: FC = () => {

    return (
        <div className={classes.header}>
            <Navbar />
        </div>
    )

};

export default Header;