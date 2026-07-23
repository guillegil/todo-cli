export type TaskStatus = "pending" | "done";

export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}

export function addTask(tasks: Task[], title: string): Task[] {
    const nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    const task: Task = {
        id: nextId,
        title,
        status: "pending",
    };

    return [...tasks, task];
}

export function completeTask(tasks: Task[], id: number): Task[] {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

export function removeTask(tasks: Task[], id: number): Task[] {
    return tasks.filter((t) => t.id !== id);
}
