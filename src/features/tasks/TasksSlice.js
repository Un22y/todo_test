import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import PostServise, {url} from "../../API/PostServise"


const link = new URL(`${url}api/tasks`)
const initialState = {
    loading: false,
    error:'',
    data: [],
}

    
export const fetchTasks = createAsyncThunk('tasks/fetch',async () => PostServise.getAll(link))

export const getTasksByBoard = createAsyncThunk('tasks/fetch_by_board', async (board_id) => {
    const response = await axios.get(link,{
        params: {
            board_id: board_id
        }
    })
    const data = await response.data
    return data
})



export const sendTask = createAsyncThunk('tasks/post', async (data) => {
    return PostServise.create(link.href,data)
})
export const deleteTask = createAsyncThunk('tasks/delete', async (id) => {
    return PostServise.delete(link.href,id)
})
export const updateTask = createAsyncThunk('task/change', async (data) => {
    return PostServise.update(link,data)
})



const TasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        getFilteredTasks: (state, action) => {
            const filteredTasks = state.data.filter(task => task.board_id == action.payload)
            return filteredTasks
        } 
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
        builder.addCase(sendTask.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(sendTask.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
    }
})

export const {getFilteredTasks} = TasksSlice.actions;
export default TasksSlice.reducer;