import { describe, expect, test } from "bun:test";

describe("Message API Tests", () => {
  const SERVER_URL = "http://127.0.0.1:3001";

  test("send and receive message", async () => {
    // 发送消息
    const message = {
      sender: "test-sender",
      receiver: "test-receiver",
      content: "test message content",
      type: "text",
    };

    const sendResponse = await fetch(`${SERVER_URL}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    expect(sendResponse.status).toBe(200);
    const sendData = await sendResponse.json();
    expect(sendData.data.id).toBeDefined();

    const messageId = sendData.data.id;

    // 获取消息
    const getResponse = await fetch(`${SERVER_URL}/message/${messageId}`);
    expect(getResponse.status).toBe(200);
    const getData = await getResponse.json();
    const receivedMessage = getData.data;
    expect(receivedMessage.content).toBe(message.content);
    expect(receivedMessage.sender).toBe(message.sender);
    expect(receivedMessage.receiver).toBe(message.receiver);
    expect(receivedMessage.type).toBe(message.type);
    expect(receivedMessage.read).toBe(true);

    // 获取接收者的所有消息
    const getAllResponse = await fetch(
      `${SERVER_URL}/message?receiver=${message.receiver}`
    );
    expect(getAllResponse.status).toBe(200);
    const getAllData = await getAllResponse.json();
    const messages = getAllData.data;
    expect(Array.isArray(messages)).toBe(true);
    expect(messages.length).toBeGreaterThan(0);
    expect(messages.some((msg: any) => msg.id === messageId)).toBe(true);

    // 删除消息
    const deleteResponse = await fetch(`${SERVER_URL}/message/${messageId}`, {
      method: "DELETE",
    });
    expect(deleteResponse.status).toBe(200);

    // 验证消息已被删除
    const getDeletedResponse = await fetch(`${SERVER_URL}/message/${messageId}`);
    const getDeletedData = await getDeletedResponse.json();
    expect(getDeletedData.data).toBeUndefined();
  });

  test("get messages with invalid receiver", async () => {
    const response = await fetch(`${SERVER_URL}/message`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.message).toBe("Missing receiver parameter");
  });

  test("get non-existent message", async () => {
    const response = await fetch(`${SERVER_URL}/message/non-existent-id`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.data).toBeUndefined();
  });
}); 