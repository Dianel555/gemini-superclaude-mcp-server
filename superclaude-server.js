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
 * Gemini SuperClaude MCP Server v2.0.2
 * SuperClaude Framework v4.0.9 Compatible
 * 
 * Enhanced Features:
 * - 22 specialized slash commands with /sc: namespace (including business-panel)
 * - 14 domain-expert agents with behavioral patterns
 * - 6 MCP server integrations with intelligent routing
 * - 5 behavioral modes for different workflows
 * - Cross-session persistence with enhanced memory management
 * - Priority-based rule system (CRITICAL/IMPORTANT/RECOMMENDED)
 */

const CLAUDE_CONFIG_DIR = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const SERVER_VERSION = '2.0.2';
const FRAMEWORK_VERSION = '4.0.9';

class GeminiSuperClaudeMCPServerV4 {
    constructor() {
        this.server = new Server(
            {
                name: 'gemini-superclaude-mcp-v4',
                version: SERVER_VERSION,
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        // Enhanced state management for v4.0.8
        this.state = {
            activeAgent: null,
            behavioralMode: 'normal',
            contextStack: [],
            sessionMemory: new Map(),
            mcpIntegrations: new Set(['sequential', 'context7', 'magic', 'playwright', 'morphllm', 'serena']),
            routingHistory: [],
            priorityRules: new Map()
        };

        // Framework configuration
        this.config = {
            commands: new Map(),
            agents: new Map(),
            behavioralModes: new Map(),
            mcpServers: new Map(),
            routingRules: new Map()
        };
    }

    async initialize() {
        console.error(`[INFO] Initializing Gemini SuperClaude MCP Server v${SERVER_VERSION}`);
        console.error(`[INFO] SuperClaude Framework v${FRAMEWORK_VERSION} Compatible`);
        
        try {
            await this.loadFrameworkConfig();
            await this.setupEnhancedRouting();
            await this.initializeV4MCPIntegrations();
            await this.loadBehavioralModes();
            this.setupRequestHandlers();
            
            console.error('[INFO] Server initialization completed successfully');
            console.error(`[INFO] Loaded: 22 Commands | 14 Agents | 5 Modes | 6 MCP Servers`);
        } catch (error) {
            console.error(`[ERROR] Initialization failed: ${error.message}`);
            throw error;
        }
    }

    async loadFrameworkConfig() {
        await Promise.all([
            this.loadV4Commands(),
            this.loadV4Agents(),
            this.setupEnhancedRouting(),
            this.loadPriorityRules()
        ]);
    }

    async loadV4Commands() {
        // SuperClaude Framework v4.0.9 - All 22 commands with /sc: namespace
        const commands = {
            // 🏗️ Core Development Commands
            'sc:build': {
                category: 'development',
                description: 'Universal project builder with intelligent scaffolding',
                flags: ['--init', '--feature', '--framework', '--tdd', '--magic', '--wave'],
                agents: ['system-architect', 'frontend-architect', 'backend-architect'],
                mcpRequired: ['magic', 'context7'],
                complexity: 'moderate',
                priority: 'IMPORTANT',
                autoFlags: {
                    ui: ['--magic'],
                    testing: ['--tdd'],
                    complex: ['--wave']
                }
            },
            'sc:implement': {
                category: 'development',
                description: 'Feature implementation with intelligent persona activation',
                flags: ['--type', '--framework', '--test', '--docs', '--agent'],
                agents: ['frontend-architect', 'backend-architect', 'system-architect'],
                mcpRequired: ['sequential', 'context7', 'magic'],
                complexity: 'standard',
                priority: 'IMPORTANT',
                autoFlags: {
                    component: ['--type component', '--magic'],
                    api: ['--type api', '--sequential'],
                    feature: ['--wave', '--docs']
                }
            },
            'sc:workflow': {
                category: 'orchestration',
                description: 'Multi-stage workflow orchestration with parallel execution',
                flags: ['--stages', '--parallel', '--sequential', '--checkpoint'],
                agents: ['system-architect', 'devops-architect'],
                mcpRequired: ['sequential', 'serena'],
                complexity: 'advanced',
                priority: 'IMPORTANT'
            },

            // 🔍 Analysis & Discovery Commands
            'sc:analyze': {
                category: 'analysis',
                description: 'Multi-dimensional codebase analysis with comprehensive insights',
                flags: ['--deep', '--security', '--performance', '--architecture', '--ultrathink'],
                agents: ['root-cause-analyst', 'system-architect', 'security-engineer'],
                mcpRequired: ['sequential', 'context7', 'serena'],
                complexity: 'advanced',
                priority: 'IMPORTANT',
                autoFlags: {
                    security: ['--security', '--agent security-engineer'],
                    performance: ['--performance', '--agent performance-engineer'],
                    architecture: ['--architecture', '--agent system-architect']
                }
            },
            'sc:brainstorm': {
                category: 'orchestration',
                description: 'Interactive requirements discovery through Socratic dialogue',
                flags: ['--strategy', '--depth', '--parallel', '--cross-session'],
                agents: ['system-architect', 'root-cause-analyst', 'requirements-analyst'],
                mcpRequired: ['sequential', 'context7', 'serena'],
                complexity: 'advanced',
                priority: 'IMPORTANT',
                autoFlags: {
                    systematic: ['--strategy systematic', '--depth deep'],
                    agile: ['--strategy agile', '--parallel'],
                    enterprise: ['--strategy enterprise', '--cross-session']
                }
            },
            'sc:troubleshoot': {
                category: 'analysis',
                description: 'Intelligent problem diagnosis and systematic resolution',
                flags: ['--trace', '--logs', '--reproduce', '--fix', '--root-cause'],
                agents: ['root-cause-analyst', 'performance-engineer'],
                mcpRequired: ['sequential', 'context7'],
                complexity: 'moderate',
                priority: 'CRITICAL'
            },
            'sc:business-panel': {
                category: 'analysis',
                description: 'Multi-expert business analysis with adaptive interaction modes',
                flags: ['--experts', '--mode', '--focus', '--synthesis-only', '--structured', '--verbose'],
                agents: ['system-architect', 'requirements-analyst', 'socratic-mentor'],
                mcpRequired: ['sequential', 'context7'],
                complexity: 'advanced',
                priority: 'IMPORTANT',
                businessExperts: [
                    'christensen', 'porter', 'drucker', 'godin', 'kim_mauborgne', 
                    'collins', 'taleb', 'meadows', 'doumont'
                ],
                analysisPhases: ['discussion', 'debate', 'socratic'],
                autoFlags: {
                    strategy: ['--focus strategy', '--experts porter,kim_mauborgne'],
                    innovation: ['--focus innovation', '--experts christensen,drucker'],
                    risk: ['--mode debate', '--experts taleb,meadows'],
                    systems: ['--experts meadows,drucker', '--structured']
                }
            },

            // ✅ Quality & Testing Commands
            'sc:improve': {
                category: 'quality',
                description: 'Evidence-based code improvement with systematic refactoring',
                flags: ['--refactor', '--optimize', '--modernize', '--validate'],
                agents: ['refactoring-expert', 'performance-engineer', 'system-architect'],
                mcpRequired: ['sequential', 'morphllm'],
                complexity: 'moderate',
                priority: 'IMPORTANT'
            },
            'sc:test': {
                category: 'quality',
                description: 'Comprehensive testing strategy with automation',
                flags: ['--unit', '--integration', '--e2e', '--coverage', '--automated'],
                agents: ['quality-engineer'],
                mcpRequired: ['playwright', 'context7'],
                complexity: 'moderate',
                priority: 'IMPORTANT'
            },

            // 🚀 Operations & Management Commands
            'sc:task': {
                category: 'operations',
                description: 'Enhanced task management with cross-session persistence',
                flags: ['--create', '--status', '--milestone', '--assign', '--persist'],
                agents: ['system-architect', 'devops-architect'],
                mcpRequired: ['sequential', 'serena'],
                complexity: 'standard',
                priority: 'IMPORTANT'
            },
            'sc:spawn': {
                category: 'operations',
                description: 'Specialized agent spawning and intelligent coordination',
                flags: ['--role', '--context', '--parallel', '--merge', '--expertise'],
                agents: ['system-architect'],
                mcpRequired: ['sequential', 'serena'],
                complexity: 'advanced',
                priority: 'IMPORTANT'
            },

            // 📚 Knowledge & Documentation Commands
            'sc:explain': {
                category: 'knowledge',
                description: 'Educational explanations with progressive learning approach',
                flags: ['--simple', '--detailed', '--visual', '--examples', '--interactive'],
                agents: ['socratic-mentor', 'learning-guide'],
                mcpRequired: ['context7', 'sequential'],
                complexity: 'moderate',
                priority: 'RECOMMENDED',
                autoFlags: {
                    beginner: ['--simple', '--examples'],
                    detailed: ['--detailed', '--visual'],
                    documentation: ['--examples', '--visual']
                }
            },
            'sc:document': {
                category: 'knowledge',
                description: 'Comprehensive documentation generation with best practices',
                flags: ['--api', '--user', '--technical', '--readme', '--interactive'],
                agents: ['technical-writer', 'socratic-mentor'],
                mcpRequired: ['context7', 'sequential'],
                complexity: 'moderate',
                priority: 'RECOMMENDED'
            },

            // 🔧 Maintenance & Optimization Commands
            'sc:cleanup': {
                category: 'maintenance',
                description: 'Project cleanup and technical debt reduction',
                flags: ['--unused', '--duplicates', '--formatting', '--optimize', '--aggressive'],
                agents: ['refactoring-expert'],
                mcpRequired: ['sequential', 'morphllm'],
                complexity: 'moderate',
                priority: 'RECOMMENDED',
                autoFlags: {
                    debt: ['--unused', '--duplicates'],
                    format: ['--formatting', '--optimize'],
                    comprehensive: ['--unused', '--duplicates', '--formatting']
                }
            },
            'sc:git': {
                category: 'maintenance',
                description: 'Git workflow assistant with intelligent operations',
                flags: ['--checkpoint', '--restore', '--analyze', '--optimize', '--workflow'],
                agents: ['devops-architect', 'technical-writer'],
                mcpRequired: ['sequential'],
                complexity: 'moderate',
                priority: 'RECOMMENDED'
            },

            // 📊 Planning & Architecture Commands
            'sc:estimate': {
                category: 'planning',
                description: 'Evidence-based project estimation with risk assessment',
                flags: ['--detailed', '--summary', '--breakdown', '--risks', '--timeline'],
                agents: ['requirements-analyst', 'system-architect'],
                mcpRequired: ['sequential', 'context7'],
                complexity: 'advanced',
                priority: 'IMPORTANT'
            },
            'sc:design': {
                category: 'planning',
                description: 'System design and architecture orchestration',
                flags: ['--patterns', '--architecture', '--api', '--database', '--scalability'],
                agents: ['system-architect', 'frontend-architect'],
                mcpRequired: ['magic', 'sequential', 'context7'],
                complexity: 'advanced',
                priority: 'IMPORTANT'
            },

            // 🎯 Session & Meta Commands
            'sc:load': {
                category: 'session',
                description: 'Project context loading and cross-session restoration',
                flags: ['--agent', '--config', '--template', '--workflow', '--memory'],
                agents: ['root-cause-analyst', 'system-architect', 'technical-writer'],
                mcpRequired: ['serena', 'sequential'],
                complexity: 'moderate',
                priority: 'CRITICAL'
            },
            'sc:save': {
                category: 'session',
                description: 'Session state persistence with intelligent context capture',
                flags: ['--context', '--memory', '--checkpoint', '--agent-state'],
                agents: ['technical-writer', 'system-architect'],
                mcpRequired: ['serena'],
                complexity: 'moderate',
                priority: 'CRITICAL'
            },
            'sc:reflect': {
                category: 'session',
                description: 'Meta-cognitive reflection and performance analysis',
                flags: ['--decision', '--pattern', '--improvement', '--learning'],
                agents: ['socratic-mentor', 'root-cause-analyst'],
                mcpRequired: ['sequential', 'serena'],
                complexity: 'moderate',
                priority: 'RECOMMENDED'
            },

            // 🔍 Discovery & Navigation Commands
            'sc:index': {
                category: 'meta',
                description: 'Command catalog browsing and intelligent discovery',
                flags: ['--search', '--category', '--help', '--examples', '--interactive'],
                agents: ['socratic-mentor', 'root-cause-analyst'],
                mcpRequired: ['sequential'],
                complexity: 'low',
                priority: 'RECOMMENDED'
            },
            'sc:select-tool': {
                category: 'meta',
                description: 'Intelligent tool selection and optimization guidance',
                flags: ['--task', '--optimize', '--compare', '--recommend'],
                agents: ['system-architect', 'performance-engineer'],
                mcpRequired: ['sequential', 'context7'],
                complexity: 'moderate',
                priority: 'RECOMMENDED'
            }
        };

        Object.entries(commands).forEach(([name, config]) => {
            this.config.commands.set(name, {
                ...config,
                usage: this.generateUsageExample(name, config),
                namespace: 'sc',
                version: FRAMEWORK_VERSION
            });
        });

        console.error(`[INFO] Loaded ${this.config.commands.size} SuperClaude v4.0.8 commands`);
    }

    async loadV4Agents() {
        // SuperClaude Framework v4.0.8 - 14 specialized agents
        const agents = {
            'system-architect': {
                identity: 'System architecture specialist | Scalability expert | Long-term technical strategist',
                coreBeliefs: ['Design for 10x growth', 'Clear boundaries enable evolution'],
                primaryQuestion: 'How will this scale and adapt over time?',
                mcpPreferences: ['sequential', 'context7', 'serena'],
                thinkingMode: 'systematic',
                autoTriggers: ['architecture', 'design', 'scalability', 'patterns', 'system'],
                commandSpecialization: ['sc:build', 'sc:analyze', 'sc:design', 'sc:workflow'],
                tools: ['Read', 'Grep', 'Glob', 'Write', 'Bash'],
                behaviorModifiers: {
                    verbosity: 'detailed',
                    focus: 'long-term',
                    riskTolerance: 'conservative'
                }
            },
            'frontend-architect': {
                identity: 'Frontend architecture specialist | UX-driven engineer | Performance optimizer',
                coreBeliefs: ['User experience drives technical decisions', 'Performance is accessibility'],
                primaryQuestion: 'How does this enhance user experience and accessibility?',
                mcpPreferences: ['magic', 'playwright', 'context7'],
                thinkingMode: 'user-centric',
                autoTriggers: ['component', 'ui', 'responsive', 'accessibility', 'frontend'],
                commandSpecialization: ['sc:build', 'sc:implement', 'sc:test', 'sc:design'],
                tools: ['Read', 'Write', 'Edit', 'MultiEdit', 'Bash'],
                behaviorModifiers: {
                    verbosity: 'practical',
                    focus: 'user-experience',
                    riskTolerance: 'moderate'
                }
            },
            'backend-architect': {
                identity: 'Backend architecture specialist | API design expert | Data systems architect',
                coreBeliefs: ['Data integrity is paramount', 'APIs are contracts between systems'],
                primaryQuestion: 'How does data flow reliably through this system?',
                mcpPreferences: ['context7', 'sequential', 'serena'],
                thinkingMode: 'data-driven',
                autoTriggers: ['api', 'database', 'service', 'integration', 'backend'],
                commandSpecialization: ['sc:implement', 'sc:analyze', 'sc:troubleshoot', 'sc:design'],
                tools: ['Read', 'Write', 'Edit', 'MultiEdit', 'Bash', 'Grep'],
                behaviorModifiers: {
                    verbosity: 'precise',
                    focus: 'reliability',
                    riskTolerance: 'conservative'
                }
            },
            'devops-architect': {
                identity: 'DevOps infrastructure specialist | Automation expert | Reliability engineer',
                coreBeliefs: ['Automate everything that can be automated', 'Observability enables reliability'],
                primaryQuestion: 'How can we automate and monitor this reliably?',
                mcpPreferences: ['sequential', 'context7'],
                thinkingMode: 'automation-focused',
                autoTriggers: ['deploy', 'infrastructure', 'automation', 'monitoring', 'devops'],
                commandSpecialization: ['sc:workflow', 'sc:spawn', 'sc:git'],
                tools: ['Read', 'Write', 'Edit', 'Bash'],
                behaviorModifiers: {
                    verbosity: 'operational',
                    focus: 'reliability',
                    riskTolerance: 'measured'
                }
            },
            'security-engineer': {
                identity: 'Security architecture specialist | Threat modeling expert | Compliance guardian',
                coreBeliefs: ['Security by design, not as afterthought', 'Zero trust, verify everything'],
                primaryQuestion: 'What are the attack vectors and mitigation strategies?',
                mcpPreferences: ['sequential', 'context7'],
                thinkingMode: 'threat-focused',
                autoTriggers: ['security', 'vulnerability', 'auth', 'compliance', 'threat'],
                commandSpecialization: ['sc:analyze', 'sc:improve', 'sc:troubleshoot'],
                tools: ['Read', 'Grep', 'Glob', 'Bash', 'Write'],
                behaviorModifiers: {
                    verbosity: 'comprehensive',
                    focus: 'security-first',
                    riskTolerance: 'paranoid'
                }
            },
            'performance-engineer': {
                identity: 'Performance optimization specialist | Bottleneck elimination expert',
                coreBeliefs: ['Measure before optimizing', 'Bottlenecks migrate when addressed'],
                primaryQuestion: 'Where are the performance bottlenecks and how do we eliminate them?',
                mcpPreferences: ['sequential', 'context7'],
                thinkingMode: 'measurement-driven',
                autoTriggers: ['performance', 'optimization', 'bottleneck', 'scale', 'speed'],
                commandSpecialization: ['sc:analyze', 'sc:improve', 'sc:troubleshoot'],
                tools: ['Read', 'Grep', 'Glob', 'Bash', 'Write'],
                behaviorModifiers: {
                    verbosity: 'data-driven',
                    focus: 'optimization',
                    riskTolerance: 'measured'
                }
            },
            'quality-engineer': {
                identity: 'Quality assurance specialist | Testing strategist | Edge case detective',
                coreBeliefs: ['Quality is built in, not tested in', 'Edge cases reveal system truth'],
                primaryQuestion: 'How do we ensure comprehensive quality and catch edge cases?',
                mcpPreferences: ['playwright', 'sequential'],
                thinkingMode: 'systematic-validation',
                autoTriggers: ['test', 'quality', 'edge-case', 'validation', 'qa'],
                commandSpecialization: ['sc:test', 'sc:improve', 'sc:analyze'],
                tools: ['Read', 'Write', 'Bash', 'Grep'],
                behaviorModifiers: {
                    verbosity: 'thorough',
                    focus: 'quality-assurance',
                    riskTolerance: 'conservative'
                }
            },
            'refactoring-expert': {
                identity: 'Code quality specialist | Technical debt manager | Clean code advocate',
                coreBeliefs: ['Simplicity over complexity', 'Code should tell a story'],
                primaryQuestion: 'How can this be simpler, cleaner, and more maintainable?',
                mcpPreferences: ['morphllm', 'sequential'],
                thinkingMode: 'simplification-focused',
                autoTriggers: ['refactor', 'cleanup', 'debt', 'simplify', 'clean'],
                commandSpecialization: ['sc:improve', 'sc:cleanup'],
                tools: ['Read', 'Edit', 'MultiEdit', 'Grep', 'Write', 'Bash'],
                behaviorModifiers: {
                    verbosity: 'concise',
                    focus: 'maintainability',
                    riskTolerance: 'moderate'
                }
            },
            'root-cause-analyst': {
                identity: 'Problem investigation specialist | Evidence-based diagnostician',
                coreBeliefs: ['Evidence over assumptions', 'Symptoms point to root causes'],
                primaryQuestion: 'What does the evidence tell us about the underlying problem?',
                mcpPreferences: ['sequential', 'serena'],
                thinkingMode: 'investigative',
                autoTriggers: ['debug', 'investigate', 'analyze', 'troubleshoot', 'root-cause'],
                commandSpecialization: ['sc:analyze', 'sc:troubleshoot', 'sc:brainstorm'],
                tools: ['Read', 'Grep', 'Glob', 'Bash', 'Write'],
                behaviorModifiers: {
                    verbosity: 'comprehensive',
                    focus: 'root-cause',
                    riskTolerance: 'evidence-based'
                }
            },
            'requirements-analyst': {
                identity: 'Requirements discovery specialist | Ambiguity resolver | Specification architect',
                coreBeliefs: ['Clear requirements prevent scope creep', 'Ambiguity is the enemy of success'],
                primaryQuestion: 'What are we really trying to achieve and why?',
                mcpPreferences: ['sequential', 'serena'],
                thinkingMode: 'discovery-focused',
                autoTriggers: ['requirements', 'specification', 'scope', 'estimate', 'planning'],
                commandSpecialization: ['sc:brainstorm', 'sc:estimate', 'sc:analyze'],
                tools: ['Read', 'Write', 'Edit', 'TodoWrite', 'Grep', 'Bash'],
                behaviorModifiers: {
                    verbosity: 'structured',
                    focus: 'clarity',
                    riskTolerance: 'conservative'
                }
            },
            'python-expert': {
                identity: 'Python architecture specialist | Performance optimizer | Best practices guardian',
                coreBeliefs: ['Pythonic is readable and efficient', 'Type hints prevent future pain'],
                primaryQuestion: 'How can this be more Pythonic, performant, and maintainable?',
                mcpPreferences: ['context7', 'sequential'],
                thinkingMode: 'pythonic-focused',
                autoTriggers: ['python', 'django', 'flask', 'fastapi', 'pandas'],
                commandSpecialization: ['sc:implement', 'sc:improve', 'sc:analyze'],
                tools: ['Read', 'Write', 'Edit', 'MultiEdit', 'Bash', 'Grep'],
                behaviorModifiers: {
                    verbosity: 'practical',
                    focus: 'python-excellence',
                    riskTolerance: 'moderate'
                }
            },
            'socratic-mentor': {
                identity: 'Educational guide | Knowledge transfer specialist | Learning facilitator',
                coreBeliefs: ['Understanding over completion', 'Questions unlock deeper learning'],
                primaryQuestion: 'How can I guide discovery rather than provide answers?',
                mcpPreferences: ['context7', 'sequential'],
                thinkingMode: 'educational',
                autoTriggers: ['learn', 'explain', 'understand', 'guide', 'teach', 'mentor'],
                commandSpecialization: ['sc:explain', 'sc:document', 'sc:index'],
                tools: ['Read', 'Write', 'Grep', 'Bash'],
                behaviorModifiers: {
                    verbosity: 'guided',
                    focus: 'understanding',
                    riskTolerance: 'conservative'
                }
            },
            'learning-guide': {
                identity: 'Programming education specialist | Concept simplification expert',
                coreBeliefs: ['Complex concepts need simple explanations', 'Practice builds expertise'],
                primaryQuestion: 'How can this be learned most effectively?',
                mcpPreferences: ['context7', 'sequential'],
                thinkingMode: 'pedagogical',
                autoTriggers: ['tutorial', 'beginner', 'example', 'practice', 'learning'],
                commandSpecialization: ['sc:explain', 'sc:document'],
                tools: ['Read', 'Write', 'Grep', 'Bash'],
                behaviorModifiers: {
                    verbosity: 'instructional',
                    focus: 'learning-effectiveness',
                    riskTolerance: 'supportive'
                }
            },
            'technical-writer': {
                identity: 'Documentation specialist | Technical communication expert | Clarity advocate',
                coreBeliefs: ['Documentation is user interface for code', 'Clarity serves everyone'],
                primaryQuestion: 'How can this be documented most clearly and usefully?',
                mcpPreferences: ['context7', 'serena'],
                thinkingMode: 'communication-focused',
                autoTriggers: ['document', 'readme', 'api-docs', 'guide', 'documentation'],
                commandSpecialization: ['sc:document', 'sc:explain', 'sc:save'],
                tools: ['Read', 'Write', 'Edit', 'TodoWrite', 'Bash'],
                behaviorModifiers: {
                    verbosity: 'comprehensive',
                    focus: 'accessibility',
                    riskTolerance: 'conservative'
                }
            }
        };

        Object.entries(agents).forEach(([name, config]) => {
            this.config.agents.set(name, {
                ...config,
                version: FRAMEWORK_VERSION,
                capabilities: this.generateAgentCapabilities(config)
            });
        });

        console.error(`[INFO] Loaded ${this.config.agents.size} SuperClaude v4.0.8 specialized agents`);
    }

    async loadBehavioralModes() {
        // SuperClaude Framework v4.0.8 - 5 behavioral modes
        const modes = {
            brainstorming: {
                name: 'Brainstorming Mode',
                description: 'Collaborative discovery mindset for requirements exploration',
                triggers: ['vague requests', 'exploration keywords', 'uncertainty indicators'],
                behaviors: ['socratic dialogue', 'non-presumptive', 'collaborative exploration']
            },
            introspection: {
                name: 'Introspection Mode', 
                description: 'Meta-cognitive analysis for reasoning optimization',
                triggers: ['self-analysis requests', 'error recovery', 'complex problem solving'],
                behaviors: ['self-examination', 'transparency', 'pattern detection']
            },
            orchestration: {
                name: 'Orchestration Mode',
                description: 'Intelligent tool selection for optimal task routing',
                triggers: ['multi-tool operations', 'performance constraints', 'parallel execution'],
                behaviors: ['smart tool selection', 'resource awareness', 'parallel thinking']
            },
            task_management: {
                name: 'Task Management Mode',
                description: 'Hierarchical organization with persistent memory',
                triggers: ['>3 steps', 'multiple directories', 'complex dependencies'],
                behaviors: ['hierarchical organization', 'cross-session persistence', 'memory operations']
            },
            token_efficiency: {
                name: 'Token Efficiency Mode',
                description: 'Symbol-enhanced communication for compressed clarity',
                triggers: ['context usage >75%', 'large-scale operations', '--uc flag'],
                behaviors: ['symbol communication', 'abbreviation systems', '30-50% compression']
            }
        };

        Object.entries(modes).forEach(([name, config]) => {
            this.config.behavioralModes.set(name, config);
        });

        console.error(`[INFO] Loaded ${this.config.behavioralModes.size} behavioral modes`);
    }

    async loadPriorityRules() {
        // SuperClaude Framework v4.0.8 Priority-based rule system
        const rules = {
            CRITICAL: {
                priority: 1,
                description: 'Security, data safety, production breaks - Never compromise',
                examples: ['sc:troubleshoot', 'sc:load', 'sc:save'],
                enforcement: 'always_win'
            },
            IMPORTANT: {
                priority: 2,
                description: 'Quality, maintainability, professionalism - Strong preference',
                examples: ['sc:build', 'sc:implement', 'sc:analyze'],
                enforcement: 'strong_preference'
            },
            RECOMMENDED: {
                priority: 3,
                description: 'Optimization, style, best practices - Apply when practical',
                examples: ['sc:cleanup', 'sc:explain', 'sc:index'],
                enforcement: 'when_practical'
            }
        };

        Object.entries(rules).forEach(([name, config]) => {
            this.state.priorityRules.set(name, config);
        });

        console.error('[INFO] Loaded priority-based rule system');
    }

    async setupEnhancedRouting() {
        // Enhanced routing logic for v4.0.8
        this.routingEngine = {
            analyzeContext: (input) => {
                const context = {
                    command: this.extractCommand(input),
                    flags: this.extractFlags(input),
                    complexity: this.assessComplexity(input),
                    domain: this.identifyDomain(input),
                    mcpNeeds: this.identifyMCPNeeds(input)
                };
                return context;
            },
            
            selectAgent: (context) => {
                // Intelligent agent selection based on context
                for (const [agentName, agent] of this.config.agents) {
                    if (this.matchesAgentTriggers(context, agent)) {
                        return agentName;
                    }
                }
                return 'system-architect'; // Default fallback
            },

            routeMCP: (context, agents) => {
                // Route to appropriate MCP servers
                const mcpServers = new Set();
                
                if (context.command) {
                    const cmd = this.config.commands.get(context.command);
                    if (cmd && cmd.mcpRequired) {
                        cmd.mcpRequired.forEach(mcp => mcpServers.add(mcp));
                    }
                }

                agents.forEach(agentName => {
                    const agent = this.config.agents.get(agentName);
                    if (agent && agent.mcpPreferences) {
                        agent.mcpPreferences.forEach(mcp => mcpServers.add(mcp));
                    }
                });

                return Array.from(mcpServers);
            }
        };
    }

    async initializeV4MCPIntegrations() {
        // SuperClaude Framework v4.0.8 - 6 MCP server integrations
        const mcpServers = {
            sequential: {
                name: 'Sequential MCP',
                description: 'Multi-step reasoning engine for complex analysis',
                capabilities: ['structured-thinking', 'hypothesis-testing', 'systematic-analysis'],
                triggers: ['complex-debugging', 'architectural-analysis', 'multi-component-issues']
            },
            context7: {
                name: 'Context7 MCP',
                description: 'Official library documentation and framework guidance',
                capabilities: ['documentation-lookup', 'framework-patterns', 'best-practices'],
                triggers: ['import-statements', 'framework-questions', 'official-docs']
            },
            magic: {
                name: 'Magic MCP',
                description: 'Modern UI component generation from 21st.dev patterns',
                capabilities: ['ui-generation', 'design-system', 'accessibility'],
                triggers: ['ui-components', 'design-system', 'frontend-development']
            },
            playwright: {
                name: 'Playwright MCP',
                description: 'Browser automation and E2E testing',
                capabilities: ['browser-automation', 'e2e-testing', 'visual-validation'],
                triggers: ['browser-testing', 'e2e-scenarios', 'visual-testing']
            },
            morphllm: {
                name: 'Morphllm MCP', 
                description: 'Pattern-based code editing with token optimization',
                capabilities: ['bulk-transformations', 'pattern-edits', 'token-efficiency'],
                triggers: ['multi-file-edits', 'pattern-transformations', 'bulk-operations']
            },
            serena: {
                name: 'Serena MCP',
                description: 'Semantic code understanding with project memory',
                capabilities: ['semantic-analysis', 'project-memory', 'cross-session-persistence'],
                triggers: ['symbol-operations', 'project-navigation', 'session-management']
            }
        };

        Object.entries(mcpServers).forEach(([name, config]) => {
            this.config.mcpServers.set(name, config);
        });

        console.error(`[INFO] Initialized ${this.config.mcpServers.size} MCP server integrations`);
    }

    setupRequestHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            const tools = [];
            
            // Generate tools for all 21 commands
            for (const [commandName, commandConfig] of this.config.commands) {
                tools.push({
                    name: commandName,
                    description: `${commandConfig.description} (Category: ${commandConfig.category}, Priority: ${commandConfig.priority})`,
                    inputSchema: {
                        type: "object",
                        properties: {
                            input: {
                                type: "string",
                                description: `SuperClaude v${FRAMEWORK_VERSION} command input with optional flags: ${commandConfig.flags?.join(', ') || 'none'}`
                            },
                            flags: {
                                type: "array",
                                items: { type: "string" },
                                description: `Available flags: ${commandConfig.flags?.join(', ') || 'none'}`
                            },
                            agent: {
                                type: "string", 
                                description: `Preferred agent: ${commandConfig.agents?.join(', ') || 'auto-select'}`
                            }
                        },
                        required: ["input"]
                    }
                });
            }

            return { tools };
        });

        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            
            try {
                return await this.executeCommand(name, args);
            } catch (error) {
                console.error(`[ERROR] Command execution failed: ${error.message}`);
                return {
                    content: [
                        {
                            type: "text",
                            text: `Error executing ${name}: ${error.message}`
                        }
                    ]
                };
            }
        });
    }

    async executeCommand(commandName, args) {
        const command = this.config.commands.get(commandName);
        if (!command) {
            throw new Error(`Unknown command: ${commandName}`);
        }

        // Analyze context and route appropriately
        const context = this.routingEngine.analyzeContext(args.input || '');
        const selectedAgent = this.routingEngine.selectAgent(context);
        const requiredMCP = this.routingEngine.routeMCP(context, [selectedAgent]);

        // Update state
        this.state.activeAgent = selectedAgent;
        this.state.lastCommand = commandName;
        this.state.routingHistory.push({
            timestamp: new Date().toISOString(),
            command: commandName,
            agent: selectedAgent,
            mcp: requiredMCP,
            context: context
        });

        const response = await this.generateCommandResponse(command, args, selectedAgent, requiredMCP);
        
        console.error(`[INFO] Executed ${commandName} via ${selectedAgent} agent with MCP: ${requiredMCP.join(', ')}`);
        
        return {
            content: [
                {
                    type: "text", 
                    text: response
                }
            ]
        };
    }

    async generateCommandResponse(command, args, agent, mcpServers) {
        const agentConfig = this.config.agents.get(agent);
        
        let response = `# ${command.description}\n\n`;
        response += `**Framework**: SuperClaude v${FRAMEWORK_VERSION}\n`;
        response += `**Agent**: ${agentConfig.identity}\n`;
        response += `**MCP Integration**: ${mcpServers.join(', ')}\n`;
        response += `**Priority**: ${command.priority}\n\n`;
        
        response += `## Agent Perspective\n`;
        response += `**Core Belief**: ${agentConfig.coreBeliefs.join(' | ')}\n`;
        response += `**Primary Question**: ${agentConfig.primaryQuestion}\n\n`;
        
        response += `## Execution Framework\n`;
        response += `1. **Context Analysis**: ${agentConfig.thinkingMode} approach\n`;
        response += `2. **Tool Coordination**: ${agentConfig.tools.join(', ')}\n`;
        response += `3. **MCP Integration**: ${agentConfig.mcpPreferences.join(' → ')}\n`;
        response += `4. **Quality Gates**: ${command.priority} priority enforcement\n\n`;
        
        response += `## Implementation Guidance\n`;
        response += `- **Behavioral Mode**: ${this.state.behavioralMode}\n`;
        response += `- **Command Flags**: ${args.flags?.join(', ') || 'default'}\n`;
        response += `- **Auto-Triggers**: ${agentConfig.autoTriggers.join(', ')}\n\n`;
        
        response += `## Next Steps\n`;
        response += `Execute this command in Claude Code with the coordinated agent and MCP server integration for optimal results.\n\n`;
        response += `*This response was generated by the Gemini SuperClaude MCP Server v${SERVER_VERSION} for framework compatibility.*`;
        
        return response;
    }

    // Helper methods for routing and analysis
    extractCommand(input) {
        const match = input.match(/\/(sc:[a-zA-Z-]+)/);
        return match ? match[1] : null;
    }

    extractFlags(input) {
        const flags = input.match(/--[\w-]+/g) || [];
        return flags;
    }

    assessComplexity(input) {
        if (input.includes('--ultrathink') || input.includes('--wave')) return 'advanced';
        if (input.includes('--deep') || input.includes('--comprehensive')) return 'moderate';
        return 'standard';
    }

    identifyDomain(input) {
        if (/ui|component|frontend|react|vue/.test(input)) return 'frontend';
        if (/api|backend|server|database/.test(input)) return 'backend';
        if (/security|auth|vulnerability/.test(input)) return 'security';
        if (/deploy|infrastructure|devops/.test(input)) return 'devops';
        if (/test|quality|qa/.test(input)) return 'quality';
        return 'general';
    }

    identifyMCPNeeds(input) {
        const needs = [];
        if (/component|ui|design/.test(input)) needs.push('magic');
        if (/complex|analyze|think/.test(input)) needs.push('sequential');
        if (/framework|library|docs/.test(input)) needs.push('context7');
        if (/test|browser|e2e/.test(input)) needs.push('playwright');
        if (/edit|refactor|bulk/.test(input)) needs.push('morphllm');
        if (/memory|session|persist/.test(input)) needs.push('serena');
        return needs;
    }

    matchesAgentTriggers(context, agent) {
        if (!agent.autoTriggers) return false;
        const input = context.command + ' ' + JSON.stringify(context);
        return agent.autoTriggers.some(trigger => 
            input.toLowerCase().includes(trigger.toLowerCase())
        );
    }

    generateUsageExample(commandName, config) {
        const flags = config.flags?.slice(0, 2).join(' ') || '';
        return `/${commandName} [description] ${flags}`;
    }

    generateAgentCapabilities(agentConfig) {
        return {
            tools: agentConfig.tools,
            mcpIntegration: agentConfig.mcpPreferences,
            specialization: agentConfig.commandSpecialization,
            thinkingMode: agentConfig.thinkingMode
        };
    }
}

// Server startup
async function main() {
    const server = new GeminiSuperClaudeMCPServerV4();
    const transport = new StdioServerTransport();
    
    await server.initialize();
    await server.server.connect(transport);
    
    console.error('[INFO] Gemini SuperClaude MCP Server v2.0.0 ready for SuperClaude Framework v4.0.8');
}

main().catch(console.error);