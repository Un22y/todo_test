import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendBoard } from "../../../features/boards/BoardsSlice";
import MyButton from "../MyButton/MyButton";
import MyInput from "../MyInput/MyInput";

const AddTaskBoard = (setVisible) => {
    const dispatch = useDispatch();
    const [board, setBoard] = useState('');

    const saveName = (e) => {
        setBoard(e.target.value)
    }

    const saveTaskBoard = () => {
        const data = {'name':board}
        dispatch(sendBoard(data))
        setBoard('');
        // setVisible(false)
    }

    return (
        <>
            <MyInput 
                value={board} 
                callback={saveName} 
                label="Имя списка задач"
            />
            <MyButton 
                disabled={!board}
                callback={() => saveTaskBoard()}
            >
                Сохранить список задач
            </MyButton>
        </>
    )
}

export default AddTaskBoard;