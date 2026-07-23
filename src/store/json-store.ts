import { readFile, rename, writeFile } from "node:fs/promises";
import type { Task } from "../core/task.js";
import type { TaskStore } from "./store.js";

export class JsonFileStore implements TaskStore {
    constructor(private readonly filePath: string) {}

    async load(): Promise<Task[]> {
        try {
            const jsonTasks = await readFile(this.filePath, "utf8");
            return JSON.parse(jsonTasks) as Task[];
        } catch (err) {
            if (
                err instanceof Error &&
                "code" in err &&
                err.code === "ENOENT"
            ) {
                return [];
            }
            throw err;
        }
    }

    async save(tasks: Task[]): Promise<void> {
        const json = JSON.stringify(tasks, null, 2); // null, 2 = JSON legible (RNF)
        const tempPath = `${this.filePath}.tmp`;
        await writeFile(tempPath, json, "utf8"); // 1. escribe primero en un archivo temporal
        await rename(tempPath, this.filePath); // 2. renombra sobre el real (operación atómica)
    }
}
