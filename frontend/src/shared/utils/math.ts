export interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

export const randomRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

export const updatePoint = (p: Point, width: number, height: number) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
};
