# Gemini SuperClaude MCP Server

[![Version](https://img.shields.io/badge/version-2.0.2-blue.svg)](https://github.com/Dianel555/gemini-superclaude-mcp-server)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![SuperClaude](https://img.shields.io/badge/SuperClaude-v4.0.9-purple.svg)](https://github.com/SuperClaude-Org/SuperClaude_Framework)
[![Commands](https://img.shields.io/badge/commands-22-success.svg)](README.md#complete-command-set)
[![Agents](https://img.shields.io/badge/agents-14-success.svg)](README.md#enhanced-agent-system)
[![MCP Servers](https://img.shields.io/badge/mcp_servers-6-blue.svg)](README.md#real-mcp-integration)
[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/64aa9a41-c66e-4640-a381-830b4a27e745)
## English|[中文](gemini-superclaude.md)

## [GEMINI_CLI_COMMANDS](GEMINI_CLI_COMMANDS.md)

A **fully upgraded** MCP server providing SuperClaude Framework v4.0.9 compatibility for Gemini CLI. Features enhanced command routing with **22 specialized `/sc:` commands** (including new business-panel), **14 domain-expert agents**, and **6 integrated MCP servers** plus **full Gemini CLI integration** via TOML commands.

## 🚀 What's New in v2.0.2 (SuperClaude v4.0.9 Upgrade)

- **💼 NEW: Business Panel**: Multi-expert business analysis with 9 thought leaders (Christensen, Porter, Drucker, Godin, Kim & Mauborgne, Collins, Taleb, Meadows, Doumont)
- **🎯 Gemini CLI Integration**: All 22 commands available as `/sc:command` in Gemini CLI via TOML configuration
- **📦 Auto Installation**: `npm run install-commands` for seamless Gemini CLI integration
- **🧠 Enhanced Routing**: Intelligent context analysis, agent selection, and MCP server coordination.
- **🤖 14 Specialized Agents**: Replaces the old persona system with domain experts for architecture, security, performance, etc.
- **🔗 6 MCP Servers**: Full integration with Sequential, Context7, Magic, Playwright, **Morphllm**, and **Serena**.
- **📋 22 Specialized Commands**: All commands now use the `/sc:` namespace with business panel added.
- **⚡ 5 Behavioral Modes**: Brainstorming, Introspection, Orchestration, Task Management, and Token Efficiency modes.
- **💾 Cross-Session Persistence**: `sc:load` and `sc:save` commands powered by the Serena MCP for session memory.

## 🔧 Quick Start

### Method 1: NPM Package (Recommended)

```bash
# Install globally
npm install -g gemini-superclaude-mcp-server

# TOML Command Configuration
npm run install-commands # Locate the gemini-superclaude-mcp-server/ directory in the global npm installation folder and run the command there (or, if configuring via npx only, you can directly copy the toml file to the corresponding directory)

# Configure Gemini CLI (~/.gemini/settings.json)
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

### Method 2: Local Development

```bash
# Clone and setup
git clone https://github.com/Dianel555/gemini-superclaude-mcp-server.git
cd gemini-superclaude-mcp-server
npm install

# Make script executable
chmod +x superclaude-server.js

# Configure Gemini CLI (~/.gemini/settings.json)
{
  "mcpServers": {
    "superclaude": {
      "command": "node",
      "args": ["/full/path/to/superclaude-server.js"],
      "env": {
        "CLAUDE_CONFIG_DIR": "${HOME}/.claude"
      }
    }
  }
}

# Validate and test
npm run validate
npm test
```

## 🤖 Enhanced Agent System (Formerly Personas)

**14 Specialized Agents** provide domain expertise for any task:

| Agent | Focus | Thinking Mode | Auto-Triggers | Specialization |
|---|---|---|---|---|
| **system-architect** | System design | Systematic | architecture, design, scalability | sc:build, sc:analyze |
| **frontend-architect**| User experience | User-centric | ui, component, responsive | sc:build, sc:implement |
| **backend-architect** | Data integrity | Data-driven | api, database, service | sc:implement, sc:troubleshoot|
| **devops-architect** | Automation & CI/CD| Automation-focused| deploy, infrastructure, ci/cd| sc:workflow, sc:git |
| **security-engineer** | Threat modeling | Threat-focused | security, vulnerability, auth | sc:analyze, sc:improve |
| **performance-engineer**| Optimization | Measurement-driven| optimize, performance, bottleneck| sc:analyze, sc:improve |
| **quality-engineer** | Testing strategy | Systematic-validation| test, quality, validation | sc:test, sc:troubleshoot |
| **refactoring-expert**| Code quality | Simplification-focused| refactor, cleanup, debt | sc:improve, sc:cleanup |
| **root-cause-analyst**| Problem investigation| Investigative | debug, investigate, analyze | sc:analyze, sc:troubleshoot|
| **requirements-analyst**| Requirements discovery| Discovery-focused | requirements, scope, planning | sc:brainstorm, sc:estimate|
| **python-expert** | Python architecture| Pythonic-focused | python, django, flask | sc:implement, sc:improve |
| **socratic-mentor** | Knowledge transfer | Educational | learn, explain, understand | sc:explain, sc:document |
| **learning-guide** | Concept simplification| Pedagogical | tutorial, beginner, example | sc:explain, sc:document |
| **technical-writer** | Documentation | Communication-focused| document, readme, guide | sc:document, sc:save |

## 🔗 Real MCP Integration

### 6 Supported Servers
- **Sequential**: Complex multi-step reasoning
- **Context7**: Documentation and pattern lookup
- **Magic**: UI component generation
- **Playwright**: E2E testing and browser automation
- **Morphllm**: Pattern-based code editing and bulk transformations
- **Serena**: Semantic code understanding and cross-session memory

## 📋 Complete Command Set

**22 Core Commands** with `/sc:` namespace for SuperClaude Framework v4.0.9 compliance:

### Development & Orchestration
- `sc:build`, `sc:implement`, `sc:workflow`, `sc:design`

### Analysis & Discovery  
- `sc:analyze`, `sc:brainstorm`, `sc:troubleshoot`, `sc:business-panel`, `sc:estimate`

### Quality & Maintenance
- `sc:improve`, `sc:test`, `sc:cleanup`, `sc:git`

### Documentation & Learning
- `sc:explain`, `sc:document`

### Operations & Coordination
- `sc:task`, `sc:spawn`, `sc:load`, `sc:save`, `sc:reflect`

### Meta & Discovery
- `sc:index`, `sc:select-tool`

## 🎯 Gemini CLI Integration

Install SuperClaude commands directly in Gemini CLI:

```bash
# Install all 22 commands as /sc: shortcuts
npm run install-commands

# Use in Gemini CLI
/sc:analyze --security --deep
/sc:business-panel strategy.md --experts porter,taleb --mode debate  
/sc:build ecommerce --framework nextjs --magic

# Uninstall if needed
npm run uninstall-commands
```

### Business Panel (New in v4.0.9)

Multi-expert business analysis with 9 thought leaders:
- **Clayton Christensen**: Disruption Theory, Jobs-to-be-Done
- **Michael Porter**: Competitive Strategy, Five Forces  
- **Peter Drucker**: Management Philosophy, MBO
- **Seth Godin**: Marketing Innovation, Tribe Building
- **Kim & Mauborgne**: Blue Ocean Strategy
- **Jim Collins**: Organizational Excellence
- **Nassim Taleb**: Risk Management, Antifragility
- **Donella Meadows**: Systems Thinking
- **Jean-luc Doumont**: Communication Systems

## 📊 Architecture (v4.0.9)

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

## 🤝 Contributing

PRs are welcome! Please fork the repository, create a feature branch, and open a pull request.



## 🙏 Acknowledgments

- Thanks for [SuperClaude_Framework.](https://github.com/SuperClaude-Org/SuperClaude_Framework/tree/master)
- Original [tinywind/superclaude-gemini-integration-mcp](https://github.com/tinywind/superclaude-gemini-integration-mcp) for the foundation
- MCP community for the protocol standards



## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.
