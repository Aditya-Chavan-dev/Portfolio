import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useKonami } from '../hooks/useKonami';
import { useEasterEgg } from '../hooks/useEasterEgg';
import AdminLoginModal from './AdminLoginModal';

interface EasterEggContextType {
  logoTrigger: () => void;
  openModal: () => void;
}

const EasterEggContext = createContext<EasterEggContextType | null>(null);

export const useEasterEggContext = () => {
  const context = useContext(EasterEggContext);
  if (!context) throw new Error("useEasterEggContext must be used within an EasterEggWrapper");
  return context;
};

export const EasterEggWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const logoTrigger = useEasterEgg(5, openModal, 1800);
  useKonami(openModal);

  return (
    <EasterEggContext.Provider value={{ logoTrigger, openModal }}>
      {children}
      <AdminLoginModal isOpen={isModalOpen} onClose={closeModal} />
    </EasterEggContext.Provider>
  );
};
