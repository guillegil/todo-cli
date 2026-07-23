import { rm } from "node:fs/promises";
import { afterEach, describe, expect, it } from "vitest";
import { addTask } from "../core/task.js";
import { JsonFileStore } from "./json-store.js";

const TEST_FILE = "test-tasks.json";

afterEach(async () => {
    await rm(TEST_FILE, { force: true }); // clean up after each test
});

describe("JsonFileStore", () => {
    it("returns [] when the file does not exist", async () => {
        const store = new JsonFileStore(TEST_FILE);
        expect(await store.load()).toEqual([]);
    });

    it("saves and loads tasks (round-trip)", async () => {
        const store = new JsonFileStore(TEST_FILE);
        const tasks = addTask([], "Buy milk");
        await store.save(tasks);
        expect(await store.load()).toEqual(tasks);
    });
});
