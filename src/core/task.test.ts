import { describe, expect, it } from "vitest";
import { addTask, completeTask, removeTask, type Task } from "./task.js";

describe("addTask", () => {
    it("adds a pending task with an incrementing id", () => {
        const result = addTask([], "Buy milk");
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            id: 1,
            title: "Buy milk",
            status: "pending",
        });
    });

    it("does not mutate the origital array", () => {
        const tasks: Task[] = [];
        addTask(tasks, "Buy milk");
        expect(tasks).toHaveLength(0);
    });
});

describe("completeTask", () => {
    it("does change the sttus of a task to 'done'", () => {
        const tasks = addTask([], "Buy milk");
        const result = completeTask(tasks, 1);
        expect(result[0]?.status).toBe("done");
    });

    it("leaves other tasks untouched", () => {
        let tasks = addTask([], "Buy milk");
        tasks = addTask(tasks, "Buy coffee");

        const result = completeTask(tasks, 2);

        expect(result[0]?.status).toBe("pending");
    });
});

describe("removeTask", () => {
    it("removes the task with the given id", () => {
        let tasks = addTask([], "A"); // id 1
        tasks = addTask(tasks, "B"); // id 2
        const result = removeTask(tasks, 1);
        expect(result).toHaveLength(1);
        expect(result[0]?.id).toBe(2);
    });
});
