"use client";

import  React from "react";
import { useDispatch } from "react-redux";
import { createTask } from "@/store/tasksSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
Dialog,
DialogTrigger,
DialogContent,
DialogHeader,
DialogTitle,
DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
Form,
FormField,
FormItem,
FormLabel,
FormControl,
FormMessage,
} from "@/components/ui/form";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import DeleteButton from "../department/DeleteButton";

const formSchema = z.object({
task_id: z.string().min(1, "Task ID is required"),
title: z.string().min(2, "Title must be at least 2 characters"),
status: z.enum(["todo", "in-progress", "done"]),
priority: z.enum(["low", "medium", "high"]),
});

export default function CreateTaskDialog() {
const dispatch = useDispatch();
const [open, setOpen] = React.useState(false);
const [loading, setLoading] = React.useState(false);

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
    task_id: "",
    title: "",
    status: "todo",
    priority: "low",
    },
});

const onSubmit = async (values) => {
    setLoading(true);
    try {
    await dispatch(createTask(values));
    toast.success("Task created successfully");
    form.reset();
    setOpen(false);
    } catch (error) {
    toast.error("Failed to create task");
    } finally {
    setLoading(false);
    }
};

return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
        <Button className="mb-4">Create Task <Plus /></Button>
       
    </DialogTrigger>
    <DialogContent>
    <DialogHeader>
        <DialogTitle>Create Task</DialogTitle>
        <DialogDescription>Fill the form to add a task</DialogDescription>
        </DialogHeader>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
            control={form.control}
            name="task_id"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Task ID</FormLabel>
                <FormControl>
                    <Input placeholder="TASK-01" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                    <select {...field} className="w-full border rounded-md p-2">
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                    </select>
                </FormControl>
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                    <select {...field} className="w-full border rounded-md p-2">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    </select>
                </FormControl>
                </FormItem>
            )}
            />

            <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create"}
            </Button>
        </form>
        
        </Form>
    </DialogContent>
    </Dialog>
);
}
