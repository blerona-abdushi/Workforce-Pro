import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "@/store/tasksSlice";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditTask from "./EditButton";
import EditButton from "./EditButton";
import DeleteTask from "./DeleteTask";

const  TaskList = ()  => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);



  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Done</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{task.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        task.priority === 'high'
                          ? 'bg-red-200 text-red-700'
                          : task.priority === 'medium'
                          ? 'bg-yellow-200 text-yellow-700'
                          : 'bg-green-200 text-green-700'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2">
                  <EditButton task={task} onUpdate={() => dispatch(fetchTasks())} />
                    <DeleteTask id={task.id} onDelete={() => dispatch(deleteTask(task.id))} />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
export default TaskList