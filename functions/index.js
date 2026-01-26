const functions = require("firebase-functions");
const { detectDevice } = require("./utils/deviceDetection");

// Dynamic Serving Middleware
exports.app = functions.https.onRequest((req, res) => {
  const userAgent = req.headers["user-agent"];
  const { isMobile, isBot, deviceType } = detectDevice(userAgent);

  // Log for observability (Structured Logging)
  functions.logger.info("Dynamic Serving Request", {
    path: req.path,
    userAgent: userAgent,
    deviceType: deviceType,
    isMobile: isMobile,
    isBot: isBot
  });

  // VARY HEADER (CRITICAL FOR CACHING)
  res.set("Vary", "User-Agent");

  // Phase 0/1 Test Response
  res.status(200).send(`
    <html>
      <head><title>Dynamic Serving Test</title></head>
      <body>
        <h1>Dynamic Serving Middleware</h1>
        <p><strong>Detected Type:</strong> ${deviceType.toUpperCase()}</p>
        <p><strong>Is Mobile:</strong> ${isMobile}</p>
        <p><strong>Is Bot:</strong> ${isBot}</p>
        <p><em>(Served via Firebase Cloud Functions)</em></p>
      </body>
    </html>
  `);
});
