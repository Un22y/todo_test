import React from "react";
import classes from "./MyButton.module.css"

const MyButton = ({children, callback, disabled}) => {

    return (
        <>
            <button 
                className={classes.mybutton}
                onClick={callback}
                disabled={disabled}
            >
            {children}
            </button>
        </>
    )
}

export default MyButton;