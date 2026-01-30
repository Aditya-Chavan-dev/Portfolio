import { useEffect, useRef } from 'react';
import { getDistance, randomRange, updatePoint, type Point } from '@shared/logic/math';

const NODE_COUNT = 30; // Half node count for Mobile performance
const CONNECTION_DISTANCE = 100;

export const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodes = useRef<Point[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize Nodes
        const initNodes = () => {
            nodes.current = Array.from({ length: NODE_COUNT }).map(() => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: randomRange(-0.3, 0.3), // Slower movement for mobile
                vy: randomRange(-0.3, 0.3),
            }));
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initNodes();
        };

        window.addEventListener('resize', resize);
        resize();

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and Draw Nodes
            nodes.current.forEach((node, i) => {
                updatePoint(node, canvas.width, canvas.height);

                // Draw Node
                ctx.beginPath();
                ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2); // Smaller nodes
                ctx.fillStyle = i % 2 === 0 ? '#10B981' : '#06B6D4';
                ctx.fill();

                // Draw Connections
                nodes.current.slice(i + 1).forEach(otherNode => {
                    const dist = getDistance(node, otherNode);
                    if (dist < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        const opacity = 1 - dist / CONNECTION_DISTANCE;
                        ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.15})`; // Lower opacity
                        ctx.lineWidth = 0.5; // Thinner lines
                        ctx.stroke();
                    }
                });
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 bg-[#020617]"
        />
    );
};
