import type { Task } from "../core/task.js";

export interface TaskStore {
    load(): Promise<Task[]>;
    save(tasks: Task[]): Promise<void>;
}
