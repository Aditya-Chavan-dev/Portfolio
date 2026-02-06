import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

interface UseParallaxProps {
    isActive: boolean;
    isMobile: boolean;
    stiffness?: number;
    damping?: number;
}

export const useParallax = ({
    isActive,
    isMobile,
    stiffness = 150,
    damping = 20
}: UseParallaxProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness, damping });
    const springY = useSpring(y, { stiffness, damping });

    // Mobile Gyroscope Logic
    useEffect(() => {
        if (!isActive || !isMobile) return;

        const handleOrientation = (event: DeviceOrientationEvent) => {
            const { beta, gamma } = event;
            if (beta === null || gamma === null) return;

            // Clamp and Normalize
            // Beta (Tilt X): -180 to 180. Normal viewing ~30 to 60?
            // Let's assume neutral is 45 degrees for holding phone?
            // Actually, usually users hold it around 30-45 deg depending on posture.
            // Simplified: Relative change. 
            // Normalized Range: [-20, 20] degrees mapping to [-0.5, 0.5]

            const xLimit = 20;
            const yLimit = 20;

            const normalizedX = Math.max(-1, Math.min(1, (gamma || 0) / xLimit)) / 2; // Gamma is Left/Right tilt
            const normalizedY = Math.max(-1, Math.min(1, ((beta || 0) - 45) / yLimit)) / 2; // Beta is Front/Back. Bias -45 for handheld

            x.set(normalizedX);
            y.set(normalizedY);
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, [isActive, isMobile, x, y]);

    // Desktop Mouse Handlers
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!isActive || isMobile) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = event.clientX - rect.left;
        const mouseYPos = event.clientY - rect.top;
        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return {
        x: springX,
        y: springY,
        handleMouseMove,
        handleMouseLeave
    };
};
