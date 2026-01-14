import React from 'react';

const PortraitBlock = () => {
    return (
        <div className="portrait-block">
            <div className="portrait-ring" />
            <div className="portrait-image-container">
                {/* Placeholder for the monochrome image */}
                <div className="portrait-placeholder">
                    [Portrait]
                </div>
            </div>
            <div className="live-status-dot" title="System Online" />
        </div>
    );
};

export default PortraitBlock;
