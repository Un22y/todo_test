import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../features/tasks/TasksSlice";
import MyButton from "../UI/MyButton/MyButton";
import MyInput from "../UI/MyInput/MyInput";
import classes from "./FullDescription.module.css";


const FullDescription = ({data}) => {
    const dispatch = useDispatch();

    const [description, setDescription] = useState(data.description);
    
    const [openEdit, setOpenEdit] = useState(false)
    const save = () => {
        dispatch(updateTask({...data, description:description}))
        setDescription(data.dascription)
        setOpenEdit(!openEdit)
    }
    const switchRename = () => {
        if(openEdit) setDescription(data.description)
        setOpenEdit(!openEdit)
    }
    useEffect(() => {
        setOpenEdit(false)
        setDescription(data.description)
    },[data])
    return (
        <>
            <div className={classes.full_box}>
            <h3>{data.id} - {data.name}</h3>
                    {openEdit 
                    ?
                        <>
                            <MyInput value={description} callback={(e) => setDescription(e.target.value)} label='Новое описание'/>
                            <div className={classes.full_editbox_options}>
                                <MyButton callback={() => switchRename()}>Отмена</MyButton>
                                <MyButton disabled={description === data.description} callback={() => save()}>Сохранить</MyButton>
                            </div>
                        </>
                    :
                        <>
                            <div>Дата создания - {data.created_time}</div>
                            <div>Описание:<br/>{description}</div>
                            <div className={classes.full_editbox_options}>
                                <MyButton callback={() => switchRename()}>{openEdit ? 'Закрыть без сохранения' : 'Редактировать'}</MyButton>
                            </div>
                        </>
                    }
            </div>
        </>
    )
}

export default FullDescription;