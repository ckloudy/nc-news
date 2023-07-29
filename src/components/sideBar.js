import React from "react";
import { NavLink } from "react-router-dom";
import { elastic as Menu } from "react-burger-menu";
import "../sideBar.css";

const sideBar = ({ user }) => {
    return (
        <Menu right>
            <p className="font-black underline underline-offset-8 mb-6 inline">
                Hello 👋🏻, {user.name}
            </p>
            <NavLink
                to="/"
                className="menu-item hover:text-white hover:underline underline-offset-4">
                All Articles
            </NavLink>
            <NavLink
                to="/articles/topics/coding"
                className="menu-item hover:text-white hover:underline underline-offset-4">
                Coding Articles
            </NavLink>
            <NavLink
                to="/articles/topics/cooking"
                className="menu-item hover:text-white hover:underline underline-offset-4">
                Cooking Articles
            </NavLink>
            <NavLink
                to="/articles/topics/football"
                className="menu-item hover:text-white hover:underline underline-offset-4">
                Football Articles
            </NavLink>
        </Menu>
    );
};

export default sideBar;
