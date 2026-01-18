import { useRef, useEffect, useState } from 'react';

interface IconState {
    x: number;
    y: number;
    vx: number;
    vy: number;
    id: number;
    settled: boolean;
}

export const useFloatingIcons = (count: number, containerRef: React.RefObject<HTMLElement>, avoidRef?: React.RefObject<HTMLElement>) => {
    const [icons, setIcons] = useState<IconState[]>([]);
    const iconsRef = useRef<IconState[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const initializedRef = useRef(false);

    useEffect(() => {
        if (!containerRef.current) return;

        let animationFrameId: number;
        let resizeObserver: ResizeObserver;

        const initOrUpdate = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();

            // Only initialize if we have valid dimensions
            if (width > 0 && height > 0 && !initializedRef.current) {
                const centerX = width / 2;
                const centerY = height / 2;

                const initialIcons = Array.from({ length: count }, (_, i) => {
                    const angle = Math.random() * Math.PI * 2;
                    // Explosion Speed: High random velocity to shoot out of center
                    const speed = 15 + Math.random() * 20;
                    return {
                        id: i,
                        x: centerX,
                        y: centerY,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        settled: false,
                    };
                });

                iconsRef.current = initialIcons;
                setIcons(initialIcons);
                initializedRef.current = true;

                // Start tracking loop
                startAnimationLoop();
            }
        };

        const startAnimationLoop = () => {
            // Cancel any existing loop to avoid duplicates
            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            const updatePhysics = () => {
                if (!containerRef.current) return;
                const containerRect = containerRef.current.getBoundingClientRect();
                const { width, height } = containerRect;

                const repulsionRadius = 200;
                const repulsionStrength = 1.0;
                const maxFloatingSpeed = 1.5;
                const explosionFriction = 0.94; // Slows down "blast"
                const floatingFriction = 0.99; // Keeps them floating forever

                // Avoidance Rect (Profile Image)
                let avoidRect: DOMRect | null = null;
                if (avoidRef && avoidRef.current) {
                    const rect = avoidRef.current.getBoundingClientRect();
                    // Convert to relative coordinates within container
                    avoidRect = {
                        left: rect.left - containerRect.left,
                        top: rect.top - containerRect.top,
                        width: rect.width,
                        height: rect.height,
                        right: (rect.left - containerRect.left) + rect.width,
                        bottom: (rect.top - containerRect.top) + rect.height,
                        x: rect.left - containerRect.left,
                        y: rect.top - containerRect.top,
                        toJSON: () => { }
                    };
                }

                iconsRef.current = iconsRef.current.map((icon) => {
                    let { x, y, vx, vy, settled } = icon;

                    // 1. Settling Phase (Transition from Explosion to Floating)
                    if (!settled) {
                        vx *= explosionFriction;
                        vy *= explosionFriction;

                        const currentSpeed = Math.sqrt(vx * vx + vy * vy);
                        if (currentSpeed < maxFloatingSpeed) {
                            settled = true;
                        }
                    } else {
                        // Floating Phase
                        vx *= floatingFriction;
                        vy *= floatingFriction;
                    }

                    // 2. Mouse Interaction
                    const dx = x - mouseRef.current.x;
                    const dy = y - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < repulsionRadius) {
                        const angle = Math.atan2(dy, dx);
                        const force = (repulsionRadius - dist) / repulsionRadius;
                        vx += Math.cos(angle) * force * repulsionStrength;
                        vy += Math.sin(angle) * force * repulsionStrength;
                    }

                    // 3. Profile Image Avoidance (New)
                    if (avoidRect) {
                        const centerX = avoidRect.left + avoidRect.width / 2;
                        const centerY = avoidRect.top + avoidRect.height / 2;
                        const avoidRadius = (avoidRect.width / 2) + 60; // Radius + Padding

                        const dxAvoid = x - centerX;
                        const dyAvoid = y - centerY;
                        const distAvoid = Math.sqrt(dxAvoid * dxAvoid + dyAvoid * dyAvoid);

                        if (distAvoid < avoidRadius) {
                            const angle = Math.atan2(dyAvoid, dxAvoid);
                            const force = (avoidRadius - distAvoid) / avoidRadius;
                            // Stronger push
                            vx += Math.cos(angle) * force * 1.5;
                            vy += Math.sin(angle) * force * 1.5;
                        }
                    }

                    // 4. Screen Boundaries (Bounce)
                    if (x <= 0 || x >= width) {
                        vx *= -1;
                        x = Math.max(0, Math.min(x, width));
                    }
                    if (y <= 0 || y >= height) {
                        vy *= -1;
                        y = Math.max(0, Math.min(y, height));
                    }

                    // 5. Update Position
                    x += vx;
                    y += vy;

                    // 6. Perpetual Motion (Kick them if they stop)
                    if (settled) {
                        const speed = Math.sqrt(vx * vx + vy * vy);
                        if (speed < 0.2) {
                            vx += (Math.random() - 0.5) * 0.1;
                            vy += (Math.random() - 0.5) * 0.1;
                        }
                        const currentMax = settled ? maxFloatingSpeed : 50;
                        vx = Math.min(Math.max(vx, -currentMax), currentMax);
                        vy = Math.min(Math.max(vy, -currentMax), currentMax);
                    }

                    return { ...icon, x, y, vx, vy, settled };
                });

                // 7. Icon-Icon Collision
                const collisionRadius = 50;
                for (let i = 0; i < iconsRef.current.length; i++) {
                    for (let j = i + 1; j < iconsRef.current.length; j++) {
                        const p1 = iconsRef.current[i];
                        const p2 = iconsRef.current[j];

                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < collisionRadius) {
                            // Simple elastic bounce
                            const tempVx = p1.vx;
                            const tempVy = p1.vy;
                            p1.vx = p2.vx;
                            p1.vy = p2.vy;
                            p2.vx = tempVx;
                            p2.vy = tempVy;

                            // Prevent sticking
                            const angle = Math.atan2(dy, dx);
                            const overlap = collisionRadius - dist;
                            const moveX = Math.cos(angle) * overlap * 0.5;
                            const moveY = Math.sin(angle) * overlap * 0.5;

                            p1.x += moveX;
                            p1.y += moveY;
                            p2.x -= moveX;
                            p2.y -= moveY;
                        }
                    }
                }

                setIcons([...iconsRef.current]);
                animationFrameId = requestAnimationFrame(updatePhysics);
            };

            animationFrameId = requestAnimationFrame(updatePhysics);
        };

        // Always try to init immediately 
        initOrUpdate();

        // And retry if container resizes (e.g. layout shift on load)
        resizeObserver = new ResizeObserver(() => {
            initOrUpdate();
        });
        resizeObserver.observe(containerRef.current);

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (resizeObserver) resizeObserver.disconnect();
        };
    }, [count, containerRef, avoidRef]);

    return icons;
};
