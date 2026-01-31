export interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
};

export const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const updatePoint = (p: Point, width: number, height: number) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
};
