import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Mail, Menu, X } from 'lucide-react';

const NavigationMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { icon: Home, label: 'Home', href: '#hero' },
        { icon: User, label: 'About', href: '#about' },
        { icon: Code, label: 'Projects', href: '#projects' },
        { icon: Mail, label: 'Contact', href: '#contact' }
    ];

    return (
        <>
            {/* Menu Toggle Button */}
            <motion.button
                className="fixed top-6 right-6 z-[60] bg-black/60 border border-cyan-400/40 p-3 rounded backdrop-blur-sm hover:bg-cyan-400/10 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isOpen ? (
                        <X size={20} className="text-cyan-400" />
                    ) : (
                        <Menu size={20} className="text-cyan-400" />
                    )}
                </motion.div>
            </motion.button>

            {/* Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[55]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            className="fixed right-0 top-0 h-full w-[300px] bg-[var(--color-bg-deep)] border-l border-cyan-400/30 z-[56] flex flex-col"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-cyan-400/20">
                                <h2 className="text-cyan-400 font-mono text-sm tracking-wider uppercase">Navigation</h2>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-white/60 text-xs font-mono">System Online</span>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <nav className="flex-1 p-6">
                                <ul className="space-y-2">
                                    {menuItems.map((item, index) => (
                                        <motion.li
                                            key={item.label}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <a
                                                href={item.href}
                                                className="flex items-center gap-4 p-4 rounded-lg border border-transparent hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all group"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <item.icon size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                                                <span className="text-white font-mono text-sm tracking-wide group-hover:text-cyan-400 transition-colors">
                                                    {item.label}
                                                </span>
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Footer */}
                            <div className="p-6 border-t border-cyan-400/20">
                                <div className="text-xs font-mono text-white/40 space-y-1">
                                    <div>Portfolio v3.2</div>
                                    <div className="text-cyan-400">Aditya Chavan</div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default NavigationMenu;
