# mcp-teamate-server

MCP Teamate HTTP API Server

## 项目说明

这是一个为MCP Teamate提供HTTP API服务的服务器端程序。

## 目录结构

```
src/          # 源代码目录
  server/     # 服务器端代码
data/         # 数据目录（自动创建，不包含在版本控制中）
tests/        # 测试文件目录
```

## 安装依赖

```bash
bun install
```

## 运行

```bash
bun run src/server/index.ts
```

## 测试

```bash
bun test
```

## 注意事项

- `data` 目录用于存储数据库文件，会在程序首次运行时自动创建
- 该目录不包含在版本控制中，每个环境需要维护自己的数据

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
