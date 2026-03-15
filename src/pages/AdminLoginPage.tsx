import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

interface LoginFormProps {
  onLoginSuccess?: () => void;
  isModal?: boolean;
}

export const AdminLoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess, isModal = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLockout = localStorage.getItem('admin_lockout');
    if (savedLockout && new Date(savedLockout) > new Date()) {
      setLockoutTime(new Date(savedLockout));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime && new Date() < lockoutTime) return;

    setError('');
    setLoading(true);

    if (email !== ADMIN_EMAIL) {
      handleFailure('REJECTED: Unauthorized identifier sequence.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess?.();
      if (!isModal) navigate('/amgl-panel');
    } catch (err) {
      handleFailure('ERROR: Credentials mismatched. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  const handleFailure = (msg: string) => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setError(msg);
    setLoading(false);

    if (newAttempts >= 3) {
      const lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      setLockoutTime(lockUntil);
      localStorage.setItem('admin_lockout', lockUntil.toISOString());
    }
  };

  const formatTimeLeft = () => {
    if (!lockoutTime) return '';
    const diff = Math.ceil((lockoutTime.getTime() - new Date().getTime()) / 1000 / 60);
    return `${diff}m remaining`;
  };

  return (
    <div className="font-mono text-[#7fffb2] p-6 bg-[#0c0c0b] border border-[#7fffb2]/30 rounded-lg shadow-[0_0_20px_rgba(127,255,178,0.1)]">
      <div className="mb-6 flex items-center gap-2 border-b border-[#7fffb2]/20 pb-2">
        <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs uppercase tracking-widest opacity-70">Secured Terminal Access</span>
      </div>

      {lockoutTime && new Date() < lockoutTime ? (
        <div className="text-red-400 text-sm animate-pulse">
          [SYSTEM LOCKOUT] Multiple failed probes detected. <br />
          Retry in {formatTimeLeft()}.
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase mb-1 opacity-50">Identity_Token</label>
            <input
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-[#7fffb2]/30 py-1 focus:outline-none focus:border-[#7fffb2] transition-colors"
              placeholder="user@origin.sys"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-xs uppercase mb-1 opacity-50">Access_Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-[#7fffb2]/30 py-1 focus:outline-none focus:border-[#7fffb2] transition-colors"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-400 text-xs italic">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2 border border-[#7fffb2] hover:bg-[#7fffb2] hover:text-black transition-all duration-300 uppercase text-xs font-bold tracking-[0.2em]"
          >
            {loading ? 'Decrypting...' : 'Initiate Handshake'}
          </button>
        </form>
      )}
    </div>
  );
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0b] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <AdminLoginForm />
      </motion.div>
    </div>
  );
}
