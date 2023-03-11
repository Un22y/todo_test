import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { deleteBoard, updateBoard } from "../../features/boards/BoardsSlice";
import { find } from "../../app/search/find";
import MyModal from "../UI/MyModal/MyModal";
import Task from "../Task/Task";
import MyButton from "../UI/MyButton/MyButton";
import MyInput from "../UI/MyInput/MyInput";
import TaskForm from "../UI/TaskForm/TaskForm";
import classes from "./TaskBoard.module.css"
import FullDescription from "../FullDescription/FullDescription";


const TaskBoard = ({tasks,board}) => {
    const dispatch = useDispatch()
//===============================CREATE NEW TASK===========================================//
    const [addTask, setAddTask] = useState(false);
//===============================END CREATE NEW TASK===========================================//

//================================SHOW FULL TASK DESCRIPTION===============================//
    const [showTask,setShowTask] = useState(false)
    const [fullTask, setFullTask] = useState({});
    const showDescription = (data) => {
        setFullTask(data);
        setShowTask(true);
    }
//================================END SHOW FULL TASK DESCRIPTION=====================================//


//=================================FIND TASK===================================//
    const [sortedTasks, setSortedTasks] = useState(tasks);
    useEffect(() => setSortedTasks(tasks),[tasks])
    const [search,setSearch] = useState('')
    useEffect(() => {
        setSortedTasks(find(search,tasks))
    },[search])
//=================================END FIND TASK===================================//
    
    
//================================RENAME BOARD====================================//
    const [title, setTitle] = useState(board.name);
    const [rename, setRename] = useState(false)
    const save = () => {
        dispatch(updateBoard({...board, name: title}))
        setRename(!rename)
    }
    const switchRename = () => {
        if(rename) setTitle(board.name)
        setRename(!rename)
    }
//================================END RENAME BOARD====================================//

    return (
            <div draggable={false} className={classes.tasklist_box}>


                <MyModal visible={addTask} setVisible={setAddTask}>
                    <TaskForm board_name={board.name} board_id={board.id}/>
                </MyModal>
                <MyModal 
                    visible={showTask} 
                    setVisible={setShowTask}
                >
                    <FullDescription data={fullTask}/>
                </MyModal>



                <div draggable={false} className={classes.board_options}>
                    <MyButton callback={() => dispatch(deleteBoard(board.id))}>Удалить</MyButton>
                    <MyButton callback={() => switchRename()}>{rename ? 'Закрыть без сохранения' : 'Редактировать'}</MyButton>
                </div>
                {rename
                    ?
                    <div draggable={false}>
                        <MyInput focus={rename} callback={(e) => setTitle(e.target.value)} type="text" value={title}/>
                        <MyButton disabled={title === board.name} callback={() => save()}>Сохранить</MyButton>
                    </div>
                    :
                    <h2 className={classes.tasklist_title}>{title} {board.order_id}</h2>
                }
                    
                    
                <MyInput value={search} callback={(e) => setSearch(e.target.value)} label='Поиск'/>
                <div draggable={false} className={classes.tasklist_listbox}>
                    {
                        sortedTasks.map((task) => 
                            <Task
                                key={task.id}
                                data={task}
                                id={task.id}
                                showModal={showDescription}
                            />)
                    }
                </div>


                <div draggable={false} className={classes.board_options}>
                    <MyButton callback={() => setAddTask(true)}>Добавить задачу в список</MyButton>
                </div>
            </div>
    )
} 

export default TaskBoard;