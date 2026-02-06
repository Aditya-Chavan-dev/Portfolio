import { Education } from './components/Education';
import { TechStack } from './components/TechStack';
import { GithubHeatmap } from './components/GithubHeatmap';
import { ProfileHorizontal } from './components/ProfileHorizontal';
import { AboutMeProfile } from './components/AboutMeProfile';

export const AboutMeDesktop = () => {
    return (
        <div className="flex-1 h-full pt-2 pb-4 flex flex-col gap-3 min-h-0">
            {/* TOP ROW: Profile Header (Full Width) */}
            <div className="w-full shrink-0 h-20">
                <ProfileHorizontal />
            </div>

            {/* BOTTOM ROW: Split Content */}
            <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">

                {/* LEFT COLUMN: About, Tech, Heatmap (Wider) */}
                <div className="col-span-9 flex flex-col gap-3 h-full overflow-hidden">

                    {/* 2. About Me Card (Bio + Stats) - Reduced Height (35%) */}
                    <div className="w-full h-[35%] min-h-0">
                        <AboutMeProfile />
                    </div>

                    {/* 3. Tech Arsenal Strip - Compact Fixed Height */}
                    <div className="w-full shrink-0 h-16">
                        <TechStack />
                    </div>

                    {/* 4. Github Heatmap - Expanded Height (Flex Remainder) */}
                    <div className="w-full flex-1 min-h-0">
                        <GithubHeatmap />
                    </div>
                </div>


                {/* RIGHT COLUMN: Education Timeline (Narrower) */}
                <div className="col-span-3 h-full min-h-0">
                    <div className="glass-panel rounded-2xl border border-white/10 h-full overflow-hidden hover:border-gold-dim/20 transition-all duration-300">
                        <Education />
                    </div>
                </div>

            </div>
        </div>
    );
};
