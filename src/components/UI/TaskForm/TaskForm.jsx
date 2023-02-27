import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import dragAndDrop from "../../../app/dragAndDrop/dragAndDrop";
import { sendTask } from "../../../features/tasks/TasksSlice";
import MyButton from "../MyButton/MyButton";
import MyInput from "../MyInput/MyInput";
import classes from "./TaskForm.module.css"

const TaskForm = ({board_name,board_id}) => {
    
    const dispatch = useDispatch();
    const [task,setTask] = useState({
        name: '',
        description:'',
        board_id: board_id,
        isDone:false,
    });

    const saveTask = () => {
        console.log(JSON.stringify(task))
        dispatch(sendTask(task))
        setTask({...task, name:'', description:''});
    }
    return (
        <div className={classes.taskform_box}>
            <h3>Новая задача в {board_name}</h3>
            <MyInput value={task.name} label='Название' callback={(e) => setTask({...task, name: e.target.value})}/>
            <MyInput className={classes.taskform_description} label='Описание' value={task.description} callback={(e) => setTask({...task, description: e.target.value})}/>
            <div className={classes.taskform_save}>
                <MyButton disabled={!task.name} callback={saveTask}>Сохранить задание</MyButton>
            </div>
        </div>
    )
}

export default TaskForm;