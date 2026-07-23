import type { Task } from "../core/task.js";
import type { TaskStore } from "./store.js";

export class InMemoryStore implements TaskStore {
    private tasks: Task[] = [];

    async save(tasks: Task[]): Promise<void> {
        this.tasks = [...tasks];
    }

    async load(): Promise<Task[]> {
        return [...this.tasks];
    }
}
