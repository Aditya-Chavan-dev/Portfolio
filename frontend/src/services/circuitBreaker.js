/**
 * CIRCUIT BREAKER UTILITY
 * Gold Standard #7: The "Fuse Box"
 * 
 * Wraps an async function (API call). If it fails too many times, 
 * it "trips" the circuit and prevents further calls for a reset timeout.
 * 
 * @param {Function} asyncFunction - The API call to wrap
 * @param {Object} options - Configuration options
 */
export const circuitBreaker = (asyncFunction, options = {}) => {
    const {
        failureThreshold = 3, // Fail 3 times -> Open Circuit
        resetTimeout = 60000, // Wait 60s before retrying
        fallbackValue = null  // What to return when circuit is open
    } = options;

    let failures = 0;
    let lastFailureTime = 0;
    let isOpen = false;

    return async (...args) => {
        const now = Date.now();

        // 1. Check if Circuit is Open (Tripped)
        if (isOpen) {
            if (now - lastFailureTime > resetTimeout) {
                // Time to retry (Half-Open State)
                isOpen = false;
                failures = 0;
                console.log("⚡ Circuit Breaker: Resetting (Half-Open)...");
            } else {
                console.warn("⚡ Circuit Breaker: BLOCKING call (Circuit Open)");
                return fallbackValue;
            }
        }

        try {
            // 2. Attempt the Call
            const result = await asyncFunction(...args);
            // Success resets the counter
            failures = 0;
            return result;

        } catch (error) {
            // 3. Handle Failure
            failures++;
            lastFailureTime = now;
            console.error(`⚡ Circuit Breaker: Failure ${failures}/${failureThreshold}`);

            if (failures >= failureThreshold) {
                isOpen = true;
                console.error("⚡ Circuit Breaker: TRIPPED! Stopping calls for " + (resetTimeout / 1000) + "s");
            }

            throw error; // Re-throw so the caller knows it failed
        }
    };
};
