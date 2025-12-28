import React from 'react';
import './Hero.css';
import ThemeToggle from './components/ThemeToggle';
import AvailabilityBadge from './components/AvailabilityBadge';
import IdentityBlock from './components/IdentityBlock';
import DifferentiatorLine from './components/DifferentiatorLine';
import CTAGroup from './components/CTAGroup';
import MetricsRow from './components/MetricsRow';
import PortraitBlock from './components/PortraitBlock';

const HeroSection = () => {
    return (
        <div className="hero-root">
            <div className="hero-texture" />

            {/* Header */}
            <header className="hero-header">
                <div className="nav-brand">Aditya Chavan</div>
                <div className="header-actions">
                    <ThemeToggle />
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="hero-content">
                <div className="hero-left">
                    <AvailabilityBadge />
                    <IdentityBlock />
                    <DifferentiatorLine />
                    <CTAGroup />
                    <div className="metrics-wrapper-desktop">
                        <MetricsRow />
                    </div>
                </div>

                <div className="hero-right">
                    <PortraitBlock />
                </div>
            </main>

            {/* Mobile Metrics (if layout shifts) */}
            <div className="metrics-wrapper-mobile">
                <MetricsRow />
            </div>
        </div>
    );
};

export default HeroSection;
