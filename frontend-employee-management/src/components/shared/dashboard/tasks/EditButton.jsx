import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const EditButton = ({ task, onUpdate }) => {
const [form, setForm] = useState({
    title: task.title,
    status: task.status,
    priority: task.priority,
});

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async () => {
try {
    const res = await fetch(`http://localhost:8095/api/tasks/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
});

    if (res.ok) {
    const updatedTask = await res.json();
    onUpdate(updatedTask);
    toast.success("Task updated successfully");
    } else {
    toast.error("Failed to update task");
    console.error("Failed to update task");
}
} catch (error) {
    toast.error("Error updating task");
    console.error("Error updating task", error);
    }
};

return (
<Dialog>
    <DialogTrigger asChild>
    <Button variant="outline">Edit</Button>
    </DialogTrigger>
    <DialogContent className="space-y-4">
    <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
    <Input name="status" value={form.status} onChange={handleChange} placeholder="Status" />
    <Input name="priority" value={form.priority} onChange={handleChange} placeholder="Priority" />
    <Button onClick={handleSubmit}>Save Changes</Button>
    </DialogContent>
</Dialog>
);
};

export default EditButton;
