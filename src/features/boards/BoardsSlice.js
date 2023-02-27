import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import PostServise from "../../API/PostServise"
import { url } from "../../API/PostServise";

const link = new URL(`${url}api/boards`);
const initialState = {
    loading: false,
    error:'',
    data: [],
}

    
export const fetchBoards = createAsyncThunk('boards/get', async () =>  {
    return PostServise.getAll(link.href)
})
export const sendBoard = createAsyncThunk('boards/post', async (data) => {
    return PostServise.create(link.href,data)
})
export const deleteBoard = createAsyncThunk('boards/delete', async (id) => {
    return PostServise.delete(link.href,id)
})
export const updateBoard = createAsyncThunk('boards/change', async (data) => {
    return PostServise.update(link,data)
})
export const updateBoardsOrder = createAsyncThunk('boards/setorder', async (id,data)=> {
    return PostServise.updateOrder(link.href,id,data)
})

const BoardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBoards.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchBoards.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(fetchBoards.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
        
        builder.addCase(sendBoard.fulfilled, (state,action) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(sendBoard.pending, (state) => {
            state.loading = true
        })
        builder.addCase(sendBoard.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })


        builder.addCase(deleteBoard.fulfilled, (state,action) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(deleteBoard.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteBoard.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
        

        builder.addCase(updateBoardsOrder.fulfilled, (state, action) => {
            const newData = action.payload;
            state.data = newData
        })
    }
})

export default BoardsSlice.reducer;