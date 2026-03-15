import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const HubPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-bg-primary flex flex-col items-center justify-center">
      <h1 className="text-text-heading font-display text-4xl mb-4">The Hub</h1>
      <p className="text-text-secondary font-mono mb-8">This page is a placeholder under construction.</p>
      
      <Button variant="secondary" onClick={() => navigate('/')}>
        Go Back Home (For debugging)
      </Button>
    </div>
  );
};
