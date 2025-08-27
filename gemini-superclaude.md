# Gemini SuperClaude MCP 服务器

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/Dianel555/gemini-superclaude-mcp-server)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![SuperClaude](https://img.shields.io/badge/SuperClaude-v4.0.8-purple.svg)](https://github.com/SuperClaude-Org/SuperClaude_Framework)
[![Commands](https://img.shields.io/badge/commands-21-success.svg)](gemini-superclaude.md#complete-command-set)
[![Agents](https://img.shields.io/badge/agents-14-success.svg)](gemini-superclaude.md#enhanced-agent-system)
[![MCP Servers](https://img.shields.io/badge/mcp_servers-6-blue.svg)](gemini-superclaude.md#real-mcp-integration)

[English](README.md)|中文

**完全升级**的MCP服务器，为Gemini CLI提供SuperClaude Framework v4.0.8兼容性。具有增强的命令路由功能，配备**21个专业化`/sc:`命令**，**14个领域专家agent**和**6个集成的MCP服务器**。

## 🚀 v2.0.0版本新功能 (SuperClaude v4.0.8 升级)

- **🧠 增强路由**: 智能上下文分析、agent选择和MCP服务器协调。
- **🤖 14个专业化Agent**: 替代旧的角色系统，提供架构、安全、性能等领域的专家。
- **🔗 6个MCP服务器**: 与Sequential, Context7, Magic, Playwright, **Morphllm**, 和 **Serena**完全集成。
- **📋 21个专业化命令**: 所有命令现在使用`/sc:`命名空间以防止冲突。
- **⚡ 5种行为模式**: Brainstorming, Introspection, Orchestration, Task Management, 和 Token Efficiency 模式。
- **💾 跨会话持久化**: `sc:load` 和 `sc:save` 命令由Serena MCP提供支持，用于会话记忆。

## 🔧 快速入门

### 方式1: NPM包 (推荐)

```bash
# 全局安装
npm install -g gemini-superclaude-mcp-server

# 配置Gemini CLI (~/.gemini/settings.json)
{
  "mcpServers": {
    "superclaude": {
      "command": "npx",
      "args": ["-y", "gemini-superclaude-mcp-server"],
      "env": {
        "CLAUDE_CONFIG_DIR": "${HOME}/.claude"
      }
    }
  }
}
```

## 🤖 增强型Agent系统 (替代旧版Persona)

**14个专业化Agent**为任何任务提供领域专业知识：

| Agent | 专注领域 | 思维模式 | 自动触发 | 专业命令 |
|---|---|---|---|---|
| **system-architect**| 系统设计 | 系统化 | architecture, design | sc:build, sc:analyze |
| **frontend-architect**| 用户体验 | 用户中心 | ui, component, responsive| sc:build, sc:implement |
| **backend-architect**| 数据完整性 | 数据驱动 | api, database, service | sc:implement, sc:troubleshoot|
| **devops-architect**| 自动化 & CI/CD | 自动化导向 | deploy, infrastructure | sc:workflow, sc:git |
| **security-engineer**| 威胁建模 | 威胁导向 | security, vulnerability | sc:analyze, sc:improve |
| **performance-engineer**| 性能优化 | 指标驱动 | optimize, performance | sc:analyze, sc:improve |
| **quality-engineer**| 测试策略 | 系统验证 | test, quality, validation | sc:test, sc:troubleshoot|
| **refactoring-expert**| 代码质量 | 简化导向 | refactor, cleanup, debt | sc:improve, sc:cleanup |
| **root-cause-analyst**| 问题调查 | 调查性 | debug, investigate | sc:analyze, sc:troubleshoot|
| **requirements-analyst**| 需求发现 | 发现导向 | requirements, scope | sc:brainstorm, sc:estimate|
| **python-expert** | Python架构 | Pythonic | python, django, flask | sc:implement, sc:improve |
| **socratic-mentor**| 知识传递 | 教育性 | learn, explain | sc:explain, sc:document |
| **learning-guide**| 概念简化 | 教学法 | tutorial, beginner | sc:explain, sc:document |
| **technical-writer**| 文档 | 沟通导向 | document, readme, guide | sc:document, sc:save |

## 🔗 真实MCP集成

### 6个支持的服务器
- **Sequential**: 复杂多步推理
- **Context7**: 文档和模式查找
- **Magic**: UI组件生成
- **Playwright**: E2E测试和浏览器自动化
- **Morphllm**: 基于模式的代码编辑和批量转换
- **Serena**: 语义化代码理解和跨会话记忆

## 📋 完整命令集

**21个核心命令**，使用`/sc:`命名空间，兼容SuperClaude Framework v4.0.8：

### 开发与编排
- `sc:build`, `sc:implement`, `sc:workflow`, `sc:design`

### 分析与发现
- `sc:analyze`, `sc:brainstorm`, `sc:troubleshoot`, `sc:estimate`

### 质量与维护
- `sc:improve`, `sc:test`, `sc:cleanup`, `sc:git`

### 知识与文档
- `sc:explain`, `sc:document`

### 操作与会话
- `sc:task`, `sc:spawn`, `sc:load`, `sc:save`, `sc:reflect`

### 元与发现
- `sc:index`, `sc:select-tool`

## 📊 架构 (v4.0.8)

```
┌─────────────────────────────────────────┐
│             Gemini CLI                  │
├─────────────────────────────────────────┤
│    Gemini SuperClaude MCP Server v2.0.0   │
├─────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────┐   │
│  │ 增强路由    │  │   14-Agent系统    │   │
│  └─────────────┘  └─────────────────┘   │
├─────────────────────────────────────────┤
│         MCP编排层 (6个服务器)         │
│┌─────────┐┌──────┐┌──────┐┌──────┐┌────┐┌────┐│
││Sequential││Context7││Magic││Playwright││Morphllm││Serena││
│└─────────┘└──────┘└──────┘└──────┘└────┘└────┘│
├─────────────────────────────────────────┤
│        SuperClaude Framework v4.0.8       │
└─────────────────────────────────────────┘
```
