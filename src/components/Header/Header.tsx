import React from 'react';
import './Header.css';

const Header = () => {

    return (
        <>
            <div className="title">
                <h1>
                    JAPAN TAX CALCULATOR FOR NEWCOMERS
                </h1>
            </div>
            <div className="header">
                <p>
                    Welcome to the Tax Calculator for people moving to Japan! We know how hard it could be to estimate whether it is a good idea to make this move.
                    So, this simple tool allows you to calculate how much taxes you would pay after landing a nice gig in the country. However, this website is created for reference only.
                    Please do not get mad if the real bill will be a little different. Good luck and have fun!
                </p>
            </div>
        </>
    )
}

export default Header;
