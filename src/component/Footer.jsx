import React, { Fragment } from "react";
import "./Footer.css";

export default function Footer() {
    const year = new Date();

    return (
        <Fragment>
            <footer>
                <div>&copy;{year.getFullYear()} 131N74N6</div>
            </footer>
        </Fragment>
    )
}