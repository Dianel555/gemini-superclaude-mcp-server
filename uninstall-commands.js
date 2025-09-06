#!/usr/bin/env node

/**
 * Gemini SuperClaude Command Uninstaller
 * Removes SuperClaude Framework commands from Gemini CLI
 */

import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const GEMINI_COMMANDS_DIR = path.join(os.homedir(), '.gemini', 'commands', 'sc');

async function uninstallCommands() {
    console.log('🗑️  Uninstalling SuperClaude Commands from Gemini CLI');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    try {
        // Check if directory exists
        try {
            await fs.access(GEMINI_COMMANDS_DIR);
        } catch (error) {
            console.log('ℹ️  No SuperClaude commands found to uninstall');
            return;
        }
        
        // Remove all TOML files
        const files = await fs.readdir(GEMINI_COMMANDS_DIR);
        const tomlFiles = files.filter(file => file.endsWith('.toml'));
        
        let removed = 0;
        for (const file of tomlFiles) {
            const filePath = path.join(GEMINI_COMMANDS_DIR, file);
            await fs.unlink(filePath);
            console.log(`🗑️  Removed: /sc:${file.replace('.toml', '')}`);
            removed++;
        }
        
        // Remove directory if empty
        const remainingFiles = await fs.readdir(GEMINI_COMMANDS_DIR);
        if (remainingFiles.length === 0) {
            await fs.rmdir(GEMINI_COMMANDS_DIR);
            console.log(`🗑️  Removed directory: ${GEMINI_COMMANDS_DIR}`);
        }
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Uninstallation completed: ${removed} commands removed`);
        
    } catch (error) {
        console.error('❌ Uninstallation failed:', error.message);
        process.exit(1);
    }
}

// Run uninstaller
uninstallCommands();