import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import deparmentsReducer from "./departmentsSlice";
import employeesReducer from "./emplyeesSlice";
import tasksReducer from "./tasksSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    departments: deparmentsReducer,
    employees: employeesReducer,
    tasks: tasksReducer,
  },
});
export default store;
