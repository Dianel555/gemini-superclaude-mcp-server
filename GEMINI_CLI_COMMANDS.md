# Gemini CLI SuperClaude 命令集成

让Gemini CLI支持SuperClaude Framework v4.0.9的所有22个专业命令，通过`/sc:`前缀直接调用。

## 🚀 快速安装

### 1. 安装SuperClaude命令
```bash
npm run install-commands
```

### 2. 启动MCP服务器
```bash
npm start
# 或在后台运行
npm run dev
```

### 3. 在Gemini CLI中使用
现在可以在Gemini CLI中直接使用以下命令：

```bash
# 代码分析
/sc:analyze --security --deep

# 项目构建  
/sc:build --framework react --tdd

# 功能实现
/sc:implement user-auth --type api --test

# 商业分析面板 (新功能!)
/sc:business-panel strategy-doc.md --experts porter,christensen --mode debate

# 需求发现
/sc:brainstorm --requirements --agile

# 问题诊断
/sc:troubleshoot --trace --fix
```

## 📋 完整命令列表 (22个命令)

### 🏗️ 核心开发命令
| 命令 | 描述 | 主要用途 |
|------|------|----------|
| `/sc:build` | 通用项目构建器 | 智能脚手架和项目初始化 |
| `/sc:implement` | 功能实现 | 智能特性开发和代码生成 |
| `/sc:workflow` | 多阶段工作流编排 | 复杂项目的系统化执行流程 |

### 🔍 分析与发现命令  
| 命令 | 描述 | 主要用途 |
|------|------|----------|
| `/sc:analyze` | 多维度代码分析 | 代码质量、安全、性能、架构评估 |
| `/sc:brainstorm` | 协作式头脑风暴 | 需求发现和战略规划 |
| `/sc:troubleshoot` | 问题诊断解决 | 系统性故障排除和修复 |
| `/sc:business-panel` | 商业专家面板 | 9位商业思想家多角度分析 |

### ✅ 质量与测试命令
| 命令 | 描述 | 主要用途 |
|------|------|----------|
| `/sc:improve` | 代码改进重构 | 代码质量提升和现代化 |
| `/sc:test` | 综合测试策略 | 单元、集成、E2E测试 |
| `/sc:task` | 高级任务协调 | 智能任务分解和代理协调 |
| `/sc:spawn` | 分布式处理 | 专业代理生成和并行处理 |

### 📚 文档与解释命令
| 命令 | 描述 | 主要用途 |
|------|------|----------|
| `/sc:explain` | 智能代码解释 | 上下文化代码教学和理解 |
| `/sc:document` | 技术文档生成 | API文档、用户指南、参考文档 |

### 🧹 维护与优化命令
| 命令 | 描述 | 主要用途 |
|------|------|----------|
| `/sc:cleanup` | 代码库清理 | 代码组织和结构优化 |
| `/sc:git` | Git工作流自动化 | 版本控制优化和自动化 |

### 📊 规划与设计命令
| 命令 | 描述 | 主要用途 |
|------|------|----------|
| `/sc:estimate` | 项目评估分析 | 时间线评估和资源规划 |
| `/sc:design` | 系统设计规划 | 架构设计和组件建模 |

### 🎯 会话与元命令
| 命令 | 描述 | 主要用途 |
|------|------|----------|
| `/sc:load` | 项目上下文加载 | 跨会话状态恢复 |
| `/sc:save` | 会话状态持久化 | 项目记忆和检查点保存 |
| `/sc:reflect` | 元认知反思 | 决策分析和性能改进 |

### 🔍 发现与导航命令
| 命令 | 描述 | 主要用途 |
|------|------|----------|
| `/sc:index` | 命令目录浏览 | 智能命令发现和推荐 |
| `/sc:select-tool` | 工具选择指导 | 技术栈优化和工具推荐 |

## 🎯 核心特性

### 专业代理系统 (14个专家)
- **system-architect**: 系统架构设计
- **frontend-architect**: 前端架构专家
- **backend-architect**: 后端架构专家
- **security-engineer**: 安全工程专家
- **performance-engineer**: 性能优化专家
- **root-cause-analyst**: 根因分析专家
- **business-panel-experts**: 商业战略专家面板

### MCP服务器集成 (6个服务)
- **Sequential**: 复杂推理和结构化分析
- **Context7**: 官方文档和框架模式
- **Magic**: UI组件生成和设计系统
- **Playwright**: 浏览器自动化测试
- **Morphllm**: 批量代码转换
- **Serena**: 语义代码理解和会话持久化

### 商业专家面板 (9位思想家)
- **Clayton Christensen**: 颠覆性创新理论
- **Michael Porter**: 竞争战略五力模型
- **Peter Drucker**: 管理哲学和目标管理
- **Seth Godin**: 营销创新和部落建设
- **Kim & Mauborgne**: 蓝海战略
- **Jim Collins**: 组织卓越和基业长青
- **Nassim Taleb**: 风险管理和反脆弱
- **Donella Meadows**: 系统思维
- **Jean-luc Doumont**: 结构化沟通

## 🛠️ 高级用法示例

### 🔍 深度分析与诊断
```bash
# 深度代码分析
/sc:analyze src/auth --focus security --depth deep
# 对认证模块进行深度安全分析

# 系统性问题诊断  
/sc:troubleshoot --trace --logs --root-cause
# 全面问题诊断与根因分析

# 性能瓶颈分析
/sc:analyze --performance --ultrathink
# 深度性能分析与优化建议
```

### 🏗️ 项目构建与实现
```bash
# 全栈项目构建
/sc:build e-commerce --framework nextjs --magic --wave
# 构建电商项目，使用Next.js框架，启用UI生成和多阶段编排

# 智能功能实现
/sc:implement payment-system --type api --framework fastapi --test --docs
# 实现支付系统API，包含测试和文档

# 复杂工作流编排
/sc:workflow project-plan.md --stages 5 --parallel --checkpoint
# 多阶段并行工作流与检查点管理
```

### 💼 商业战略分析
```bash
# 商业战略分析
/sc:business-panel business-plan.md --mode debate --experts porter,taleb,meadows
# 使用竞争战略、风险管理、系统思维角度辩论式分析商业计划

# 创新分析
/sc:business-panel innovation-strategy.md --experts christensen,drucker --mode discussion
# 颠覆性创新与管理哲学视角的协作分析

# 市场分析
/sc:business-panel market-research.md --experts porter,godin,kim_mauborgne --synthesis-only
# 竞争策略、营销创新、蓝海战略的综合分析
```

### 🎯 任务协调与分布式处理  
```bash
# 高级任务协调
/sc:task complex-feature --parallel --agents frontend-architect,backend-architect --priority high
# 多代理并行任务处理

# 分布式处理
/sc:spawn --agents 5 --domain full-stack --resources balanced
# 全栈领域的平衡资源分布式处理

# 智能代理选择
/sc:select-tool --task microservices --optimize performance --compare
# 微服务架构的性能优化工具对比选择
```

### 📚 文档与学习
```bash
# 智能代码解释
/sc:explain complex-algorithm.py --level advanced --interactive --examples
# 高级级别的交互式算法解释

# 技术文档生成
/sc:document --type api --format markdown --audience developer --examples
# 面向开发者的Markdown格式API文档

# 学习指导
/sc:explain design-patterns --level beginner --framework react
# React设计模式的入门级解释
```

### 🔧 维护与优化
```bash
# 代码库清理
/sc:cleanup --dead-code --structure --imports --format
# 全面代码库清理与优化

# Git工作流优化
/sc:git --commit --branch feature/new-auth --merge strategy
# 智能提交信息与分支合并策略

# 项目估算
/sc:estimate complex-project --scope --timeline --resources --risk
# 风险调整的项目评估
```

### 🎯 会话管理与反思
```bash
# 项目上下文加载
/sc:load --agent system-architect --memory project-context --workflow current
# 加载系统架构师上下文与当前工作流

# 会话状态保存
/sc:save --context full --memory cross-session --checkpoint milestone-1
# 完整上下文保存与里程碑检查点

# 决策反思
/sc:reflect --decision architecture-choice --pattern analysis --improvement
# 架构决策的反思与改进分析
```

### 🔍 发现与导航
```bash
# 命令发现
/sc:index --search testing --category quality --examples
# 搜索测试相关命令与示例

# 智能工具选择
/sc:select-tool --task database --optimize scalability --recommend
# 数据库技术的可扩展性优化推荐
```

## 🔧 配置要求

### Gemini CLI配置
确保Gemini CLI已正确配置MCP服务器：
```json
{
  "mcpServers": {
    "gemini-superclaude": {
      "command": "node",
      "args": ["path/to/superclaude-server.js"],
      "env": {}
    }
  }
}
```

### 环境要求
- Node.js >= 18.0.0
- Gemini CLI 最新版本
- SuperClaude Framework v4.0.9兼容

## 📚 详细文档

每个命令都支持详细的参数和标志：
- `--help`: 显示命令帮助信息
- `--deep`: 启用深度分析模式
- `--framework`: 指定技术框架
- `--agents`: 指定专业代理
- `--mode`: 指定分析模式

## 🗑️ 卸载

如需移除SuperClaude命令：
```bash
npm run uninstall-commands
```

## 🚨 故障排除

### 命令无法识别
1. 确认已运行 `npm run install-commands`
2. 检查 `~/.gemini/commands/sc/` 目录是否存在TOML文件
3. 重启Gemini CLI

### MCP服务器连接问题
1. 确认MCP服务器正在运行：`npm start`
2. 检查Gemini CLI的MCP配置
3. 查看服务器日志输出

### 命令执行失败
1. 检查项目是否在正确的工作目录
2. 确认SuperClaude Framework版本兼容性
3. 查看详细错误日志

---

**SuperClaude Framework v4.0.9** | **MCP Server v2.0.2** | **22 Commands** | **14 Agents** | **6 MCP Integrations**