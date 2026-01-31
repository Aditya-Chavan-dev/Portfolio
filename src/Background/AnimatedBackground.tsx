import { useEffect, useRef } from 'react';
import { getDistance } from '@/utils/math';

export const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Configuration
        const particleCount = width < 768 ? 40 : 90; // Fewer on mobile
        const connectionDistance = width < 768 ? 100 : 150;
        const mouseDistance = 200;

        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
        }

        const particles: Particle[] = [];

        // Initialize Particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5, // Slow drift
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and Draw Particles
            particles.forEach((p, index) => {
                // Movement
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Mouse Interaction (Subtle repulsion)
                const dMouse = getDistance(p, mouseRef.current);
                if (dMouse < mouseDistance) {
                    const angle = Math.atan2(p.y - mouseRef.current.y, p.x - mouseRef.current.x);
                    const force = (mouseDistance - dMouse) / mouseDistance;
                    p.vx += Math.cos(angle) * force * 0.05;
                    p.vy += Math.sin(angle) * force * 0.05;
                }

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(148, 163, 184, 0.5)'; // Slate-400
                ctx.fill();

                // Draw Connections
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = getDistance(p, p2);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(34, 211, 238, ${1 - dist / connectionDistance})`; // Cyan fade
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(draw);
        };

        const animationFrame = requestAnimationFrame(draw);

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 bg-[#020617] pointer-events-none"
        />
    );
};
