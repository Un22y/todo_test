import './App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardList from './components/BoardList/BoardList';
import AddTaskBoard from './components/UI/AddTaskBoard/AddTaskBoard';
import MyModal from './components/UI/MyModal/MyModal';
import { fetchBoards } from './features/boards/BoardsSlice';
import { fetchTasks } from './features/tasks/TasksSlice';
import MyButton from "./components/UI/MyButton/MyButton";


function App() {
  const dispatch = useDispatch();
  const [showAddMenu, setShowAddMenu] = useState(false)
  useEffect(() => {
    dispatch(fetchTasks())
    dispatch(fetchBoards())
  },[])

  const boards = useSelector(state => state.boards)
  const [clientBoards,setClientBoards] = useState(boards)
  useEffect(() => {
    setClientBoards(boards)
  },[{...boards}])
  
  const tasks = useSelector(state => state.tasks.data)
  const [clientTasks, setClientTasks] = useState(tasks)
  useEffect(() => {
    setClientTasks(tasks)
  },[tasks])

  return (
    <div className="App">
      <h1 className='title'>To-Do test app</h1>
      <MyModal visible={showAddMenu} setVisible={setShowAddMenu}>
        <AddTaskBoard setVisible={() => setShowAddMenu(true)}/>
      </MyModal>
      <div className='main_button'>
        <MyButton callback={()=> setShowAddMenu(true)}>Add task board</MyButton>
      </div>
      <div className='main_button'>
        <MyButton callback={()=> dispatch(fetchBoards())}>refresh</MyButton>
      </div>
      <BoardList tasks={clientTasks} loading={clientBoards.loading} data={clientBoards.data} error={clientBoards.error}/>
    </div>
  )
}

export default App;
