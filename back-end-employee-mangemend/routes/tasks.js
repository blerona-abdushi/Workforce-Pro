const Task = require("../routes/tasks")

exports.getAllTasks = async (req , res) => {
    try{
        const tasks = await tasks.getAllTasks();
        res.json(tasks)
    } catch (err) {
        res.status(500).json({err: "Failed to fetch Tasks"});
    }
};

exports.createTask = async (req , res) => {
    try {
        const {task_id , title , status , priority} = req.body;
        const newTask = await Task.createTask({task_id , title , status , priority})
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({err: "Failed to Create Tasks"})
    }
};

exports.deleteTask = async (req , res) => {
    try {
        const deleted = await Task.deleteTask(req.params.id);
        if (deleted) res.json({message: "Task deleted"});
        else res.status(404).json({err: "Task not found"});

    } catch (err) {
        res.status(500).json({err: "Failed to delete Task"})
    }
};
const updateTask = async (id, {title, status, priority}) => {
    const result = await pool.query(
        "UPDATE tasks SET title = $1, status = $2, priority = $3 WHERE id = $4 RETURNING *",
        [title, status, priority, id]
    );
    return result.rows[0]
};

module.exports = {
    getAllTasks,
    createTask,
    deleteTask,
    updateTask
};