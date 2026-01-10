const { db } = require('../firebase');

async function inspectDB() {
    console.log("🔍 INSPECTING LIVE DATABASE...");

    // Safety Timeout
    setTimeout(() => {
        console.error("❌ Timeout: Could not connect to Database in 10s.");
        process.exit(1);
    }, 10000);

    try {
        const [sourcesSnap, pathsSnap] = await Promise.all([
            db.ref('sources').once('value'),
            db.ref('paths').once('value')
        ]);

        console.log("\n=== 📊 CURRENT DATABASE STATE ===");
        console.log("SOURCES:", sourcesSnap.val());
        console.log("PATHS:  ", pathsSnap.val());
        console.log("=================================\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Inspection Failed:", error);
        process.exit(1);
    }
}

inspectDB();
