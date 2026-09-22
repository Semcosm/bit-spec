---
id: repository-index
title: Bit 规范索引
slug: /index
sidebar_position: 2
---

# Bit 规范索引

这是仓库的稳定入口。链接按所描述的层次分组；文档可以引用更低层次的内容，但不能悄悄重新定义它。

## 规范性内容

### Bit 语言

- [语言](spec/bit/language.md)
- [语义](spec/bit/semantics.md)
- [类型系统](spec/bit/type-system.md)
- [内存模型](spec/bit/memory-model.md)
- [并发](spec/bit/concurrency.md)
- [模块系统](spec/bit/module-system.md)

### Bit 中间表示（BIR）

- [概览](spec/bir/overview.md)
- [核心模型](spec/bir/core.md)
- [类型](spec/bir/types.md)
- [操作](spec/bir/operations.md)
- [区域](spec/bir/regions.md)
- [内存](spec/bir/memory.md)
- [验证](spec/bir/verification.md)

### 边界规范

- [ABI](spec/abi/README.md)
- [运行时](spec/runtime/README.md)
- [引导](spec/bootstrap/README.md)

## 架构与设计

- [架构概览](architecture/overview.md)
- [层次](architecture/layers.md)
- [信任边界](architecture/trust-boundary.md)
- [编译流程](architecture/compilation-pipeline.md)
- [依赖模型](architecture/dependency-model.md)
- [目标](design/goals.md)
- [非目标](design/non-goals.md)
- [原则](design/principles.md)
- [不变量](design/invariants.md)
- [约束](design/constraints.md)

## 变更治理

- [RFC 流程](rfcs/0000-rfc-process.md)
- [已接受 RFC](rfcs/accepted/README.md)
- [提议中的 RFC](rfcs/proposed/README.md)
- [被拒绝的 RFC](rfcs/rejected/README.md)
- [已取代的 RFC](rfcs/superseded/README.md)
- [决策记录](decisions/README.md)

## 实践材料

- [指南概览](guides/overview.md)
- [编译器指南](guides/compiler.md)
- [BIR 指南](guides/bir.md)
- [引导指南](guides/bootstrap.md)
- [术语表](glossary/terms.md)
- [一致性](conformance/README.md)
- [历史](history/README.md)
