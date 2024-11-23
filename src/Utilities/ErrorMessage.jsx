import { Fragment } from "react";
import "./ErrorMessage.css";

export default function ErrorMessage({message}) {
    return (
        <Fragment>
            <div>{message}</div>
        </Fragment>
    )
}
