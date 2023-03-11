import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import TaskBoard from "./../TaskBoard/TaskBoard"
import { find } from "../../app/search/find";
import MyInput from "../UI/MyInput/MyInput";
import classes from "./BoardList.module.css"
import Preloader from "../Preloader/Preloader";
import { fetchBoards, updateBoard } from "../../features/boards/BoardsSlice";

const BoardList = ({tasks,...boards}) => {
    const dispatch = useDispatch()
    const [sortedBoards,setSortedBoards] = useState(boards.data)
    useEffect(() => setSortedBoards(boards.data),[[...boards.data]])

//================================SEARCH BOARD BY NAME=====================================//
    const [search,setSearch] = useState('')
    useEffect(() => {
      setSortedBoards(find(search,boards.data));
    },[search])

//================================END SEARCH BOARD BY NAME=================================//


//================================//DRAG & DROP//==================================//
    const [currentBoard,setCurrentBoard] = useState(null)

    function dragStartHandler(e,board) {
        setCurrentBoard(board);
        e.target.style.transform = 'scale(.95)'
    }

    function dragEndHandler(e,board) {
        e.target.style.transform = 'scale(1)'
    }

    function dragOverHandler(e) {
        e.preventDefault();
        if(e.target.className !== classes.drag_box) return
        console.log('drag over ', e.target)
        e.target.style.transform = 'scale(1.05)'
    }

    function dropHandler(e,drop_board) {
        e.preventDefault();
        if(e.target.className !== classes.drag_box) return
        console.log('drop', drop_board)
        if (currentBoard.id === drop_board.id) return
        const tmp = drop_board.order_id
        dispatch(updateBoard({...drop_board, order_id : currentBoard.order_id}))
        dispatch(updateBoard({...currentBoard, order_id : tmp}))
        dispatch(fetchBoards()) 
    }

//================================//END DRAG & DROP//==============================//
    return (
        <div className={classes.boardlist}>
            <div className={classes.search_box}>
                <MyInput value={search} callback={(e) => setSearch(e.target.value)} label='Поиск'/>
            </div>
            {boards.loading && <Preloader/>}
            {!boards.loading && boards.error && <div>{boards.error}</div>}
            {!boards.loading && (sortedBoards.length !==0) && 
                <div className={classes.boardlist_listbox}>
                    {
                        sortedBoards.map(board => 
                            <div 
                                className={classes.drag_box} 
                                key={board.id}
                                style={{position:'relative',borderRadius: '10px'}}
                                draggable={true}
                                onDragStart={(e) => dragStartHandler(e,board)}
                                onDragLeave={(e) => dragEndHandler(e)} 
                                onDragEnd={(e) => dragEndHandler(e)} 
                                onDragOver={(e) => dragOverHandler(e)} 
                                onDrop={(e) => dropHandler(e,board)} 
                            >
                                <TaskBoard 
                                    tasks={tasks.filter(task => task.board_id === board.id)}
                                    id={board.id}
                                    board={board}
                                />
                            </div>)
                    }
                </div>
            }
        </div>
    )
}

export default BoardList;