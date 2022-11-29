import React from "react";
import { NavLink } from "react-router-dom";
import s from './Header.module.scss'

export const Header = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <img src="https://i5.walmartimages.com/asr/f6c4bc0d-8baa-4927-b008-c964f5c2d24c.60e9c0bac2df9388c2a50681e521fe19.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF"/>
                <div className={s.menu}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </div>
        </div>
    )
}