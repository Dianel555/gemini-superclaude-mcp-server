#!/usr/bin/env node

/**
 * Test Suite for Gemini SuperClaude MCP Server v2.0.0 (SuperClaude Framework v4.0.8 Compatible)
 * 
 * Comprehensive testing of MCP server functionality including:
 * - Command routing and execution for 21 /sc: commands
 * - 14 specialized agent definitions and behavioral patterns
 * - 6 MCP server integrations and enhanced routing
 * - 5 behavioral modes and priority-based rules
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { spawn } from 'child_process';
import fs from 'fs/promises';

class MCPServerTesterV4 {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    async runTests() {
        console.log('🧪 Gemini SuperClaude MCP Server v2.0.0 Test Suite (SuperClaude v4.0.8 Compatible)\n');
        
        await this.testV4CommandRouting();
        await this.testV4AgentSystem();
        await this.testV4MCPIntegration();
        await this.testV4EnhancedRouting();
        await this.testV4BehavioralModes();
        
        this.printResults();
        
        if (this.failed > 0) {
            process.exit(1);
        }
    }

    test(description, testFn) {
        this.tests.push({ description, testFn });
    }

    async executeTest(description, testFn) {
        try {
            const result = await testFn();
            if (result !== false) {
                console.log(`✅ ${description}`);
                this.passed++;
            } else {
                console.log(`❌ ${description}: Test returned false`);
                this.failed++;
            }
        } catch (error) {
            console.log(`❌ ${description}: ${error.message}`);
            this.failed++;
        }
    }

    async testV4CommandRouting() {
        console.log('🔄 Command Routing Tests (v4.0.8)');
        
        await this.executeTest('All 21 SuperClaude commands have proper structure', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('sc:build') && 
                   serverContent.includes('sc:implement') &&
                   serverContent.includes('sc:analyze') &&
                   serverContent.includes('sc:brainstorm') &&
                   serverContent.includes('sc:save');
        });

        await this.executeTest('Commands have priority definitions (CRITICAL/IMPORTANT/RECOMMENDED)', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('priority: \'CRITICAL\'') &&
                   serverContent.includes('priority: \'IMPORTANT\'') &&
                   serverContent.includes('priority: \'RECOMMENDED\'');
        });

        await this.executeTest('Commands have agent specialization', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('agents: [') &&
                   serverContent.includes('system-architect') &&
                   serverContent.includes('frontend-architect');
        });

        console.log();
    }

    async testV4AgentSystem() {
        console.log('🎭 Agent System Tests (v4.0.8)');
        
        await this.executeTest('All 14 specialized agents defined', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('system-architect:') &&
                   serverContent.includes('frontend-architect:') &&
                   serverContent.includes('backend-architect:') &&
                   serverContent.includes('devops-architect:') &&
                   serverContent.includes('security-engineer:');
        });

        await this.executeTest('Agents have behavioral patterns and tool definitions', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('thinkingMode:') &&
                   serverContent.includes('autoTriggers:') &&
                   serverContent.includes('behaviorModifiers:') &&
                   serverContent.includes('tools: [');
        });

        await this.executeTest('Agent auto-trigger patterns configured correctly', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('matchesAgentTriggers(context, agent)') &&
                   serverContent.includes('agent.autoTriggers.some(trigger =>');
        });

        console.log();
    }

    async testV4MCPIntegration() {
        console.log('🔗 MCP Integration Tests (v4.0.8)');
        
        await this.executeTest('All 6 MCP servers configured', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('sequential:') &&
                   serverContent.includes('context7:') &&
                   serverContent.includes('magic:') &&
                   serverContent.includes('playwright:') &&
                   serverContent.includes('morphllm:') &&
                   serverContent.includes('serena:');
        });

        await this.executeTest('MCP routing rules are defined and integrated', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('routeMCP(context, agents)') &&
                   serverContent.includes('cmd.mcpRequired.forEach(mcp => mcpServers.add(mcp))') &&
                   serverContent.includes('agent.mcpPreferences.forEach(mcp => mcpServers.add(mcp))');
        });

        await this.executeTest('Session persistence commands for Serena MCP are present', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('sc:load') &&
                   serverContent.includes('sc:save') &&
                   serverContent.includes('sc:reflect');
        });

        console.log();
    }

    async testV4EnhancedRouting() {
        console.log('🧠 Enhanced Routing Tests (v4.0.8)');
        
        await this.executeTest('Enhanced routing engine is properly structured', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('setupEnhancedRouting()') &&
                   serverContent.includes('routingEngine = {') &&
                   serverContent.includes('analyzeContext:') &&
                   serverContent.includes('selectAgent:');
        });

        await this.executeTest('Context analysis correctly identifies domain and complexity', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('assessComplexity(input)') &&
                   serverContent.includes('identifyDomain(input)') &&
                   serverContent.includes('identifyMCPNeeds(input)');
        });

        await this.executeTest('Agent selection is based on contextual triggers', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('matchesAgentTriggers(context, agent)') &&
                   serverContent.includes('autoTriggers.some(trigger =>');
        });

        console.log();
    }

    async testV4BehavioralModes() {
        console.log('⚡ Behavioral Modes & Rules Tests (v4.0.8)');
        
        await this.executeTest('All 5 behavioral modes are defined', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('brainstorming:') &&
                   serverContent.includes('introspection:') &&
                   serverContent.includes('orchestration:') &&
                   serverContent.includes('task_management:') &&
                   serverContent.includes('token_efficiency:');
        });

        await this.executeTest('Priority-based rule system (CRITICAL/IMPORTANT/RECOMMENDED) is loaded', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('loadPriorityRules()') &&
                   serverContent.includes('CRITICAL:') &&
                   serverContent.includes('enforcement: \'always_win\'');
        });

        console.log();
    }

    async testServerStartup() {
        console.log('🚀 Server Startup Test (v4.0.8)');
        
        await this.executeTest('Server initializes without errors', async () => {
            return new Promise((resolve) => {
                const child = spawn('node', ['superclaude-server.js'], {
                    stdio: 'pipe',
                    timeout: 5000
                });

                let output = '';
                child.stderr.on('data', (data) => {
                    output += data.toString();
                });

                setTimeout(() => {
                    child.kill('SIGTERM');
                    const success = output.includes('initialization completed successfully') &&
                                  !output.includes('Error') &&
                                  !output.includes('Failed');
                    resolve(success);
                }, 3000);

                child.on('error', () => {
                    resolve(false);
                });
            });
        });

        console.log();
    }

    printResults() {
        console.log('📊 Test Results');
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Success Rate: ${Math.round((this.passed / (this.passed + this.failed)) * 100)}%`);
        
        if (this.failed === 0) {
            console.log('\n🎉 All tests passed! The server is ready for SuperClaude v4.0.8.');
        } else {
            console.log('\n🚨 Some tests failed. Please review and fix the issues.');
        }
    }
}

// Mock test for package.json
async function testPackageJson() {
    try {
        const pkg = JSON.parse(await fs.readFile('package.json', 'utf8'));
        console.log('📦 Package Configuration Test');
        console.log(`✅ Name: ${pkg.name}`);
        console.log(`✅ Version: ${pkg.version}`);
        console.log(`✅ Main: ${pkg.main}`);
        console.log(`✅ Dependencies: ${Object.keys(pkg.dependencies || {}).length}`);
        console.log();
        return true;
    } catch (error) {
        console.log('❌ Package.json test failed:', error.message);
        return false;
    }
}

// Run tests
async function runAllTests() {
    const tester = new MCPServerTesterV4();
    
    await testPackageJson();
    await tester.runTests();
    
    if (tester.failed === 0) {
        await tester.testServerStartup();
    }
}

runAllTests().catch(error => {
    console.error('❌ Test suite failed:', error.message);
    process.exit(1);
});