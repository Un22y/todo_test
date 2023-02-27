import React from "react";
import classes from "./MyInput.module.css"

const MyInput = ({callback, label, value, focus}) => {
    return (
        <>
            <div className={classes.input_box}>
                    <input onFocus={(e) => e.target.select()} autoFocus={focus} value={value} className={classes.my_input} placeholder=' ' type="text" onChange={callback}/>
                    <label className={classes.input_label}>{label}</label>
            </div>
        </>
    )
}

export default MyInput;