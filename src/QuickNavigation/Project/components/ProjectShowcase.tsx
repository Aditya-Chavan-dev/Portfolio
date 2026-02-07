import { useRef, useState, useEffect } from 'react';
import { type GithubRepo } from '@/services/githubService';
import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ProjectShowcaseProps {
    projects: GithubRepo[];
    onSelect: (repo: GithubRepo) => void;
}

export const ProjectShowcase = ({ projects, onSelect }: ProjectShowcaseProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const center = container.scrollLeft + container.clientWidth / 2;

        // Find the card that is closest to the center
        const cards = Array.from(container.children) as HTMLDivElement[];
        let closestIndex = 0;
        let minDistance = Number.MAX_VALUE;

        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(center - cardCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
        }
    };

    const scrollTo = (index: number) => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cards = Array.from(container.children) as HTMLDivElement[];
        if (cards[index]) {
            cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                scrollTo(Math.max(0, activeIndex - 1));
            } else if (e.key === 'ArrowRight') {
                scrollTo(Math.min(projects.length - 1, activeIndex + 1));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, projects.length]);

    return (
        <div className="relative w-full h-full flex flex-col justify-center">

            {/* Background Ambient Glow based on active project language/theme? 
                For now, generic gold glow that pulses 
            */}
            <div className="absolute inset-0 pointer-events-none transition-colors duration-slow bg-gradient-to-b from-transparent via-transparent to-black/80" />

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex items-center gap-8 px-[15vw] overflow-x-auto snap-x snap-mandatory scrollbar-hide h-[65vh] py-8 z-10"
                style={{
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch' // iOS momentum
                }}
            >
                {projects.map((repo, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <motion.div
                            key={repo.id}
                            layoutId={`project-card-${repo.id}`}
                            className={`relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] h-full snap-center will-change-transform backface-hidden z-10`}
                            animate={{
                                scale: isActive ? 1 : 0.95,
                                opacity: isActive ? 1 : 0.4,
                                zIndex: isActive ? 20 : 10
                            }}
                            whileHover={{
                                opacity: isActive ? 1 : 0.6,
                                transition: { duration: 0.2 }
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                            onClick={() => {
                                if (!isActive) scrollTo(index);
                                else onSelect(repo);
                            }}
                        >
                            <ProjectCard
                                repo={repo}
                                isActive={isActive}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation Dots / Controls */}
            <div className="absolute bottom-24 left-0 right-0 flex justify-center items-center gap-icon-text z-20">
                <button
                    onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                    disabled={activeIndex === 0}
                    className="p-2 rounded-full hover:bg-white/10 disabled:opacity-subtle transition-colors"
                    aria-label="Previous project"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <div className="flex gap-2">
                    {projects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => scrollTo(idx)}
                            aria-label={`Go to project ${idx + 1}`}
                            className={`h-1.5 rounded-full transition-fast ${idx === activeIndex ? 'w-8 bg-gold-glow' : 'w-1.5 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => scrollTo(Math.min(projects.length - 1, activeIndex + 1))}
                    disabled={activeIndex === projects.length - 1}
                    className="p-2 rounded-full hover:bg-white/10 disabled:opacity-subtle transition-colors"
                    aria-label="Next project"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Keyboard Hint */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md border-white-10 px-4 py-2 rounded-full flex items-center gap-icon-text animate-pulse">
                    <span className="text-xs text-white/80 font-mono">←</span>
                    <span className="text-2xs text-white/90 uppercase tracking-widest font-medium">Use Arrow Keys</span>
                    <span className="text-xs text-white/80 font-mono">→</span>
                </div>
            </div>

            {/* Active Project Title Reflection (Optional Cinematic Touch) */}
            <div className="absolute top-12 left-0 right-0 text-center z-0 opacity-faint pointer-events-none">
                <h1 className="text-[12vw] font-black uppercase text-white tracking-widest leading-none truncate px-4">
                    {(() => {
                        const name = projects[activeIndex]?.name || '';
                        return name.length > 20
                            ? name.split(/[-_ ]+/).map(word => word.charAt(0).toUpperCase()).join('')
                            : name;
                    })()}
                </h1>
            </div>

        </div>
    );
};
