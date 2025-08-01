// src/store/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/tasks`;

// Fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

// Create task
export const createTask = createAsyncThunk("tasks/createTask", async (taskData) => {
  const res = await axios.post(BASE_URL, taskData);
  return res.data;
});
//Delete task
export const deleteTask = createAsyncThunk("tasks/deleteTask" , async () => {
  await axios.delete(`http://localhost:PORT/api/tasks/${taskId}`)
  return taskId
})

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled , (state , action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
