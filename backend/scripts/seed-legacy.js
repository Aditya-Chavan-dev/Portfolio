const { db } = require('../firebase');

const LEGACY_DATA = {
    sources: {
        linkedin: 14,
        resume: 3,
        anonymous: 15
    },
    paths: {
        immersive: 842,
        quick: 215
    }
};

async function seedLegacy() {
    console.log("🌱 Seeding Legacy Data to Truth Vault...");
    try {
        await db.ref('sources').set(LEGACY_DATA.sources);
        await db.ref('paths').set(LEGACY_DATA.paths);
        console.log("✅ Success! The 'Legit' numbers are now in the Database.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Failed to seed:", error);
        process.exit(1);
    }
}

seedLegacy();
