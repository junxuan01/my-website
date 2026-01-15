---
title: "MySQL 实战入门"
description: "专注最核心、最实用的 MySQL 知识"
date: "2026-01-14"
author: "郭相文"
---

# MySQL 实战入门

> 只学最有用的，快速上手 MySQL 数据库

## 🎯 学完你将掌握

- ✅ 创建表和设计表关系
- ✅ 编写 SQL 增删改查
- ✅ 使用 JOIN 进行多表查询
- ✅ 理解索引和事务

## 📚 课程内容

### 第 1 课：为什么需要数据库
[→ 开始学习](./1.MySQL%20简介与历史背景.md)

从一个真实场景出发，理解数据库存在的意义

### 第 2 课：SQL 基础 - 增删改查
[→ 开始学习](./2.SQL基础.md)

**核心内容**：
- CREATE TABLE - 创建表
- INSERT - 插入数据
- SELECT - 查询数据
- UPDATE - 更新数据
- DELETE - 删除数据
- WHERE - 条件过滤
- ORDER BY - 排序
- LIMIT - 分页

**实战**：构建一个待办事项表

### 第 3 课：表关系设计
[→ 开始学习](./3.表关系设计.md)

**核心内容**：
- 一对一关系（用户 ↔ 用户详情）
- 一对多关系（用户 ↔ 订单）
- 多对多关系（学生 ↔ 课程）
- 外键的使用（实际项目中用不用？）

**实战**：设计博客系统的表结构

### 第 4 课：JOIN 查询 - 多表关联
[→ 开始学习](./4.JOIN查询.md)

**核心内容**：
- INNER JOIN - 内连接
- LEFT JOIN - 左连接
- RIGHT JOIN - 右连接
- 多表 JOIN
- 聚合函数（COUNT、SUM、AVG）
- GROUP BY 分组

**实战**：查询用户的订单统计

### 第 5 课：索引 - 让查询快 1000 倍
[→ 开始学习](./5.索引.md)

**核心内容**：
- 什么是索引
- 创建索引
- 联合索引和最左前缀原则
- EXPLAIN 分析查询
- 索引失效的场景

**实战**：优化慢查询

### 第 6 课：事务 - 保证数据安全
[→ 开始学习](./6.事务.md)

**核心内容**：
- 什么是事务
- ACID 特性
- BEGIN、COMMIT、ROLLBACK
- 隔离级别
- 乐观锁 vs 悲观锁

**实战**：实现转账功能

---

## 💡 学习建议

### 学习顺序
1. **按顺序学**：每一课都建立在前一课的基础上
2. **必须动手**：每个示例都要自己敲一遍
3. **做练习题**：每课都有练习，完成后再继续

### 快速上手
如果你想快速开始：
1. 用 Docker 启动 MySQL：`docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:8`
2. 直接跳到第 2 课开始写 SQL
3. 边学边练，1 周掌握核心内容

### 时间安排
- **第 1-2 天**：基础语法（第 1-2 课）
- **第 3-4 天**：表关系和 JOIN（第 3-4 课）
- **第 5 天**：索引优化（第 5 课）
- **第 6 天**：事务处理（第 6 课）

## 🚫 本系列不包含

为了保持简洁实用，以下内容不在本系列中：
- ❌ 复杂的安装配置（推荐用 Docker）
- ❌ 视图、存储过程、触发器（现代开发很少用）
- ❌ JSON 特性（不是核心需求）
- ❌ 性能调优（适合有经验后再学）
- ❌ 主从复制、分库分表（运维内容）

**专注核心，快速上手！**

## 🛠️ 准备工作

### 方式 1：Docker（推荐）

```bash
# 启动 MySQL
docker run --name mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=myapp \
  -p 3306:3306 \
  -d mysql:8

# 连接
docker exec -it mysql mysql -u root -p
```

### 方式 2：本地安装

**macOS**：
```bash
brew install mysql
brew services start mysql
```

**Windows**：
下载安装包：https://dev.mysql.com/downloads/mysql/

### 测试连接

```sql
-- 看到 mysql> 提示符后，输入：
SELECT 'Hello MySQL!' as message;
```

成功！现在开始第 1 课吧 →

---

**现在就开始** → [第 1 课：为什么需要数据库](./1.MySQL%20简介与历史背景.md)
