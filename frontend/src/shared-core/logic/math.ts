export type Point = {
    x: number;
    y: number;
    vx: number;
    vy: number;
};

/**
 * Calculates the distance between two points.
 */
export const getDistance = (p1: Point, p2: Point): number => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Generates a random number within a range.
 */
export const randomRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

/**
 * Updates a point's position based on its velocity and boundary constraints.
 * Returns true if the point hit a boundary (optional, for bounce effects).
 */
export const updatePoint = (p: Point, width: number, height: number): void => {
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around screen for continuous flow
    if (p.x < 0) p.x = width;
    else if (p.x > width) p.x = 0;

    if (p.y < 0) p.y = height;
    else if (p.y > height) p.y = 0;
};
