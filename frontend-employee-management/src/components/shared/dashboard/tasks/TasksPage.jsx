// src/components/tasks/TasksPage.jsx
import React from 'react';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import Header from '../Header';
import CreateEmployeeDialog from '../employees/CreateEmployeeDialog';
import TaskList from './TaskList';
import CreateTaskDialog from './CreateTaskDialog';

function TasksPage() {
  return (
    <DashboardLayout>
      <Header
        title="Task Manager"
        subtitle="Here you can manage all tasks"
      >
    <CreateTaskDialog />
      </Header>
      <TaskList />
    </DashboardLayout>
  );
}

export default TasksPage;
