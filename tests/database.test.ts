import { describe, expect, test, beforeAll, afterAll } from "bun:test";
import { initDatabase, closeDatabase, writeMemory, readMemory, deleteMemory } from "../src/server/database";

describe("Database Tests", () => {
  beforeAll(() => {
    // 初始化数据库
    initDatabase();
  });

  afterAll(() => {
    // 关闭数据库连接
    closeDatabase();
  });

  test("memory operations", () => {
    const testId = "test-agent-db";
    const testMemory = "test memory content for database";

    // 写入记忆
    writeMemory(testId, testMemory);

    // 读取记忆
    const memory = readMemory(testId);
    expect(memory).toBe(testMemory);

    // 删除记忆
    deleteMemory(testId);
    const deletedMemory = readMemory(testId);
    expect(deletedMemory).toBeNull();
  });

  test("memory overwrite", () => {
    const testId = "test-agent-overwrite";
    const initialMemory = "initial memory";
    const updatedMemory = "updated memory";

    // 写入初始记忆
    writeMemory(testId, initialMemory);
    expect(readMemory(testId)).toBe(initialMemory);

    // 覆写记忆
    writeMemory(testId, updatedMemory);
    expect(readMemory(testId)).toBe(updatedMemory);

    // 清理
    deleteMemory(testId);
  });

  test("non-existent memory", () => {
    const nonExistentId = "non-existent-agent";
    const memory = readMemory(nonExistentId);
    expect(memory).toBeNull();
  });
}); 