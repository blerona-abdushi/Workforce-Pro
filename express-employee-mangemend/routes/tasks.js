const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST a new task
router.post("/", async (req, res) => {
  try {
    const { task_id, title, status, priority } = req.body;
    const result = await pool.query(
      "INSERT INTO tasks (task_id, title, status, priority) VALUES ($1, $2, $3, $4) RETURNING *",
      [task_id, title, status, priority]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// DELETE a task by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

//put update a task by id

router.put("/:id" , async (req , res) => {
  try{
    const {id} = req.params;
    const {title , status , priority} = req.body;

    const result = await pool.query(
      "UPDATE tasks SET title = $1, status = $2, priority = $3 WHERE id = $4 RETURNING *",
      [title, status, priority, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({error: "Task not found"})
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Failed to update Task"})
  }
})



module.exports = router;
