import React, { Fragment } from "react";
import "./Footer.css";

export default function Footer() {
    const year = new Date();

    return (
        <Fragment>
            <footer>
                <div>&copy;{year.getFullYear()} W3BANIMEL1ST</div>
                <div>powered by jikan</div>
            </footer>
        </Fragment>
    )
}