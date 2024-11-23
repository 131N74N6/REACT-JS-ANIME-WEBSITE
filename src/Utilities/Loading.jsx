import React, { Fragment } from "react";
import "./Loading.css";

export default function Loading({text}) {
    return (
        <Fragment>
            <div className="load-logo">
                <i className="fa-solid fa-rotate"></i> {text} <i className="fa-solid fa-rotate"></i>
            </div>
        </Fragment>
    )
}