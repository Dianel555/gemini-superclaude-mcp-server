#!/usr/bin/env node

/**
 * Gemini SuperClaude Command Installer
 * Installs SuperClaude Framework v4.0.9 commands for Gemini CLI
 */

import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const GEMINI_COMMANDS_DIR = path.join(os.homedir(), '.gemini', 'commands', 'sc');
const SOURCE_COMMANDS_DIR = path.join(process.cwd(), '.gemini', 'commands', 'sc');

async function installCommands() {
    console.log('🚀 Installing SuperClaude Framework v4.0.9 Commands for Gemini CLI');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
        // Create target directory
        await fs.mkdir(GEMINI_COMMANDS_DIR, { recursive: true });
        console.log(`✅ Created directory: ${GEMINI_COMMANDS_DIR}`);
        
        // Copy all TOML files
        const sourceFiles = await fs.readdir(SOURCE_COMMANDS_DIR);
        const tomlFiles = sourceFiles.filter(file => file.endsWith('.toml'));
        
        let installed = 0;
        for (const file of tomlFiles) {
            const sourcePath = path.join(SOURCE_COMMANDS_DIR, file);
            const targetPath = path.join(GEMINI_COMMANDS_DIR, file);
            
            await fs.copyFile(sourcePath, targetPath);
            console.log(`📝 Installed: /sc:${file.replace('.toml', '')}`);
            installed++;
        }
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Installation completed: ${installed} commands installed`);
        console.log('');
        console.log('📋 Available Commands:');
        console.log('• /sc:analyze     - Multi-dimensional codebase analysis');
        console.log('• /sc:build       - Universal project builder');  
        console.log('• /sc:implement   - Feature implementation');
        console.log('• /sc:workflow    - Multi-stage workflow orchestration');
        console.log('• /sc:business-panel - Multi-expert business analysis');
        console.log('• /sc:brainstorm  - Collaborative requirements discovery');
        console.log('• /sc:troubleshoot - Problem diagnosis and resolution');
        console.log('• /sc:improve     - Code improvement and refactoring');
        console.log('• /sc:test        - Comprehensive testing strategy');
        console.log('• /sc:task        - Advanced task coordination');
        console.log('• /sc:spawn       - Distributed processing');
        console.log('• /sc:explain     - Intelligent code explanation');
        console.log('• /sc:document    - Technical documentation generation');
        console.log('• /sc:cleanup     - Codebase cleanup and optimization');
        console.log('• /sc:git         - Git workflow automation');
        console.log('• /sc:estimate    - Project estimation and planning');
        console.log('• /sc:design      - System design and architecture');
        console.log('• /sc:load        - Project context loading');
        console.log('• /sc:save        - Session state persistence');
        console.log('• /sc:reflect     - Meta-cognitive reflection');
        console.log('• /sc:index       - Command catalog browsing');
        console.log('• /sc:select-tool - Tool selection guidance');
        console.log('');
        console.log('🎯 Usage: Type /sc:command-name in Gemini CLI to execute');
        console.log('📚 Each command supports various flags and options');
        console.log('');
        console.log('🔧 MCP Server: Ensure gemini-superclaude-mcp-server is running');
        console.log('⚡ Framework: Compatible with SuperClaude Framework v4.0.9');
        
    } catch (error) {
        console.error('❌ Installation failed:', error.message);
        process.exit(1);
    }
}

// Run installer
installCommands();