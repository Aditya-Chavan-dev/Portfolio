import React from 'react';
import MetricCard from './MetricCard';
import LiveRecruiterCounter from './LiveRecruiterCounter';

const MetricsRow = () => {
    return (
        <div className="metrics-row">
            <MetricCard
                value="20+"
                label="Production Deployments"
                tooltip="Live systems beyond localhost"
            />
            <MetricCard
                value="Realtime"
                label="Event-Driven Architecture"
                tooltip="Firebase, notifications, live dashboards"
            />
            <MetricCard
                value="Zero-Drop"
                label="Delivery Record"
                tooltip="No abandoned projects"
            />
            <div className="divider-vertical" />
            <LiveRecruiterCounter />
        </div>
    );
};

export default MetricsRow;
