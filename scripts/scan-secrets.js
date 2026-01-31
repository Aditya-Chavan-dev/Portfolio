
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../src');
const EXCLUDE_DIRS = ['node_modules', 'dist', 'build', '.git'];

// Regex patterns for common secrets
const PATTERNS = [
    { name: 'Google API Key', regex: /AIza[0-9A-Za-z-_]{35}/ },
    { name: 'Firebase Secret', regex: /["']apiKey["']\s*:\s*["'][a-zA-Z0-9_\-]{30,}["']/ },
    { name: 'Private Key', regex: /-----BEGIN PRIVATE KEY-----/ },
    { name: 'Generic Secret', regex: /secret\s*[:=]\s*['"][^'"]+['"]/i },
    { name: 'Generic Token', regex: /token\s*[:=]\s*['"][^'"]+['"]/i },
    { name: 'High Entropy String', regex: /['"][a-zA-Z0-9_\-]{40,}['"]/ } // Broad catch-all
];

let foundIssues = 0;

function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Skip if file seems like a binary or minified bundle (heuristic)
    if (content.length > 50000 && !filePath.endsWith('.json')) return;

    PATTERNS.forEach(({ name, regex }) => {
        if (regex.test(content)) {
            // Exceptions for valid code that looks like secrets (e.g. import.meta.env)
            if (content.includes('import.meta.env')) {
                // Simple heuristic: if the intersection with the regex is actually an env var usage, ignore
                // But properly, we should output specific lines.
            }

            // For now, simple match
            console.error(`[CRITICAL] Possible ${name} found in: ${filePath}`);
            foundIssues++;
        }
    });

    // Special check for console.log (Hygiene)
    if (content.includes('console.log(')) {
        console.warn(`[WARN] console.log found in: ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        if (EXCLUDE_DIRS.includes(file)) return;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (/\.(js|ts|tsx|jsx|json)$/.test(file)) {
            scanFile(filePath);
        }
    });
}

console.log('🛡️ Starting Security Scan...');
try {
    walkDir(ROOT_DIR);
} catch (e) {
    console.error("Scan failed:", e);
    process.exit(1);
}

if (foundIssues > 0) {
    console.error(`\n❌ Security Scan FAILED. ${foundIssues} potential issues found.`);
    process.exit(1);
} else {
    console.log('\n✅ Security Scan PASSED. No secrets found.');
    process.exit(0);
}
