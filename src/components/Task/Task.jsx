import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../features/tasks/TasksSlice";
import MyButton from "../UI/MyButton/MyButton";
import classes from "./Task.module.css"
import MyInput from "../UI/MyInput/MyInput";

const Task = ({data,showModal}) => {
    const dispatch = useDispatch();

    //======+++++++++++++++++SWITCH IS_DONE=========================================//
    const [isDone,setIsDone] = useState(data.is_done)

    const saveIt = (dataToPush, trigger, setTrigger) => {
        dispatch(updateTask(dataToPush));
        setTrigger(!trigger)
    }
    //=======================END SWITCH IS_DONE=============================================//

    //====================RENAME TITLE===============================//
    const [title, setTitle] = useState(data.name);
    const [rename, setRename] = useState(false)
    
    const closeWithoutSaving = () => {
        if(rename) setTitle(data.name)
        setRename(!rename)
    }
    //====================END RENAME TITLE===============================//

    return (
        <>
            <div className={classes.taskitem_box}>
                {rename
                ?
                    <div className={classes.task_editbox}>
                        <MyInput focus={rename} callback={(e) => setTitle(e.target.value)} type="text" value={title}/>
                        <div className={classes.task_editbox_options}>
                            <div className={classes.task_editbox_option}>
                                <MyButton disabled={title === data.name} callback={() => saveIt({...data, name:title},rename,setRename)}>Сохранить</MyButton>
                            </div>
                            <div className={rename ? classes.task_editbox_option : classes.task_delete}>
                                <MyButton callback={() => dispatch(deleteTask(data.id))}>Удалить задачу</MyButton>
                            </div>
                        </div>
                    </div>
                    :
                    <div onClick={() => saveIt({...data, is_done: !isDone},isDone,setIsDone)} className={isDone ? [classes.task_name,classes.done].join(' ') : classes.task_name} >
                        {title}
                    </div>
                }
                
                <div className={rename ? [classes.task_options,classes.active].join('') : classes.task_options}>
                    <MyButton callback={closeWithoutSaving}>{rename ? 'Закрыть без сохранения' : 'Редактировать'}</MyButton>
                    <MyButton callback={() => showModal(data)}>Открыть описание</MyButton>
                    <div className={classes.task_options_decor}></div>
                </div>
            </div>
        </>
    )
}

export default Task