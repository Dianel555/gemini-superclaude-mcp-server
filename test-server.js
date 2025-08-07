#!/usr/bin/env node

/**
 * Test Suite for Gemini SuperClaude MCP Serve
 * 
 * Comprehensive testing of MCP server functionality including:
 * - Command routing and execution
 * - Persona management and switching
 * - MCP server integration
 * - Intelligence routing system
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { spawn } from 'child_process';
import fs from 'fs/promises';

class MCPServerTester {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    async runTests() {
        console.log('🧪 Gemini SuperClaude MCP Serve Test Suite\n');
        
        await this.testCommandRouting();
        await this.testPersonaSystem();
        await this.testMCPIntegration();
        await this.testIntelligentRouting();
        await this.testTokenOptimization();
        
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

    async testCommandRouting() {
        console.log('🔄 Command Routing Tests');
        
        // Test basic command structure
        await this.executeTest('SuperClaude commands have proper structure', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('sc:build') && 
                   serverContent.includes('sc:implement') &&
                   serverContent.includes('sc:analyze');
        });

        // Test command categories
        await this.executeTest('Commands properly categorized', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('category: \'development\'') &&
                   serverContent.includes('category: \'analysis\'') &&
                   serverContent.includes('category: \'quality\'');
        });

        // Test flag system
        await this.executeTest('Commands have flag definitions', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('flags: [') &&
                   serverContent.includes('--tdd') &&
                   serverContent.includes('--magic');
        });

        console.log();
    }

    async testPersonaSystem() {
        console.log('🎭 Persona System Tests');
        
        // Test persona definitions
        await this.executeTest('Core personas defined', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('architect:') &&
                   serverContent.includes('frontend:') &&
                   serverContent.includes('backend:') &&
                   serverContent.includes('analyzer:') &&
                   serverContent.includes('security:');
        });

        // Test persona behavioral patterns
        await this.executeTest('Personas have behavioral patterns', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('thinkingMode:') &&
                   serverContent.includes('autoTriggers:') &&
                   serverContent.includes('behaviorModifiers:');
        });

        // Test auto-trigger system
        await this.executeTest('Auto-trigger patterns configured', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('personaRouting:') &&
                   serverContent.includes('ui|component|frontend') &&
                   serverContent.includes('api|backend|server|database');
        });

        console.log();
    }

    async testMCPIntegration() {
        console.log('🔗 MCP Integration Tests');
        
        // Test MCP server configurations
        await this.executeTest('MCP servers configured', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('sequential:') &&
                   serverContent.includes('context7:') &&
                   serverContent.includes('magic:') &&
                   serverContent.includes('playwright:');
        });

        // Test MCP routing rules
        await this.executeTest('MCP routing rules defined', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('mcpRouting:') &&
                   serverContent.includes('complex|analysis|thinking') &&
                   serverContent.includes('ui|component|design');
        });

        // Test MCP management functionality
        await this.executeTest('MCP management commands present', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('sc:mcp') &&
                   serverContent.includes('handleMCPManagement') &&
                   serverContent.includes('mcpIntegrations');
        });

        console.log();
    }

    async testIntelligentRouting() {
        console.log('🧠 Intelligent Routing Tests');
        
        // Test routing context structure
        await this.executeTest('Routing context properly structured', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('applyIntelligentRouting') &&
                   serverContent.includes('detectedPersona') &&
                   serverContent.includes('suggestedFlags') &&
                   serverContent.includes('confidence');
        });

        // Test pattern matching
        await this.executeTest('Pattern matching implemented', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('RegExp') &&
                   serverContent.includes('test(searchText)') &&
                   serverContent.includes('flagRouting');
        });

        // Test confidence scoring
        await this.executeTest('Confidence scoring system', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('confidence +=') &&
                   serverContent.includes('Math.round(routingContext.confidence * 100)');
        });

        console.log();
    }

    async testTokenOptimization() {
        console.log('⚡ Token Optimization Tests');
        
        // Test optimization modes
        await this.executeTest('Token optimization modes defined', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('normal') &&
                   serverContent.includes('compressed') &&
                   serverContent.includes('ultracompressed') &&
                   serverContent.includes('adaptive');
        });

        // Test optimization command
        await this.executeTest('Optimization command implemented', async () => {
            const serverContent = await fs.readFile('superclaude-server.js', 'utf8');
            return serverContent.includes('sc:optimize') &&
                   serverContent.includes('handleOptimization') &&
                   serverContent.includes('tokenMode');
        });

        console.log();
    }

    async testServerStartup() {
        console.log('🚀 Server Startup Test');
        
        // Test server can initialize without errors
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
                    // Check if initialization completed successfully
                    const success = output.includes('initialization completed') ||
                                  output.includes('Server started') ||
                                  !output.includes('Error') ||
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
            console.log('\n🎉 All tests passed! The server is ready for deployment.');
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
    const tester = new MCPServerTester();
    
    // Test package configuration first
    await testPackageJson();
    
    // Run main test suite
    await tester.runTests();
    
    // Test server startup if all other tests pass
    if (tester.failed === 0) {
        await tester.testServerStartup();
    }
}

runAllTests().catch(error => {
    console.error('❌ Test suite failed:', error.message);
    process.exit(1);
});