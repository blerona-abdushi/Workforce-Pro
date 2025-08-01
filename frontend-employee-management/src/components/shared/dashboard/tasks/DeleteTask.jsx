import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
Dialog,
DialogTrigger,
DialogContent,
DialogHeader,
DialogTitle,
DialogDescription,
DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const DeleteTask = ({ id, onDelete }) => {
const [open, setOpen] = useState(false);

const handleConfirmDelete = async () => {
try {
    const res = await fetch(`http://localhost:8095/api/tasks/${id}`, {
    method: "DELETE",
});
    if (res.ok) {
    onDelete(id);
    toast.success("Task deleted successfully");
} else {
    toast.error("Failed to delete task");
}
} catch (error) {
    toast.error("Error deleting task");
    console.error(error);
} finally {
    setOpen(false);
}
};

return (
<>
{/* Button që hap dialogun */}
    <Button variant="destructive" onClick={() => setOpen(true)}>Delete
</Button>

{/* Dialog i konfirmimit */}
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
<DialogHeader>
    <DialogTitle>Confirm deletion</DialogTitle>
    <DialogDescription>
Are you sure you want to delete this task? This action cannot be undone.
</DialogDescription>
    </DialogHeader>
<DialogFooter className="flex gap-2 justify-end">
    <Button variant="outline" onClick={() => setOpen(false)}>no</Button>
    <Button variant="destructive" onClick={handleConfirmDelete}>
yes
    </Button>
</DialogFooter>
</DialogContent>
</Dialog>
</>
);
};

export default DeleteTask;
