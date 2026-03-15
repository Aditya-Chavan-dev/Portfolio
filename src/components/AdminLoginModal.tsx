import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLoginForm } from '../pages/AdminLoginPage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="relative w-full max-w-md mx-4"
          >
            <AdminLoginForm isModal onLoginSuccess={onClose} />
            <button 
              onClick={onClose}
              className="absolute -top-12 right-0 text-[#7fffb2]/50 hover:text-[#7fffb2] text-xs font-mono"
            >
              [ESC] TO_ABORT
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminLoginModal;
