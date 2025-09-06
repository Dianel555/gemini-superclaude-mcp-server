# Gemini SuperClaude MCP 服务器

[![Version](https://img.shields.io/badge/version-2.0.2-blue.svg)](https://github.com/Dianel555/gemini-superclaude-mcp-server)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![SuperClaude](https://img.shields.io/badge/SuperClaude-v4.0.9-purple.svg)](https://github.com/SuperClaude-Org/SuperClaude_Framework)
[![Commands](https://img.shields.io/badge/commands-22-success.svg)](gemini-superclaude.md#complete-command-set)
[![Agents](https://img.shields.io/badge/agents-14-success.svg)](gemini-superclaude.md#enhanced-agent-system)
[![MCP Servers](https://img.shields.io/badge/mcp_servers-6-blue.svg)](gemini-superclaude.md#real-mcp-integration)

## [English](README.md)|中文

## [GEMINI_CLI_COMMANDS](GEMINI_CLI_COMMANDS.md)

**完全升级**的MCP服务器，为Gemini CLI提供SuperClaude Framework v4.0.9兼容性。具有增强的命令路由功能，配备**22个专业化`/sc:`命令**(包括新的商业面板)，**14个领域专家agent**，**6个集成的MCP服务器**，以及**完整的Gemini CLI集成**（通过TOML命令）。

## 🚀 v2.0.2版本新功能 (SuperClaude v4.0.9 升级)

- **💼 新增：商业面板**: 9位思想领袖的多专家商业分析 (Christensen, Porter, Drucker, Godin, Kim & Mauborgne, Collins, Taleb, Meadows, Doumont)
- **🎯 Gemini CLI集成**: 所有22个命令可在Gemini CLI中通过`/sc:command`调用，基于TOML配置
- **📦 自动安装**: `npm run install-commands`实现无缝Gemini CLI集成
- **🧠 增强路由**: 智能上下文分析、agent选择和MCP服务器协调。
- **🤖 14个专业化Agent**: 替代旧的角色系统，提供架构、安全、性能等领域的专家。
- **🔗 6个MCP服务器**: 与Sequential, Context7, Magic, Playwright, **Morphllm**, 和 **Serena**完全集成。
- **📋 22个专业化命令**: 所有命令现在使用`/sc:`命名空间，新增商业面板。
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

**22个核心命令**，使用`/sc:`命名空间，兼容SuperClaude Framework v4.0.9：

### 开发与编排
- `sc:build`, `sc:implement`, `sc:workflow`, `sc:design`

### 分析与发现
- `sc:analyze`, `sc:brainstorm`, `sc:troubleshoot`, `sc:business-panel`, `sc:estimate`

### 质量与维护  
- `sc:improve`, `sc:test`, `sc:cleanup`, `sc:git`

### 文档与学习
- `sc:explain`, `sc:document`

### 操作与协调
- `sc:task`, `sc:spawn`, `sc:load`, `sc:save`, `sc:reflect`

### 元与发现
- `sc:index`, `sc:select-tool`

## 🎯 Gemini CLI集成

在Gemini CLI中直接安装SuperClaude命令：

```bash
# 安装所有22个命令作为/sc:快捷方式
npm run install-commands

# 在Gemini CLI中使用
/sc:analyze --security --deep
/sc:business-panel strategy.md --experts porter,taleb --mode debate  
/sc:build ecommerce --framework nextjs --magic

# 如需卸载
npm run uninstall-commands
```

### 商业面板 (v4.0.9新功能)

9位思想领袖的多专家商业分析：
- **Clayton Christensen**: 颠覆性创新理论、用户雇用理论
- **Michael Porter**: 竞争战略、五力模型  
- **Peter Drucker**: 管理哲学、目标管理
- **Seth Godin**: 营销创新、部落建设
- **Kim & Mauborgne**: 蓝海战略
- **Jim Collins**: 组织卓越
- **Nassim Taleb**: 风险管理、反脆弱性
- **Donella Meadows**: 系统思维
- **Jean-luc Doumont**: 沟通系统

## 📊 架构 (v4.0.9)

```
┌────────────────────────────────────────────────────────────┐
│                        Gemini CLI                          │
│          ┌─────────────────────────────────────┐           │
│          │    22 /sc: Commands via TOML        │           │
│          └─────────────────────────────────────┘           │
├────────────────────────────────────────────────────────────┤
│          Gemini SuperClaude MCP Server v2.0.2              │
│   ┌─────────────┐  ┌─────────────────┐  ┌─────────────┐    │
│   │ Enhanced    │  │   14-Agent      │  │ Business    │    │
│   │ Routing     │  │   System        │  │ Panel (9)   │    │
│   └─────────────┘  └─────────────────┘  └─────────────┘    │
├────────────────────────────────────────────────────────────┤
│           MCP Orchestration Layer (6 Servers)              │
│ ┌─────────┐┌────────┐┌─────┐┌──────────┐┌────────┐┌──────┐ │
│ │Sequentia││Context7││Magic││Playwright││Morphllm││Serena│ │
│ └─────────┘└────────┘└─────┘└──────────┘└────────┘└──────┘ │
├────────────────────────────────────────────────────────────┤
│              SuperClaude Framework v4.0.9                  │
└────────────────────────────────────────────────────────────┘
```
## 🤝 贡献指南

欢迎提交PR！请先fork本仓库，创建特性分支，然后提交pull request



## 🙏 Acknowledgments

- 感谢 [SuperClaude_Framework.](https://github.com/SuperClaude-Org/SuperClaude_Framework/tree/master)
- 原始项目 [tinywind/superclaude-gemini-integration-mcp](https://github.com/tinywind/superclaude-gemini-integration-mcp) 提供基础架构
- MCP社区负责协议标准制定



## 📄 协议

MIT协议 - 详见  [LICENSE](LICENSE) 文件
