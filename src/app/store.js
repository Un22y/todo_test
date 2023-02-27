import { configureStore } from '@reduxjs/toolkit';
import BoardSlice from '../features/boards/BoardsSlice';
import TasksSlice from '../features/tasks/TasksSlice';

export const store = configureStore({
  reducer: {
    boards: BoardSlice,
    tasks: TasksSlice,
  },
});
