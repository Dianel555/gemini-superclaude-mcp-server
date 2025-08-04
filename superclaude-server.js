#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

/**
 * Gemini SuperClaude MCP Server v2.0
 * 
 * Features:
 * - Intelligent command routing with context awareness
 * - Dynamic persona switching with behavioral adaptation
 * - MCP server integration orchestration
 * - Framework-aligned command architecture
 * - Token optimization and efficiency management
 */

const CLAUDE_CONFIG_DIR = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const SERVER_VERSION = '2.0.0';

class GeminiSuperClaudeMCPServer {
    constructor() {
        this.server = new Server(
            {
                name: 'gemini-superclaude-mcp',
                version: SERVER_VERSION,
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        // Core state management
        this.state = {
            activePersona: null,
            tokenMode: 'normal',
            contextStack: [],
            lastCommand: null,
            mcpIntegrations: new Set(),
            routingHistory: []
        };

        // Framework configuration
        this.config = {
            commands: new Map(),
            personas: new Map(),
            routingRules: new Map(),
            mcpServers: new Map()
        };
    }

    async initialize() {
        console.error(`[INFO] Initializing Gemini SuperClaude MCP Server v${SERVER_VERSION}`);
        
        try {
            await this.loadFrameworkConfig();
            await this.setupIntelligentRouting();
            await this.initializeMCPIntegrations();
            this.setupRequestHandlers();
            
            console.error('[INFO] Server initialization completed successfully');
        } catch (error) {
            console.error(`[ERROR] Initialization failed: ${error.message}`);
            throw error;
        }
    }

    async loadFrameworkConfig() {
        // Load SuperClaude Framework v3+ configurations
        await Promise.all([
            this.loadCommands(),
            this.loadPersonas(),
            this.setupIntelligentRouting()
        ]);
    }

    async loadCommands() {
        // SuperClaude Framework v3+ commands with intelligent metadata
        const commands = {
            // 🔧 Development Commands
            'sc:build': {
                category: 'development',
                description: 'Universal project builder with intelligent scaffolding',
                flags: ['--init', '--feature', '--framework', '--tdd', '--magic', '--wave'],
                personas: ['architect', 'frontend', 'backend'],
                mcpRequired: ['magic', 'context7'],
                complexity: 'moderate',
                autoFlags: {
                    ui: ['--magic'],
                    testing: ['--tdd'],
                    complex: ['--wave']
                }
            },
            'sc:implement': {
                category: 'development', 
                description: 'Feature implementation with persona-driven approach',
                flags: ['--type', '--framework', '--test', '--docs', '--persona'],
                personas: ['frontend', 'backend', 'architect'],
                mcpRequired: ['sequential', 'context7'],
                complexity: 'high',
                autoFlags: {
                    component: ['--type component', '--magic'],
                    api: ['--type api', '--sequential'],
                    feature: ['--wave', '--docs']
                }
            },
            'sc:workflow': {
                category: 'orchestration',
                description: 'Multi-stage workflow orchestration',
                flags: ['--stages', '--parallel', '--sequential', '--checkpoint'],
                personas: ['architect', 'devops'],
                mcpRequired: ['sequential'],
                complexity: 'high'
            },

            // 🔍 Analysis Commands  
            'sc:analyze': {
                category: 'analysis',
                description: 'Multi-dimensional codebase analysis',
                flags: ['--deep', '--security', '--performance', '--architecture', '--ultrathink'],
                personas: ['analyzer', 'architect', 'security'],
                mcpRequired: ['sequential', 'context7'],
                complexity: 'high',
                autoFlags: {
                    security: ['--security', '--persona security'],
                    performance: ['--performance', '--persona performance'],
                    architecture: ['--architecture', '--persona architect']
                }
            },
            'sc:troubleshoot': {
                category: 'analysis',
                description: 'Intelligent problem diagnosis and resolution',
                flags: ['--trace', '--logs', '--reproduce', '--fix'],
                personas: ['analyzer', 'backend'],
                mcpRequired: ['sequential'],
                complexity: 'moderate'
            },

            // ✅ Quality Commands
            'sc:improve': {
                category: 'quality',
                description: 'Evidence-based code improvement',
                flags: ['--refactor', '--optimize', '--modernize', '--validate'],
                personas: ['refactorer', 'performance', 'architect'],  
                mcpRequired: ['sequential'],
                complexity: 'moderate'
            },
            'sc:test': {
                category: 'quality',
                description: 'Comprehensive testing strategy',
                flags: ['--unit', '--integration', '--e2e', '--coverage'],
                personas: ['qa'],
                mcpRequired: ['playwright'],
                complexity: 'moderate'
            },

            // 🚀 Operations Commands
            'sc:task': {
                category: 'operations',
                description: 'Long-term task and project management',
                flags: ['--create', '--status', '--milestone', '--assign'],
                personas: ['architect', 'devops'],
                mcpRequired: ['sequential'],
                complexity: 'low'
            },
            'sc:spawn': {
                category: 'operations', 
                description: 'Specialized agent spawning and coordination',
                flags: ['--role', '--context', '--parallel', '--merge'],
                personas: ['architect'],
                mcpRequired: ['sequential'],
                complexity: 'high'
            }
        };

        Object.entries(commands).forEach(([name, config]) => {
            this.config.commands.set(name, {
                ...config,
                usage: this.generateUsageExample(name, config)
            });
        });
    }

    async loadPersonas() {
        // Gemini persona system with behavioral patterns
        const personas = {
            architect: {
                identity: 'Systems architect | Long-term thinking | Scalability expert',
                coreBeliefs: ['Systems evolve, design for change', 'Patterns over implementations'],
                primaryQuestion: 'How will this scale and evolve?',
                mcpPreferences: ['sequential', 'context7'],
                thinkingMode: 'systematic',
                autoTriggers: ['architecture', 'design', 'scalability', 'patterns'],
                commandSpecialization: ['sc:build', 'sc:analyze', 'sc:workflow'],
                tokenOptimization: 'balanced',
                behaviorModifiers: {
                    verbosity: 'detailed',
                    focus: 'long-term',
                    riskTolerance: 'conservative'
                }
            },
            frontend: {
                identity: 'Frontend engineer | UX advocate | Performance optimizer',
                coreBeliefs: ['User experience is paramount', 'Performance is a feature'],
                primaryQuestion: 'How does this feel to use?',
                mcpPreferences: ['magic', 'playwright'],
                thinkingMode: 'user-centric',
                autoTriggers: ['component', 'ui', 'responsive', 'accessibility'],
                commandSpecialization: ['sc:build', 'sc:implement', 'sc:test'],
                tokenOptimization: 'visual',
                behaviorModifiers: {
                    verbosity: 'practical',
                    focus: 'user-experience',
                    riskTolerance: 'moderate'
                }
            },
            backend: {
                identity: 'Backend engineer | API specialist | Data architect',
                coreBeliefs: ['Data integrity above all', 'APIs are contracts'],
                primaryQuestion: 'How does data flow through this system?',
                mcpPreferences: ['context7', 'sequential'],
                thinkingMode: 'data-driven',
                autoTriggers: ['api', 'database', 'service', 'integration'],
                commandSpecialization: ['sc:implement', 'sc:analyze', 'sc:troubleshoot'],
                tokenOptimization: 'technical',
                behaviorModifiers: {
                    verbosity: 'precise',
                    focus: 'reliability',
                    riskTolerance: 'conservative'
                }
            },
            analyzer: {
                identity: 'Root cause specialist | Evidence-based investigator',
                coreBeliefs: ['Evidence over assumptions', 'Systematic investigation'],
                primaryQuestion: 'What does the evidence tell us?',
                mcpPreferences: ['sequential'],
                thinkingMode: 'analytical',
                autoTriggers: ['debug', 'investigate', 'analyze', 'troubleshoot'],
                commandSpecialization: ['sc:analyze', 'sc:troubleshoot'],
                tokenOptimization: 'detailed',
                behaviorModifiers: {
                    verbosity: 'comprehensive',
                    focus: 'root-cause',
                    riskTolerance: 'evidence-based'
                }
            },
            security: {
                identity: 'Security engineer | Threat modeler | Compliance specialist',
                coreBeliefs: ['Security by design', 'Zero trust architecture'],
                primaryQuestion: 'What are the attack vectors?',
                mcpPreferences: ['sequential', 'context7'],
                thinkingMode: 'threat-focused',
                autoTriggers: ['security', 'vulnerability', 'auth', 'compliance'],
                commandSpecialization: ['sc:analyze', 'sc:improve'],
                tokenOptimization: 'security-focused',
                behaviorModifiers: {
                    verbosity: 'detailed',
                    focus: 'security-first',
                    riskTolerance: 'paranoid'
                }
            }
        };

        Object.entries(personas).forEach(([name, config]) => {
            this.config.personas.set(name, config);
        });
    }

    async setupIntelligentRouting() {
        // Intelligent routing rules for automatic persona and flag selection
        const routingRules = {
            // Context-based persona activation
            personaRouting: {
                'ui|component|frontend|react|vue': 'frontend',
                'api|backend|server|database': 'backend', 
                'architecture|design|system|scalability': 'architect',
                'debug|troubleshoot|error|investigate': 'analyzer',
                'security|vulnerability|auth|compliance': 'security'
            },
            
            // Automatic flag inference
            flagRouting: {
                'test|testing|tdd': ['--tdd', '--coverage'],
                'ui|component|interface': ['--magic'],
                'complex|large|comprehensive': ['--wave'],
                'security|secure|vulnerability': ['--security'],
                'performance|optimize|speed': ['--performance']
            },
            
            // MCP server activation rules
            mcpRouting: {
                'ui|component|design': ['magic'],
                'documentation|docs|api': ['context7'],
                'complex|analysis|thinking': ['sequential'],
                'testing|e2e|automation': ['playwright']
            }
        };

        this.config.routingRules = routingRules;
    }

    async initializeMCPIntegrations() {
        // Mock MCP server configurations - in production would connect to real servers
        const mcpServers = {
            sequential: {
                name: 'Sequential Thinking',
                capabilities: ['complex-analysis', 'multi-step-reasoning'],
                status: 'available'
            },
            context7: {
                name: 'Context7 Documentation',
                capabilities: ['doc-lookup', 'pattern-matching'],
                status: 'available'
            },
            magic: {
                name: 'Magic UI Generation',
                capabilities: ['component-gen', 'ui-design'],
                status: 'available'
            },
            playwright: {
                name: 'Playwright Testing',
                capabilities: ['e2e-testing', 'automation'],
                status: 'available'
            }
        };

        Object.entries(mcpServers).forEach(([name, config]) => {
            this.config.mcpServers.set(name, config);
        });
    }

    setupRequestHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: this.generateToolsList(),
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            return await this.executeTool(name, args);
        });
    }

    generateToolsList() {
        const tools = [];

        // Generate command tools with intelligent schemas
        for (const [name, config] of this.config.commands) {
            tools.push({
                name,
                description: `${config.description} | Personas: ${config.personas.join(', ')} | Complexity: ${config.complexity}`,
                inputSchema: {
                    type: 'object',
                    properties: {
                        args: {
                            type: 'string',
                            description: 'Command arguments and target specification'
                        },
                        persona: {
                            type: 'string',
                            enum: Array.from(this.config.personas.keys()),
                            description: 'Persona to use (auto-detected if not specified)'
                        },
                        flags: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: config.flags
                            },
                            description: 'Command flags (auto-inferred if not specified)'
                        },
                        auto_route: {
                            type: 'boolean',
                            default: true,
                            description: 'Enable intelligent routing and auto-detection'
                        },
                        context: {
                            type: 'object',
                            description: 'Additional context for intelligent routing',
                            properties: {
                                project_type: { type: 'string' },
                                complexity: { type: 'string', enum: ['low', 'moderate', 'high'] },
                                focus_areas: { type: 'array', items: { type: 'string' } }
                            }
                        }
                    },
                    required: ['args']
                }
            });
        }

        // Add utility tools
        tools.push(
            {
                name: 'sc:persona',
                description: 'Switch or query active SuperClaude persona with behavioral adaptation',
                inputSchema: {
                    type: 'object',
                    properties: {
                        action: {
                            type: 'string',
                            enum: ['switch', 'query', 'list', 'auto'],
                            description: 'Persona management action'
                        },
                        name: {
                            type: 'string',
                            enum: Array.from(this.config.personas.keys()),
                            description: 'Persona name'
                        },
                        context: {
                            type: 'string', 
                            description: 'Context for auto persona selection'
                        }
                    },
                    required: ['action']
                }
            },
            {
                name: 'sc:mcp',
                description: 'Manage MCP server integrations and routing',
                inputSchema: {
                    type: 'object',
                    properties: {
                        action: {
                            type: 'string',
                            enum: ['status', 'enable', 'disable', 'route'],
                            description: 'MCP management action'
                        },
                        servers: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: Array.from(this.config.mcpServers.keys())
                            },
                            description: 'Target MCP servers'
                        }
                    },
                    required: ['action']
                }
            },
            {
                name: 'sc:optimize',
                description: 'Configure token optimization and efficiency settings',
                inputSchema: {
                    type: 'object',
                    properties: {
                        mode: {
                            type: 'string',
                            enum: ['normal', 'compressed', 'ultracompressed', 'adaptive'],
                            description: 'Token optimization mode'
                        },
                        context_aware: {
                            type: 'boolean',
                            default: true,
                            description: 'Enable context-aware optimization'
                        }
                    },
                    required: ['mode']
                }
            }
        );

        return tools;
    }

    async executeTool(name, args) {
        try {
            // Log command execution for routing analysis
            this.state.routingHistory.push({
                command: name,
                timestamp: Date.now(),
                args: args
            });

            // Route to appropriate handler
            if (name.startsWith('sc:')) {
                if (['sc:persona', 'sc:mcp', 'sc:optimize'].includes(name)) {
                    return await this.executeUtilityTool(name, args);
                } else {
                    return await this.executeCommand(name, args);
                }
            }

            throw new Error(`Unknown tool: ${name}`);
        } catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `❌ Error executing ${name}: ${error.message}\n\nTip: Use 'sc:persona list' to see available personas or check command syntax.`
                    }
                ]
            };
        }
    }

    async executeCommand(commandName, args) {
        const command = this.config.commands.get(commandName);
        if (!command) {
            throw new Error(`Unknown command: ${commandName}`);
        }

        // Apply intelligent routing
        const routingContext = await this.applyIntelligentRouting(commandName, args);
        
        // Execute command with intelligent context
        const response = await this.generateGeminiResponse(commandName, command, routingContext);

        // Update state
        this.state.lastCommand = { name: commandName, context: routingContext };
        
        return {
            content: [
                {
                    type: 'text',
                    text: response
                }
            ]
        };
    }

    async applyIntelligentRouting(commandName, args) {
        const context = {
            originalArgs: args,
            detectedPersona: null,
            suggestedFlags: [],
            mcpServers: [],
            confidence: 0
        };

        if (!args.auto_route) {
            return context;
        }

        const searchText = (args.context?.focus_areas?.join(' ') || '') + ' ' + (args.args || '');
        
        // Persona detection
        if (!args.persona) {
            for (const [pattern, persona] of Object.entries(this.config.routingRules.personaRouting)) {
                const regex = new RegExp(pattern, 'i');
                if (regex.test(searchText)) {
                    context.detectedPersona = persona;
                    context.confidence += 0.3;
                    break;
                }
            }
        }

        // Flag inference  
        if (!args.flags || args.flags.length === 0) {
            for (const [pattern, flags] of Object.entries(this.config.routingRules.flagRouting)) {
                const regex = new RegExp(pattern, 'i');
                if (regex.test(searchText)) {
                    context.suggestedFlags.push(...flags);
                    context.confidence += 0.2;
                }
            }
        }

        // MCP server routing
        for (const [pattern, servers] of Object.entries(this.config.routingRules.mcpRouting)) {
            const regex = new RegExp(pattern, 'i');
            if (regex.test(searchText)) {
                context.mcpServers.push(...servers);
                context.confidence += 0.1;
            }
        }

        return context;
    }

    async generateGeminiResponse(commandName, command, routingContext) {
        const activePersona = routingContext.detectedPersona || this.state.activePersona;
        const persona = activePersona ? this.config.personas.get(activePersona) : null;

        let response = `🚀 **${commandName}** | SuperClaude Framework v3+\n\n`;

        // Routing intelligence feedback
        if (routingContext.confidence > 0.5) {
            response += `🧠 **Intelligent Routing** (Confidence: ${Math.round(routingContext.confidence * 100)}%)\n`;
            if (routingContext.detectedPersona) {
                response += `👤 Auto-detected persona: **${routingContext.detectedPersona}**\n`;
            }
            if (routingContext.suggestedFlags.length > 0) {
                response += `🚩 Suggested flags: ${routingContext.suggestedFlags.join(', ')}\n`;
            }
            if (routingContext.mcpServers.length > 0) {
                response += `🔗 MCP integrations: ${routingContext.mcpServers.map(s => this.config.mcpServers.get(s)?.name || s).join(', ')}\n`;
            }
            response += '\n';
        }

        // Persona context
        if (persona) {
            response += `👤 **Active Persona**: ${activePersona}\n`;
            response += `🎯 **Focus**: ${persona.primaryQuestion}\n`;
            response += `🧠 **Thinking Mode**: ${persona.thinkingMode}\n\n`;
        }

        // Command execution context
        response += `📋 **Command**: ${commandName}\n`;
        response += `📝 **Target**: ${routingContext.originalArgs.args}\n`;
        response += `🔧 **Category**: ${command.category}\n`;
        response += `⚡ **Complexity**: ${command.complexity}\n\n`;

        // Framework integration
        if (command.mcpRequired.length > 0) {
            response += `🔗 **Required Integrations**:\n`;
            command.mcpRequired.forEach(server => {
                const serverInfo = this.config.mcpServers.get(server);
                response += `  • ${serverInfo?.name || server} (${serverInfo?.status || 'unknown'})\n`;
            });
            response += '\n';
        }

        // Execution plan
        response += `📋 **Execution Plan**:\n`;
        response += this.generateExecutionPlan(commandName, command, routingContext);

        // Next steps
        response += `\n🎯 **Next Steps**:\n`;
        response += `1. Review routing suggestions and confirm approach\n`;
        response += `2. Execute command with selected persona and flags\n`;
        response += `3. Validate results and iterate if needed\n`;
        
        if (persona) {
            response += `4. Apply ${persona.identity.split('|')[0].trim()} best practices\n`;
        }

        return response;
    }

    generateExecutionPlan(commandName, command, context) {
        const plans = {
            'sc:build': `1. Analyze project requirements and detect framework\n2. Apply architectural patterns (${context.detectedPersona || 'default'})\n3. Generate scaffold with intelligent defaults\n4. Configure build tools and dependencies\n5. Set up testing framework if --tdd detected`,
            
            'sc:implement': `1. Define feature scope and requirements\n2. Select appropriate implementation pattern\n3. Generate code with persona-specific approach\n4. Apply testing strategy based on complexity\n5. Document implementation decisions`,
            
            'sc:analyze': `1. Scan codebase for complexity and patterns\n2. Apply multi-dimensional analysis framework\n3. Generate insights using ${context.detectedPersona || 'analyzer'} perspective\n4. Provide evidence-based recommendations\n5. Create improvement roadmap`,
            
            'sc:workflow': `1. Define workflow stages and dependencies\n2. Configure orchestration strategy\n3. Set up checkpoints and validation gates\n4. Enable parallel execution where possible\n5. Monitor and optimize workflow performance`,
            
            'default': `1. Parse command context and requirements\n2. Apply routing intelligence and persona adaptation\n3. Execute core command logic\n4. Validate results against quality gates\n5. Provide actionable next steps`
        };

        return plans[commandName] || plans['default'];
    }

    async executeUtilityTool(name, args) {
        switch (name) {
            case 'sc:persona':
                return this.handlePersonaManagement(args);
            case 'sc:mcp':
                return this.handleMCPManagement(args);
            case 'sc:optimize':
                return this.handleOptimization(args);
            default:
                throw new Error(`Unknown utility tool: ${name}`);
        }
    }

    handlePersonaManagement(args) {
        const { action, name, context } = args;

        switch (action) {
            case 'switch':
                if (!this.config.personas.has(name)) {
                    throw new Error(`Unknown persona: ${name}`);
                }
                this.state.activePersona = name;
                const persona = this.config.personas.get(name);
                return {
                    content: [{
                        type: 'text',
                        text: `✨ **Persona Activated**: ${name}\n\n` +
                            `🎭 **Identity**: ${persona.identity}\n` +
                            `💭 **Core Belief**: ${persona.coreBeliefs[0]}\n` +
                            `🎯 **Primary Question**: ${persona.primaryQuestion}\n` +
                            `🧠 **Thinking Mode**: ${persona.thinkingMode}\n` +
                            `🔗 **Preferred Tools**: ${persona.mcpPreferences.join(', ')}\n` +
                            `⚡ **Specializes in**: ${persona.commandSpecialization.join(', ')}`
                    }]
                };

            case 'query':
                const current = this.state.activePersona ? this.config.personas.get(this.state.activePersona) : null;
                return {
                    content: [{
                        type: 'text',
                        text: current ? 
                            `👤 **Current Persona**: ${this.state.activePersona}\n${current.identity}` :
                            '❌ No active persona. Use "sc:persona switch [name]" to activate one.'
                    }]
                };

            case 'list':
                const list = Array.from(this.config.personas.entries())
                    .map(([name, p]) => `• **${name}**: ${p.identity.split('|')[0].trim()}`)
                    .join('\n');
                return {
                    content: [{
                        type: 'text',
                        text: `🎭 **Available Personas**:\n\n${list}`
                    }]
                };

            case 'auto':
                // Auto-select persona based on context
                const detected = this.detectPersonaFromContext(context);
                if (detected) {
                    this.state.activePersona = detected;
                    return {
                        content: [{
                            type: 'text',
                            text: `🤖 **Auto-selected Persona**: ${detected}\n` +
                                `Context analysis: "${context}"\n` +
                                `Confidence: High`
                        }]
                    };
                }
                return {
                    content: [{
                        type: 'text',
                        text: `🤷 Unable to auto-detect persona from context: "${context}"\n` +
                            `Use 'sc:persona list' to see available options.`
                    }]
                };

            default:
                throw new Error(`Unknown persona action: ${action}`);
        }
    }

    detectPersonaFromContext(context) {
        if (!context) return null;
        
        for (const [pattern, persona] of Object.entries(this.config.routingRules.personaRouting)) {
            const regex = new RegExp(pattern, 'i');
            if (regex.test(context)) {
                return persona;
            }
        }
        return null;
    }

    handleMCPManagement(args) {
        const { action, servers } = args;

        switch (action) {
            case 'status':
                const statuses = Array.from(this.config.mcpServers.entries())
                    .map(([name, config]) => `• **${config.name}**: ${config.status} | ${config.capabilities.join(', ')}`)
                    .join('\n');
                return {
                    content: [{
                        type: 'text',
                        text: `🔗 **MCP Server Status**:\n\n${statuses}\n\n` +
                            `Active integrations: ${Array.from(this.state.mcpIntegrations).join(', ') || 'None'}`
                    }]
                };

            case 'enable':
                servers.forEach(server => {
                    if (this.config.mcpServers.has(server)) {
                        this.state.mcpIntegrations.add(server);
                    }
                });
                return {
                    content: [{
                        type: 'text',
                        text: `✅ **Enabled MCP Servers**: ${servers.join(', ')}\n` +
                            `These servers will be automatically used in relevant commands.`
                    }]
                };

            case 'disable':
                servers.forEach(server => {
                    this.state.mcpIntegrations.delete(server);
                });
                return {
                    content: [{
                        type: 'text',
                        text: `❌ **Disabled MCP Servers**: ${servers.join(', ')}`
                    }]
                };

            default:
                throw new Error(`Unknown MCP action: ${action}`);
        }
    }

    handleOptimization(args) {
        const { mode, context_aware } = args;
        this.state.tokenMode = mode;

        const modeDescriptions = {
            normal: 'Standard verbosity with full explanations',
            compressed: 'Moderate compression (~40% reduction) with symbol usage',
            ultracompressed: 'Maximum compression (~70% reduction) with minimal output',
            adaptive: 'Context-aware optimization based on complexity'
        };

        return {
            content: [{
                type: 'text',
                text: `⚡ **Token Optimization**: ${mode}\n\n` +
                    `📝 **Description**: ${modeDescriptions[mode]}\n` +
                    `🧠 **Context Aware**: ${context_aware ? 'Enabled' : 'Disabled'}\n` +
                    `🎯 **Active for**: All subsequent responses\n\n` +
                    `**Optimization Features**:\n` +
                    `• Symbol substitution (→, &, @, w/)\n` +
                    `• Condensed formatting\n` +
                    `• Essential information priority\n` +
                    `• Persona-aware compression`
            }]
        };
    }

    generateUsageExample(commandName, config) {
        const examples = {
            'sc:build': 'sc:build "React app with TypeScript" --framework react --tdd',
            'sc:implement': 'sc:implement "user authentication system" --type feature --persona backend',
            'sc:analyze': 'sc:analyze "performance bottlenecks" --performance --ultrathink',
            'sc:workflow': 'sc:workflow "CI/CD pipeline" --stages build,test,deploy --parallel'
        };
        return examples[commandName] || `${commandName} "[description]" [flags]`;
    }

    async start() {
        await this.initialize();

        const transport = new StdioServerTransport();
        await this.server.connect(transport);

        console.error(`[SUCCESS] Gemini SuperClaude MCP Server v${SERVER_VERSION} is running`);
        console.error('[INFO] Ready for intelligent command routing and persona management');
    }
}

// Launch the Gemini SuperClaude server
const server = new GeminiSuperClaudeMCPServer();
server.start().catch((error) => {
    console.error(`[FATAL] Server failed to start: ${error.message}`);
    process.exit(1);
});