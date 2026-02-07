import { useEffect, useRef } from 'react';
import { getDistance, randomRange, updatePoint, type Point } from '@/utils/math';

const NODE_COUNT = 60;
const CONNECTION_DISTANCE = 150;
const MOUSE_INFLUENCE_RADIUS = 200;

export const AnimatedBackgroundNeural = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodes = useRef<Point[]>([]);
    const mouse = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const initNodes = () => {
            nodes.current = Array.from({ length: NODE_COUNT }).map(() => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: randomRange(-0.5, 0.5),
                vy: randomRange(-0.5, 0.5),
            }));
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initNodes();
        };

        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nodes.current.forEach((node, i) => {
                updatePoint(node, canvas.width, canvas.height);

                const distToMouse = getDistance(node, mouse.current);
                if (distToMouse < MOUSE_INFLUENCE_RADIUS) {
                    const angle = Math.atan2(node.y - mouse.current.y, node.x - mouse.current.x);
                    const force = (MOUSE_INFLUENCE_RADIUS - distToMouse) / MOUSE_INFLUENCE_RADIUS;
                    node.x += Math.cos(angle) * force * 2;
                    node.y += Math.sin(angle) * force * 2;
                }

                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = i % 2 === 0 ? '#10B981' : '#06B6D4';
                ctx.fill();

                nodes.current.slice(i + 1).forEach(otherNode => {
                    const dist = getDistance(node, otherNode);
                    if (dist < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        const opacity = 1 - dist / CONNECTION_DISTANCE;
                        ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full touch-none"
        />
    );
};
