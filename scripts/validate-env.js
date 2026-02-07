
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../');
const ENV_EXAMPLE_PATH = path.join(ROOT_DIR, '.env.example');
const ENV_PATH = path.join(ROOT_DIR, '.env');

console.log('🔍 Validating .env file against .env.example...\n');

// Check if .env.example exists
if (!fs.existsSync(ENV_EXAMPLE_PATH)) {
    console.error('❌ .env.example not found!');
    process.exit(1);
}

// Check if .env exists
if (!fs.existsSync(ENV_PATH)) {
    console.error('❌ .env file not found!');
    console.log('💡 Copy .env.example to .env and fill in your values.');
    process.exit(1);
}

// Parse .env.example to get required keys
const exampleContent = fs.readFileSync(ENV_EXAMPLE_PATH, 'utf-8');
const envContent = fs.readFileSync(ENV_PATH, 'utf-8');

// Extract keys from .env.example (lines that start with VITE_)
const exampleKeys = exampleContent
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('#'))
    .map(line => line.split('=')[0].trim())
    .filter(key => key);

// Extract keys from .env
const envKeys = envContent
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('#'))
    .map(line => line.split('=')[0].trim())
    .filter(key => key);

// Check for missing keys
const missingKeys = exampleKeys.filter(key => !envKeys.includes(key));
const extraKeys = envKeys.filter(key => !exampleKeys.includes(key));

let hasErrors = false;

if (missingKeys.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingKeys.forEach(key => console.error(`   - ${key}`));
    hasErrors = true;
}

if (extraKeys.length > 0) {
    console.warn('⚠️  Extra environment variables (not in .env.example):');
    extraKeys.forEach(key => console.warn(`   - ${key}`));
}

// Check for empty values in .env
const emptyValues = envContent
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('#'))
    .filter(line => {
        const [key, value] = line.split('=');
        return key && (!value || value.trim() === '' || value.trim() === '""' || value.trim() === "''");
    })
    .map(line => line.split('=')[0].trim());

if (emptyValues.length > 0) {
    console.warn('⚠️  Environment variables with empty values:');
    emptyValues.forEach(key => console.warn(`   - ${key}`));
}

if (hasErrors) {
    console.error('\n❌ Environment validation FAILED.');
    process.exit(1);
} else {
    console.log('✅ Environment validation PASSED.');
    console.log(`   Found ${envKeys.length} environment variables.`);
    process.exit(0);
}
